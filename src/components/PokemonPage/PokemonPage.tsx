import { useEffect, useState } from "react"
import styles from "./PokemonPage.module.scss"
import { useParams } from "react-router-dom"
import IPokemon from "../../types/IPokemon"
import getPokemonImage from "../../functions/getPokemonImage"

function extractSprites(obj: any): string[] {
    delete obj["versions"]
    const result: string[] = [];

    for (const key in obj) {
        if (obj[key] === null) {
            continue;
        } else if (typeof obj[key] === 'string') {
            result.push(obj[key]);
        } else if (typeof obj[key] === 'object') {
            result.push(...extractSprites(obj[key]));
        }
    }

    return result;
}

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
                stats: pokemonData.stats,
                sprites: extractSprites(pokemonData.sprites)
            })
        })()
    }, [])

    return (
        <div>
            {pokemon && Object.values(pokemon).toLocaleString()}
        </div>
    )
}
