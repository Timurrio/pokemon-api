import { Type } from "../../../../types/PokemonType"
import styles from "./TypeButton.module.scss"
import "../../../../styles/types.scss"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useState } from "react"
import { addType, removeType } from "../../../../features/pokedexFilterSlice/pokedexFilterSlice"


const TypeButton: React.FC<{ type: Type }> = ({ type }) => {
  const dispatch = useAppDispatch()
  const [isActive, setIsActive] = useState<boolean>(false)
  const types = useAppSelector((state) => state.pokedex.types)

  function handleClick() {
    if (types.length < 2 || isActive) {
      if (isActive) {
        dispatch(removeType(type))
      } else {
        dispatch(addType(type))
      }
      setIsActive(prev => !prev)
    }
  }

  return (
    <button className={`${type} ${styles.button} ${isActive ? styles.active : ""}`} onClick={() => handleClick()}>{type.charAt(0).toUpperCase() + type.slice(1)}</button>
  )
}

export default TypeButton