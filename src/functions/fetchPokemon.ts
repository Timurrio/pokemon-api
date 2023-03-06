import IPokemon from "../types/IPokemon"

function getPokemonImage(pokemonData: any) {
    if (pokemonData.sprites.other["official-artwork"].front_default) {
        return pokemonData.sprites.other["official-artwork"].front_default
    } else if (pokemonData.sprites.front_default) {
        return pokemonData.sprites.front_default
    } else {
        return 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png'
    }
}

export default async function fetchPokemon(id: number): Promise<IPokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonData = await fetch(url)
        .then(res => res.json())
    const pokemonImage = getPokemonImage(pokemonData)
    const pokemon: IPokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        img: pokemonImage,
    }
    return pokemon
}