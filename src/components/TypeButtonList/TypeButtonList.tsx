import TypeButton from "../TypeButton/TypeButton"
import { Type } from "../../types/PokemonType"

const TypeButtonList = () => {
    return (
        <div>
            {(Object.keys(Type) as Array<keyof typeof Type>).map((key) => (
                <TypeButton type={Type[key]} key={key}/>
            ))}
        </div>
    )
}

export default TypeButtonList