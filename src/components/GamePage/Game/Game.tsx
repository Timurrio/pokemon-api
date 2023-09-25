import IPokemon from "../../../types/IPokemon"
import getRandomNumber from "../../../functions/getRandomNumber"
import styles from './Game.module.scss'
import { useAppDispatch } from "../../../app/hooks"
import { endGame, fetchGamePokemons, incrementScore } from "../../../features/gamePokemonSlice/gamePokemonSlice"
import GameButton from "../GameButton/GameButton"

interface GameProps {
    pokemons: IPokemon[]
}

export default function Game({ pokemons }: GameProps) {
    const correctAnswer = pokemons[getRandomNumber(0, pokemons.length - 1)]
    const dispatch = useAppDispatch()

    console.log('correct answer is: ' + correctAnswer.name)

    function handleClick(e: any) {
        e.target.innerText === correctAnswer.name ? dispatch(incrementScore()) : dispatch(endGame())
        dispatch(fetchGamePokemons())
    }

    return (
        <div className={styles.container}>
            <img className={styles.pokemonImage} src={correctAnswer.img} alt={correctAnswer.name} />
            <div className={styles.buttons_block}>
                {
                    pokemons.map((pokemon) => (
                        <GameButton key={pokemon.id} onClick={(e) => handleClick(e)}>{pokemon.name}</GameButton>
                    ))
                }
            </div>
        </div>
    )
}
