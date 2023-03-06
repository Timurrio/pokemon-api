import IPokemon from "../../../types/IPokemon"
import getRandomNumber from "../../../functions/getRandomNumber"
import styles from './Game.module.scss'
import { useAppDispatch } from "../../../app/hooks"
import { fetchGamePokemons } from "../../../features/gamePokemonSlice/gamePokemonSlice"

interface GameProps {
    pokemons: IPokemon[]
}

export default function Game({ pokemons }: GameProps) {
    const correctAnswer = pokemons[getRandomNumber(0, pokemons.length - 1)]
    const dispatch = useAppDispatch()
    console.log('correct answer is: ' + correctAnswer.name)

    function handleClick(e: any) {
        e.target.innerText === correctAnswer.name ? console.log('Correct pokemon!') : console.log('Incorrect pokemon!')
        dispatch(fetchGamePokemons())
    }

    return (
        <div className={styles.container}>
            <img src={correctAnswer.img} alt={correctAnswer.name} />
            <div className={styles.buttons_block}>
                {
                    pokemons.map((pokemon) => (
                        <button key={pokemon.id} onClick={e => handleClick(e)}>{pokemon.name}</button>
                    ))
                }
            </div>
        </div>
    )
}
