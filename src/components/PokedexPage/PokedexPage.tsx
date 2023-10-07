import IPokemon from "../../types/IPokemon"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./PokedexPage.module.scss"
import fetchPokemon from "../../functions/fetchPokemon"
import { useObserver } from "../../hooks/useIntersectionObserver"
import PokemonCard from "../PokemonCard/PokemonCard"
import { Search } from "../Search/Search"

export const PokedexPage = () => {
    const [pokemons, setPokemons] = useState<Partial<IPokemon>[]>([])
    const [offset, setOffset] = useState(0)
    const [isPokemonsLoading, setIsPokemonsLoading] = useState<boolean>(false)

    const fetchData = useCallback(async (limit: number = 12) => {
        let arr: Partial<IPokemon>[] = []
        setIsPokemonsLoading(true)
        for (let i = 1 + offset; i < 1 + limit + offset; i++) {
            let pokemon = await fetchPokemon(i)
            arr.push(pokemon)
        }
        setPokemons([...pokemons, ...arr])
        setOffset(offset + limit)
        setIsPokemonsLoading(false)
    }, [pokemons, offset])

    const observerRef = useRef<any>()
    useObserver(observerRef, true, isPokemonsLoading, fetchData)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <Search />

            <div className={styles["cards-list"]}>
                {
                    pokemons.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} />
                    ))
                }
            </div>

            <div ref={observerRef} style={{ width: "100%", backgroundColor: "red" }}>Load more</div>
        </div>
    )
}

export default PokedexPage
