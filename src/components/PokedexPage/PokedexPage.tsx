import IPokemon from "../../types/IPokemon"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styles from "./PokedexPage.module.scss"
import fetchPokemon from "../../functions/fetchPokemon"
import { useObserver } from "../../hooks/useIntersectionObserver"
import PokemonCard from "./PokemonCard/PokemonCard"
import { Search } from "./Search/Search"
import { useAppSelector } from "../../app/hooks"
import { filterPokemonNames } from "../../functions/filterPokemonNames"
import loader from "../../assets/pokeballLoader.gif"
import pikachuSleeping from "../../assets/pikachu-sleeping.png"
import TypeButtonList from "./TypeButtonList/TypeButtonList"
import { useQuery, useQueryClient } from "@tanstack/react-query"


export const PokedexPage = () => {
    const queryClient = useQueryClient()
    const { types, search } = useAppSelector(state => state.pokedex)
    // const [pokemonNames, setPokemonNames] = useState<string[]>([])
    // const [pokemons, setPokemons] = useState<Partial<IPokemon>[]>([])
    const [offset, setOffset] = useState(0)
    // const [isPokemonsLoading, setIsPokemonsLoading] = useState<boolean>(false)
    // const [isNamesLoading, setIsNamesLoading] = useState<boolean>(false)

    const { data: pokemonNames,
        isLoading: isNamesLoading,
        refetch: refetchNames,
        isError: isNamesError } = useQuery({
            queryKey: ["pokemonNames"],
            initialData: [],
            queryFn: async () => {
                console.log("pokemonNames query")
                setOffset(0)
                const names = await filterPokemonNames(search, types)
                console.log(names)
                return names
            }
        })

    const { data: pokemons, isLoading: isPokemonsLoading, refetch: refetchPokemons, isError: isPokemonsError } = useQuery<Partial<IPokemon>[], Error, Partial<IPokemon>[]>({
        queryKey: ["pokemons"], initialData: [], enabled: !isNamesLoading, queryFn: async (): Promise<Partial<IPokemon>[]> => {
            console.log("pokemons query")
            let arr: Partial<IPokemon>[] = []
            let limit: number = pokemonNames.length >= pokemons.length + offset ? 12 : pokemonNames.length - pokemons.length - 1
            try {
                for (let i = offset; i < limit + offset; i++) {
                    let pokemon = await fetchPokemon(pokemonNames[i])
                    arr.push(pokemon)
                }
                setOffset(prev => prev + limit)
            } catch (e) {
                console.log("fetchData error" + e)
            } finally {
                console.log(arr)
                if (arr.length > 0) {
                    return [...pokemons as Partial<IPokemon>[], ...arr]
                } else { return pokemons }
            }
        }
    })

    const isLoaderActive = useMemo(() => pokemons.length < pokemonNames.length - 1, [pokemons, pokemonNames])



    // const fetchData = useCallback(async (lim: number = 12) => {
    //     let arr: Partial<IPokemon>[] = []
    //     let limit: number = pokemonNames.length >= pokemons.length + offset ? lim : pokemonNames.length - pokemons.length - 1
    //     setIsPokemonsLoading(true)
    //     try {
    //         for (let i = offset; i < limit + offset; i++) {
    //             let pokemon = await fetchPokemon(pokemonNames[i])
    //             arr.push(pokemon)
    //         }
    //     } catch (e) {
    //         console.log("fetchData error" + e)
    //     }
    //     setPokemons([...pokemons, ...arr])
    //     setOffset(offset + limit)
    //     setIsPokemonsLoading(false)
    // }, [pokemons, offset, pokemonNames])

    // const fetchNames = useCallback(async () => {
    //     setIsNamesLoading(true)
    //     const names = await filterPokemonNames(search, types)
    //     console.log("names: " + names)
    //     setPokemonNames(names)
    //     setPokemons([])
    //     setOffset(0)
    //     setIsNamesLoading(false)
    // }, [search, types])

    // useEffect(() => {
    //     console.log("Initial fetchnames")
    //     fetchNames()
    // }, [])

    // useEffect(() => {
    //     console.log("Fetch data after pokemonNames change")
    //     fetchData()
    // }, [pokemonNames])

    // useEffect(() => {
    //     console.log("Fetch names on search/types change")
    //     fetchNames()
    // }, [search, types])


    const observerRef = useRef<any>()
    useObserver(observerRef, pokemons.length < pokemonNames.length, isPokemonsLoading || isNamesLoading, () => queryClient.invalidateQueries({ queryKey: ["pokemons"] }))

    return (
        <div className={styles.container}>
            <Search />
            <TypeButtonList />


            <div className={styles["cards-list"]}>
                {
                    pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
