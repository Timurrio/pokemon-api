import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gamePokemon from '../features/gamePokemonSlice/gamePokemonSlice'
import pokedexFilterSlice from '../features/pokedexFilterSlice/pokedexFilterSlice';

export const store = configureStore({
  reducer: {
    game: gamePokemon,
    pokedex: pokedexFilterSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
