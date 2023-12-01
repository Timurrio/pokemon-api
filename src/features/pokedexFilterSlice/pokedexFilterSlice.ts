import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Type from "../../types/PokemonType";



interface pokedexFilterState {
    types: Type[]
    search: string
}


const initialState: pokedexFilterState = {
    types: [],
    search: ""
}


const pokedexFilterSlice = createSlice({
    name: "pokedex",
    reducers: {
        addType: (state, action) => {
            if (state.types.length < 2) {
                state.types.push(action.payload)
            }
        },
        removeType: (state, action) => {
            state.types = state.types.filter(type => type !== action.payload)
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        resetPokedexFilters: (state) => {
            state.search = initialState.search
            state.types = initialState.types
        }
    },
    initialState
})

export default pokedexFilterSlice.reducer
export const { addType, removeType, setSearch, resetPokedexFilters } = pokedexFilterSlice.actions