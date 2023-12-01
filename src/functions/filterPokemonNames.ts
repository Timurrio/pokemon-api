import PokemonType from "../types/PokemonType";

async function getGlobalNames(): Promise<string[]> {
    let rawData: any = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then(res => res.json())
    let names: string[] = [];
    for (let elem of rawData.results) {
        names.push(elem.name)
    }
    return names
}



export const filterPokemonNames = async (search: string, types: PokemonType[]) => {
    try {
        if (types.length === 0) {
            let globalNames = await getGlobalNames()
            if (search === "") {
                return globalNames
            } else {
                return globalNames.filter((name) => name.includes(search.toLowerCase()))
            }
        } else {
            let nameArrays: string[][] = []
            for (let i = 0; i < types.length; i++) {
                nameArrays[i] = []
                let rawData: any = await fetch(`https://pokeapi.co/api/v2/type/${types[i]}`).then(res => res.json()).then(data => data.pokemon)
                for (let elem of rawData) {
                    nameArrays[i].push(elem.pokemon.name)
                }
            }

            let pokemonNames = types.length === 1 ? nameArrays[0] : nameArrays[0].filter(name => nameArrays[1].includes(name))
            if (search === "") {
                return pokemonNames
            } else {
                return pokemonNames.filter((name) => name.includes(search.toLowerCase()))
            }
        }
    } catch (err) {
        console.log(err)
        return []
    }
}