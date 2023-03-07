import styles from './GamePage.module.scss'
import { useEffect, useState } from 'react'
import Game from './Game/Game'
import { fetchGamePokemons } from '../../features/gamePokemonSlice/gamePokemonSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import getHighScore from '../../functions/getHighScore'




export default function GamePage() {
    const { pokemons, dataLoading, currentScore } = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchGamePokemons())
    }, [])


    return (
        <div className={styles.game}>
            {
                pokemons.length === 3 && !dataLoading ? <Game pokemons={pokemons} /> : <div className={styles.loading}><h1>Loading...</h1></div>
            }
            <h1>Current score: {currentScore}</h1>
            <h1>Highscore: {getHighScore()}</h1>
        </div>
    )


}
