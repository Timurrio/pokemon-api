import styles from './Game.module.scss'
import fetchPokemon from '../../functions/fetchPokemon'
import getRandomNumber from '../../functions/getRandomNumber'
import { useEffect, useState } from 'react'


export default function Game() {
    const [pokemons, setPokemons] = useState<any[]>([])

    useEffect(() => {
        const data: any = []
        for (let i = 0; i < 3; i++) {
            data.push(fetchPokemon(getRandomNumber(1, 1000)))
            console.log(data)
        }
        Promise.all(data).then(pokemons => setPokemons([...pokemons]))
    }, [])


    return (
        <div className={styles.game}>
            {
                pokemons.length === 3 &&
                pokemons.map((pokemon) => (
                    <div className={styles.pokemon_item} key={pokemon.id}>
                        <h1>{pokemon.name}</h1>
                        <img src={pokemon.sprites.other["official-artwork"].front_default} alt="pokemonPicture" />
                    </div>
                ))

            }
        </div>
    )
}
