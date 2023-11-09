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


export const PokedexPage = () => {
    const dispatch = useAppDispatch()
    const { types, search } = useAppSelector(state => state.pokedex)

    const { data: pokemonNames,
        isFetching: isNamesFetching,
        refetch: refetchNames, } = useQuery({
            queryKey: ["pokemonNames"],
            initialData: [],
            queryFn: async () => {
                console.log("pokemonNames query")
                const names = await filterPokemonNames(search, types)
                console.log(names)
                return names
            }
        })

    const { data: pokemons, fetchNextPage, isFetching: isPokemonsFetching, isFetchingNextPage } = useInfiniteQuery<Partial<IPokemon>[], Error, InfiniteData<Partial<IPokemon>[]>, QueryKey, number>({
        queryKey: ["pokemons", pokemonNames],
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages, lastPageParam) => { return lastPageParam + 12 },
        queryFn: async ({ pageParam = 0 }): Promise<Partial<IPokemon>[]> => {
            console.log("pokemons query")
            let arr: Partial<IPokemon>[] = []
            let limit: number = pokemonNames.length >= (Array.isArray(pokemons) ? pokemons.length : 0) + pageParam ? 12 : pokemonNames.length - (Array.isArray(pokemons) ? pokemons.length : 0) - 1

            try {
                for (let i = pageParam; i < limit + pageParam; i++) {
                    let pokemon = await fetchPokemon(pokemonNames[i])
                    arr.push(pokemon)
                }
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
            <Search />
            <TypeButtonList />


            <div className={styles["cards-list"]}>
                {
                    pokemons && pokemons.pages.map((page) => (
                        <>
                            {page.map((pokemon) => (
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                            ))}
                        </>
                    ))
                }
            </div>

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
