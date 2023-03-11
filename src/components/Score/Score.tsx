import getHighScore from "../../functions/getHighScore"
import { useAppSelector } from "../../app/hooks"

export default function Score() {
    const currentScore = useAppSelector(state => state.game.currentScore)

    return (
        <div>
            <h1>Current score: {currentScore}</h1>
            <h1>Highscore: {getHighScore()}</h1>
        </div>
    )
}
