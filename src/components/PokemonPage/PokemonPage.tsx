import styles from "./PokemonPage.module.scss"
import { useParams } from "react-router-dom"

export const PokemonPage = () => {
    const { id } = useParams()
    return (
        <div>
            {id}
        </div>
    )
}
