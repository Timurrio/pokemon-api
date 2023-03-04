export default async function fetchPokemon(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await fetch(url)
        .then(res => res.json())
    return pokemon
}