import IPokemon from "../types/IPokemon"

export default async function fetchPokemon(id: number): Promise<IPokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonData = await fetch(url)
        .then(res => res.json())
    const pokemon: IPokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        img: pokemonData.sprites.other["official-artwork"].front_default
    }
    return pokemon
}