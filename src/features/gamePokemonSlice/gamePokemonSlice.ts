import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IPokemon from "../../types/IPokemon";
import fetchPokemon from "../../functions/fetchPokemon";
import getRandomNumber from "../../functions/getRandomNumber";
import getHighScore from "../../functions/getHighScore";

interface gamePokemonState {
    pokemons: IPokemon[],
    dataLoading: boolean,
    currentScore: number,
    isGameStarted: boolean
}

const initialState: gamePokemonState = {
    pokemons: [],
    dataLoading: false,
    isGameStarted: false,
    currentScore: 0
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
        incrementScore: (state) => {
            state.currentScore += 1
        },
        endGame: (state) => {
            if (getHighScore() < state.currentScore) {
                localStorage.setItem("highScore", JSON.stringify(state.currentScore))
            }
            state.isGameStarted = false
            state.currentScore = 0
        },
        startGame: (state) => {
            state.isGameStarted = true
        }
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
export const { incrementScore, endGame, startGame } = gamePokemonSlice.actions