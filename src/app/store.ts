import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gamePokemon from '../features/gamePokemonSlice/gamePokemonSlice'

export const store = configureStore({
  reducer: {
    game: gamePokemon
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
