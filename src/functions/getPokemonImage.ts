export default function getPokemonImage(pokemonData: any) {
    if (pokemonData.sprites.other["official-artwork"].front_default) {
        return pokemonData.sprites.other["official-artwork"].front_default
    } else if (pokemonData.sprites.front_default) {
        return pokemonData.sprites.front_default
    } else {
        return 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png'
    }
}