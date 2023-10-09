import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Type from "../../types/PokemonType";
import { AppDispatch, RootState } from "../../app/store";



interface pokedexFilterState {
    pokemonNames: string[]
    types: Type[]
    search: string
}


const initialState: pokedexFilterState = {
    pokemonNames: [],
    types: [],
    search: ""
}

async function getGlobalNames(): Promise<string[]> {
    let rawData: any = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then(res => res.json())
    let names: string[] = [];
    for (let elem of rawData.results) {
        names.push(elem.name)
    }
    return names
}



export const filterPokemonNames = createAsyncThunk.withTypes<{ state: RootState, dispatch: AppDispatch }>()("pokedex/filterPokemonNames", async (name, thunkApi) => {
    const state = thunkApi.getState().pokedex
    console.log("Log from filterPokemonNames")
    try {
        if (state.types.length === 0) {
            let globalNames = await getGlobalNames()
            if (state.search === "") {
                return globalNames
            } else {
                return globalNames.filter((name) => name.includes(state.search.toLowerCase()))
            }
        } else {
            let nameArrays: string[][] = []
            for (let type of state.types) {
                let rawData: any = await fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json()).then(data => data.pokemon)
                nameArrays.push(rawData)
            }
            let pokemonNames = state.types.length === 1 ? nameArrays[0] : nameArrays[0].filter(name => nameArrays[1].includes(name))
            if (state.search === "") {
                return pokemonNames
            } else {
                return pokemonNames.filter((name) => name.includes(state.search.toLowerCase()))
            }
        }
    } catch (err) {
        thunkApi.rejectWithValue(err)
    }
})

const pokedexFilterSlice = createSlice({
    name: "pokedex",
    reducers: {
        addType: (state, action) => {
            if (state.types.length < 2) {
                state.types.push(action.payload)
            }
        },
        removeType: (state, action) => {
            state.types.filter(type => type !== action.payload)
        },
        setSearch: (state, action) => {
            console.log("Log from setSearch")
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(filterPokemonNames.fulfilled, (state, action) => {
            if (action.payload) {
                console.log("filterPokemonNames fulfilled" + action.payload)
                state.pokemonNames = action.payload
            }
        })
    },
    initialState
})

export default pokedexFilterSlice.reducer
export const { addType, removeType, setSearch } = pokedexFilterSlice.actions