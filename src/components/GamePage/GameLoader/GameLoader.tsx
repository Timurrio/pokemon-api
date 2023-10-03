import loader from "../../../assets/pokeballLoader.gif"
import styles from "./GameLoader.module.scss"


export default function GameLoader() {
    return (
        <div>
            <img className={styles.loader} src={loader} alt="Loader" />
        </div>
    )
}
