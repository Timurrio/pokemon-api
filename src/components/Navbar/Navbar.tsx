import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to={"/"}><p>Pokedex</p></Link>
            <Link to={"/game"}><p>Game</p></Link>
        </nav>
    )
}

export default Navbar