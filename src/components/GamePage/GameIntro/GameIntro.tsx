import { useAppDispatch } from "../../../app/hooks"
import { startGame } from "../../../features/gamePokemonSlice/gamePokemonSlice"
import GameButton from "../GameButton/GameButton"
import styles from "./GameIntro.module.scss"


export default function GameIntro() {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Game Info</h1>
            <p className={styles.paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, mollitia libero. Tenetur fuga iure optio enim deleniti, cumque nihil necessitatibus ea quod minus aperiam sequi. Recusandae exercitationem iusto dolorum itaque?</p>
            <GameButton onClick={() => dispatch(startGame())}>START GAME</GameButton>
        </div>
    )
}
