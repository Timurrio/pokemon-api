import styles from './GamePage.module.scss'
import fetchPokemon from '../../functions/fetchPokemon'
import getRandomNumber from '../../functions/getRandomNumber'
import { useEffect, useState } from 'react'
import IPokemon from '../../types/IPokemon'
import Game from './Game/Game'
import { fetchGamePokemons } from '../../features/gamePokemonSlice/gamePokemonSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'




export default function GamePage() {

    const { pokemons, dataLoading } = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchGamePokemons())
    }, [])


    return (
        <div className={styles.game}>
            {
                pokemons.length === 3 && !dataLoading ? <Game pokemons={pokemons} /> : <h1>Loading...</h1>
            }
        </div>
    )


}
