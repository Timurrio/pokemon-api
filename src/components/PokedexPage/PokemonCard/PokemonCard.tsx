import IPokemon from "../../../types/IPokemon"
import styles from "./PokemonCard.module.scss"
import "../../../styles/types.scss"
import { Link } from "react-router-dom"



const PokemonCard: React.FC<{ pokemon: Partial<IPokemon> }> = ({ pokemon }) => {
    return (
        <Link className={styles.link_wrapper} to={`/${pokemon.id}`}>
            <div key={pokemon.id} className={styles.card}>
                <img src={pokemon.img} alt={pokemon.name} />
                <p>{pokemon.id}</p>
                <p>{pokemon.name}</p>
                <div className={styles.types}>
                    {
                        pokemon.types && pokemon.types.map((type) => (
                            <span className={`${type.type.name}`} key={type.slot}>{type.type.name}</span>
                        ))
                    }
                </div>
            </div>
        </Link>
    )
}

export default PokemonCard