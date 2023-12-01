import { useAppDispatch } from "../../../app/hooks"
import { startGame } from "../../../features/gamePokemonSlice/gamePokemonSlice"
import GameButton from "../GameButton/GameButton"
import styles from "./GameIntro.module.scss"


export default function GameIntro() {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Game Info</h1>
            <p className={styles.paragraph}>
                Guess the Pokemon's name from 3 options based on its picture. The panel below will display the current score and highscore. Good luck!
            </p>

            <GameButton onClick={() => dispatch(startGame())}>START GAME</GameButton>
        </div>
    )
}
