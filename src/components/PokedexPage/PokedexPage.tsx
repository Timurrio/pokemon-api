import IPokemon from "../../types/IPokemon"
import { useCallback, useEffect, useState } from "react"
import styles from "./PokedexPage.module.scss"
import fetchPokemon from "../../functions/fetchPokemon"

export const PokedexPage = () => {
    const [pokemons, setPokemons] = useState<Partial<IPokemon>[]>([])
    const [offset, setOffset] = useState(0)

    const fetchData = useCallback(async (limit: number = 20) => {
        let arr: Partial<IPokemon>[] = []
        for (let i = 1 + offset; i < 1 + limit + offset; i++) {
            let pokemon = await fetchPokemon(i)
            console.log(`${i}) offset is ${offset}`)
            arr.push(pokemon)
        }
        setOffset(prev => prev + limit)
        return arr
    }, [offset])

    useEffect(() => {
        fetchData().then(data => setPokemons(data))
    }, [])




    return (
        <div className={styles.container}>
            <div className={styles["cards-list"]}>
                {
                    pokemons.map((pokemon) => (
                        <div key={pokemon.id} className={styles.card}>
                            <img src={pokemon.img} alt={pokemon.name} />
                            <p>{pokemon.id}</p>
                            <p>{pokemon.name}</p>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => fetchData().then(data => setPokemons(prev => [...prev, ...data]))}>Fetch more pokemons</button>
        </div>
    )
}

export default PokedexPage
