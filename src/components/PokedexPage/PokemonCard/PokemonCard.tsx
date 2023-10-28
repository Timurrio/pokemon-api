import IPokemon from "../../../types/IPokemon"
import styles from "./PokemonCard.module.scss"
import "../../../styles/types.scss"
import { Link } from "react-router-dom"



const PokemonCard: React.FC<{ pokemon: Partial<IPokemon> }> = ({ pokemon }) => {
    return (
        <Link className={styles.link_wrapper} to={`/${pokemon.id}`}>
            <div key={pokemon.id} className={styles.card}>
                <div className={styles.image_container}>
                    <img className={styles.image} src={pokemon.img} alt={pokemon.name} />
                </div>
                <div className={styles.info_container}>
                    <p className={styles.pokemon_id}>№{pokemon.id}</p>
                    <p className={styles.pokemon_name}>{pokemon.name}</p>
                    <div className={styles.pokemon_types}>
                        {
                            pokemon.types && pokemon.types.map((type) => (
                                <span className={`${styles.pill} ${type.type.name}`} key={type.slot}>{type.type.name}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PokemonCard