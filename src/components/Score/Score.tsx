import getHighScore from "../../functions/getHighScore"
import { useAppSelector } from "../../app/hooks"
import styles from './Score.module.scss'

export default function Score() {
    const currentScore = useAppSelector(state => state.game.currentScore)

    return (
        <div className={styles.container}>
            <h2 className={styles.score}>Current score: {currentScore}</h2>
            <h2 className={styles.score}>Highscore: {getHighScore()}</h2>
        </div>
    )
}
