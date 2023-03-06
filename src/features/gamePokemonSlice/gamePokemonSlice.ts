import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IPokemon from "../../types/IPokemon";
import fetchPokemon from "../../functions/fetchPokemon";
import getRandomNumber from "../../functions/getRandomNumber";

interface gamePokemonState {
    pokemons: IPokemon[],
    dataLoading: boolean
}

const initialState: gamePokemonState = {
    pokemons: [],
    dataLoading: false
}

export const fetchGamePokemons = createAsyncThunk('game/fetchGamePokemons', async (name, thunkApi) => {
    try {
        const data: IPokemon[] = []
        for (let i = 0; i < 3; i++) {
            let pokemon = await fetchPokemon(getRandomNumber(1, 1000))
            data.push(pokemon)
        }
        return data
    } catch (err) {
        thunkApi.rejectWithValue(err)
    }
})

const gamePokemonSlice = createSlice({
    name: "game",
    reducers: {

    },
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamePokemons.fulfilled, (state, action) => {
                if (action.payload) {
                    state.dataLoading = false
                    state.pokemons = action.payload
                }
            })
            .addCase(fetchGamePokemons.pending, (state) => {
                state.dataLoading = true
            })
    }
})

export default gamePokemonSlice.reducer
