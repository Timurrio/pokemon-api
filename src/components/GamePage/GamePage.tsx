import styles from './GamePage.module.scss'
import { useEffect } from 'react'
import Game from './Game/Game'
import { fetchGamePokemons } from '../../features/gamePokemonSlice/gamePokemonSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../Loader/Loader'
import Score from '../Score/Score'
import GameIntro from '../GameIntro/GameIntro'




export default function GamePage() {
    const { pokemons, dataLoading, isGameStarted } = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchGamePokemons())
    }, [])


    return (
        <div className={styles.game}>
            <div className={styles.game__screen}>
                {
                    isGameStarted ? pokemons.length === 3 && !dataLoading ? <Game pokemons={pokemons} /> : <Loader /> : <GameIntro />
                }
            </div>
            <Score />
        </div>
    )




}
