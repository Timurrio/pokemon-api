import loader from "../../assets/pokeballLoader.gif"
import styles from "./Loader.module.scss"


export default function Loader() {
    return (
        <div>
            <img className={styles.loader} src={loader} alt="Loader" />
        </div>
    )
}
