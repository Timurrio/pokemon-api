import IPokemon from "../types/IPokemon"
import getPokemonImage from "./getPokemonImage"


export default async function fetchPokemon(id: number | string): Promise<Partial<IPokemon>> {
    try {
        if (id) {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            const pokemonData = await fetch(url).then(res => res.json())
            const pokemonImage = getPokemonImage(pokemonData)
            const pokemon: Partial<IPokemon> = {
                id: pokemonData.id,
                name: pokemonData.name,
                img: pokemonImage,
                types: pokemonData.types
            }
            return pokemon
        } else {
            throw new Error()
        }
    } catch (err) {
        return {}
    }
}