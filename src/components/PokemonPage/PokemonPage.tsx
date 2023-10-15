import { useEffect, useState } from "react"
import styles from "./PokemonPage.module.scss"
import { useParams } from "react-router-dom"
import IPokemon from "../../types/IPokemon"
import getPokemonImage from "../../functions/getPokemonImage"

export const PokemonPage = () => {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState<IPokemon>()

    useEffect(() => {
        (async () => {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            const pokemonData = await fetch(url).then(res => res.json())
            setPokemon({
                id: pokemonData.id,
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                img: getPokemonImage(pokemonData),
                types: pokemonData.types,
                abilities: pokemonData.abilities,
                stats: pokemonData.stats
            })
        })()
    }, [])

    return (
        <div>
            {pokemon && Object.values(pokemon).toLocaleString()}
        </div>
    )
}
