import IPokemon from "../../../types/IPokemon"
import getRandomNumber from "../../../functions/getRandomNumber"

interface GameProps {
    pokemons: IPokemon[]
}

export default function Game({ pokemons }: GameProps) {
    const correctAnswer = pokemons[getRandomNumber(0, pokemons.length - 1)]
    console.log('correct answer is: ')
    console.log(correctAnswer)

    function handleClick(e: any) {
        e.target.innerText === correctAnswer.name ? console.log('Correct pokemon!') : console.log('Incorrect pokemon!')
    }

    return (
        <div>
            <img src={correctAnswer.img} alt={correctAnswer.name} />
            {
                pokemons.map((pokemon) => (
                    <button key={pokemon.id} onClick={e => handleClick(e)}>{pokemon.name}</button>
                ))
            }
        </div>
    )
}
