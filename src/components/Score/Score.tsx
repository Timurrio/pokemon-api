import getHighScore from "../../functions/getHighScore"
import { useAppSelector } from "../../app/hooks"
import styles from './Score.module.scss'

export default function Score() {
    const currentScore = useAppSelector(state => state.game.currentScore)

    return (
        <div className={styles.container}>
            <h2>Current score: {currentScore}</h2>
            <h2>Highscore: {getHighScore()}</h2>
        </div>
    )
}
