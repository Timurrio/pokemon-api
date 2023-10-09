import IPokemon from "../../types/IPokemon"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./PokedexPage.module.scss"
import fetchPokemon from "../../functions/fetchPokemon"
import { useObserver } from "../../hooks/useIntersectionObserver"
import PokemonCard from "../PokemonCard/PokemonCard"
import { Search } from "../Search/Search"
import { filterPokemonNames } from "../../features/pokedexFilterSlice/pokedexFilterSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"


export const PokedexPage = () => {
    const dispatch = useAppDispatch()
    const { types, search, pokemonNames } = useAppSelector(state => state.pokedex)
    const [pokemons, setPokemons] = useState<Partial<IPokemon>[]>([])
    const [offset, setOffset] = useState(0)
    const [isPokemonsLoading, setIsPokemonsLoading] = useState<boolean>(false)


    const fetchData = useCallback(async (lim: number = 12) => {
        let arr: Partial<IPokemon>[] = []
        let limit: number = pokemonNames.length >= pokemons.length + offset ? lim : pokemonNames.length - pokemons.length - 1
        console.log(`Limit is: ${limit}  Pokemons: ${pokemons} and PokemonNames: ${pokemonNames}`)
        console.log("fetching data from: " + pokemonNames)
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

    useEffect(() => {
        (async () => {
            await dispatch(filterPokemonNames())
            fetchData()
        })()
    }, [])

    useEffect(() => {
        (async () => {
            console.log("Trigger usEffect on search change")
            setOffset(0)
            setPokemons([])
            console.log("Set offset 0 set Pokemons [] and fetch data")
            console.log(`Pokemons after setting []: ${pokemons} And Offset is ${offset}`)
            await dispatch(filterPokemonNames())
            fetchData()
        })()
    }, [types, search])



    // useEffect(() => {


    // }, [pokemonNames])

    const observerRef = useRef<any>()
    useObserver(observerRef, pokemons.length < pokemonNames.length, isPokemonsLoading, fetchData)

    return (
        <div className={styles.container}>
            <Search />

            <div className={styles["cards-list"]}>
                {
                    pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                }
            </div>

            <div ref={observerRef} style={{ width: "100%", backgroundColor: "red" }}>Load more</div>
        </div>
    )
}

export default PokedexPage
