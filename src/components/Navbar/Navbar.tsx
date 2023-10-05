import { Link } from "react-router-dom"
import logo from "../../assets/green-pokedex-logo.png"
import styles from "./Navbar.module.scss"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles["links-list"]}>
                <Link className={styles.link} to={"/"}>Pokedex</Link>
                <Link className={styles.link} to={"/game"}>Game</Link>
            </div>

        </nav>
    )
}

export default Navbar