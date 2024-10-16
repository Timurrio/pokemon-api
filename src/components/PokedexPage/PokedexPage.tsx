import IPokemon from "../../types/IPokemon"
import { useEffect, useMemo, useRef } from "react"
import styles from "./PokedexPage.module.scss"
import fetchPokemon from "../../functions/fetchPokemon"
import { useObserver } from "../../hooks/useIntersectionObserver"
import PokemonCard from "./PokemonCard/PokemonCard"
import { Search } from "./Search/Search"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { filterPokemonNames } from "../../functions/filterPokemonNames"
import loader from "../../assets/pokeballLoader.gif"
import pikachuSleeping from "../../assets/pikachu-sleeping.png"
import TypeButtonList from "./TypeButtonList/TypeButtonList"
import { InfiniteData, QueryKey, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { resetPokedexFilters } from "../../features/pokedexFilterSlice/pokedexFilterSlice"
import { Fragment } from "react"


export const PokedexPage = () => {
    const dispatch = useAppDispatch()
    const { types, search } = useAppSelector(state => state.pokedex)

    const { data: pokemonNames,
        isFetching: isNamesFetching,
        refetch: refetchNames, } = useQuery({
            queryKey: ["pokemonNames"],
            initialData: [],
            queryFn: async () => {
                const names = await filterPokemonNames(search, types)
                return names
            }
        })

    const { data: pokemons, fetchNextPage, isFetching: isPokemonsFetching, isFetchingNextPage } = useInfiniteQuery<Partial<IPokemon>[], Error, InfiniteData<Partial<IPokemon>[]>, QueryKey, number>({
        queryKey: ["pokemons", pokemonNames],
        initialPageParam: 0,
        enabled: !isNamesFetching,
        getNextPageParam: (lastPage, pages, lastPageParam) => { return lastPageParam + 12 },
        queryFn: async ({ pageParam = 0 }): Promise<Partial<IPokemon>[]> => {
            let arr: Partial<IPokemon>[] = []
            let limit: number = pokemonNames.length >= (Array.isArray(pokemons) ? pokemons.length : 0) + pageParam ? 12 : pokemonNames.length - (Array.isArray(pokemons) ? pokemons.length : 0) - 1

            try {
                const pokemonPromises: Promise<Partial<IPokemon>>[] = []
                for (let i = pageParam; i < limit + pageParam; i++) {
                    let pokemon = fetchPokemon(pokemonNames[i])
                    pokemonPromises.push(pokemon)
                }
                await Promise.all(pokemonPromises).then( (pokemonArr) => {
                    for(let pokemon of pokemonArr) {
                        if (Object.keys(pokemon).length > 0) {
                            arr.push(pokemon)
                        }
                    }

                })

            } catch (e) {
                console.log("fetchData error" + e)
            } finally {
                return arr
            }
        }
    })

    useEffect(() => {
        dispatch(resetPokedexFilters())
    }, [])

    useEffect(() => {
        refetchNames()
    }, [search, types])

    const pokemonsLength = useMemo(() => {
        if (pokemons) {
            return pokemons.pages.reduce((acc, curr) => (
                acc += curr.length
            ), 0)
        }
        else {
            return 0
        }
    }, [pokemons])

    const isLoaderActive = useMemo(() => pokemonsLength < pokemonNames.length - 1, [pokemonsLength, pokemonNames])

    const observerRef = useRef<any>()
    useObserver(observerRef, pokemonsLength < pokemonNames.length - 1, isFetchingNextPage || isPokemonsFetching || isNamesFetching, () => fetchNextPage())

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <Search />
                <TypeButtonList />
            </div>



            <div className={styles["cards-list"]}>{pokemons && pokemons.pages.map((page) => (<Fragment key={page[0]?.id}>{page.map((pokemon) => (<PokemonCard key={pokemon.id} pokemon={pokemon} />))}</Fragment>))}</div>

            <div ref={observerRef} className={styles["loader"]}>
                {
                    isLoaderActive
                        ?
                        <img src={loader} width={100} height={100} className={styles["loader-image"]} alt="loader" />
                        :
                        <div className={styles["pikachu-container"]}>
                            <img src={pikachuSleeping} width={200} height={100} className={styles["pikachu-image"]} alt="loader" />
                            That`s all!
                        </div>
                }
            </div>

        </div>
    )
}

export default PokedexPage
