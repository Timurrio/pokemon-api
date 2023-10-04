import PokemonType from "./PokemonType"


export default interface IPokemon {
    id: number,
    name: string,
    img: string,
    height: number,
    weight: number,
    types: PokemonType[]
}

