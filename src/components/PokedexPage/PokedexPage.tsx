import IPokemon from "../../types/IPokemon"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./PokedexPage.module.scss"
import fetchPokemon from "../../functions/fetchPokemon"
import { useObserver } from "../../hooks/useIntersectionObserver"
import PokemonCard from "./PokemonCard/PokemonCard"
import { Search } from "./Search/Search"
import { useAppSelector } from "../../app/hooks"
import { filterPokemonNames } from "../../functions/filterPokemonNames"
import loader from "../../assets/pokeballLoader.gif"
import TypeButton from "./TypeButtonList/TypeButton/TypeButton"
import { Type } from "../../types/PokemonType"
import TypeButtonList from "./TypeButtonList/TypeButtonList"


export const PokedexPage = () => {
    const { types, search } = useAppSelector(state => state.pokedex)
    const [pokemonNames, setPokemonNames] = useState<string[]>([])
    const [pokemons, setPokemons] = useState<Partial<IPokemon>[]>([])
    const [offset, setOffset] = useState(0)
    const [isPokemonsLoading, setIsPokemonsLoading] = useState<boolean>(false)
    const [isNamesLoading, setIsNamesLoading] = useState<boolean>(false)


    const fetchData = useCallback(async (lim: number = 12) => {
        let arr: Partial<IPokemon>[] = []
        let limit: number = pokemonNames.length >= pokemons.length + offset ? lim : pokemonNames.length - pokemons.length - 1
        setIsPokemonsLoading(true)
        try {
            for (let i = offset; i < limit + offset; i++) {
                let pokemon = await fetchPokemon(pokemonNames[i])
                arr.push(pokemon)
            }
        } catch (e) {
            console.log("fetchData error" + e)
        }
        setPokemons([...pokemons, ...arr])
        setOffset(offset + limit)
        setIsPokemonsLoading(false)
    }, [pokemons, offset, pokemonNames])

    const fetchNames = useCallback(async () => {
        setIsNamesLoading(true)
        const names = await filterPokemonNames(search, types)
        console.log("names: " + names)
        setPokemonNames(names)
        setPokemons([])
        setOffset(0)
        setIsNamesLoading(false)
    }, [search, types])

    useEffect(() => {
        console.log("Initial fetchnames")
        fetchNames()
    }, [])

    useEffect(() => {
        console.log("Fetch data after pokemonNames change")
        fetchData()
    }, [pokemonNames])

    useEffect(() => {
        console.log("Fetch names on search/types change")
        fetchNames()
    }, [search, types])


    const observerRef = useRef<any>()
    useObserver(observerRef, pokemons.length < pokemonNames.length, isPokemonsLoading || isNamesLoading, fetchData)

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
                <img src={loader} width={100} height={100} className={styles["loader-image"]} alt="loader" />

            </div>
        </div>
    )
}

export default PokedexPage
