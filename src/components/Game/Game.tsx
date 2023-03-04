import styles from './Game.module.scss'
import fetchPokemon from '../../functions/fetchPokemon'
import getRandomNumber from '../../functions/getRandomNumber'
import { useEffect, useState } from 'react'
import IPokemon from '../../types/IPokemon'


export default function Game() {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])

    useEffect(() => {
        const data: any = []
        for (let i = 0; i < 3; i++) {
            data.push(fetchPokemon(getRandomNumber(1, 1000)))
        }
        Promise.all(data).then(pokemons => setPokemons([...pokemons]))
    }, [])


    return (
        <div className={styles.game}>
            {
                pokemons &&
                pokemons.map((pokemon) => (
                    <div className={styles.pokemon_item} key={pokemon.id}>
                        <h1>{pokemon.name}</h1>
                        <img src={pokemon.img} alt="pokemonPicture" />
                    </div>
                ))

            }
        </div>
    )
}
