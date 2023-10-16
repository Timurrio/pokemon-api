import TypeButton from "./TypeButton/TypeButton"
import styles from "./TypeButtonList.module.scss"
import { Type } from "../../../types/PokemonType"

const TypeButtonList = () => {
    return (
        <div className={styles.list}>
            {(Object.keys(Type) as Array<keyof typeof Type>).map((key) => (
                <TypeButton type={Type[key]} key={key} />
            ))}
        </div>
    )
}

export default TypeButtonList