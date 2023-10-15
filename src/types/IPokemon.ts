import PokemonType from "./PokemonType"

interface Stat {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

interface Ability {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}

export default interface IPokemon {
    id: number,
    name: string,
    img: string,
    height: number,
    weight: number,
    types: PokemonType[],
    stats: Stat[],
    abilities: Ability[]
}

