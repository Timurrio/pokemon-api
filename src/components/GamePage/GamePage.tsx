import styles from './GamePage.module.scss'
import fetchPokemon from '../../functions/fetchPokemon'
import getRandomNumber from '../../functions/getRandomNumber'
import { useEffect, useState } from 'react'
import IPokemon from '../../types/IPokemon'
import Game from './Game/Game'



export default function GamePage() {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])


    useEffect(() => {
        const data: Promise<IPokemon>[] = []
        for (let i = 0; i < 3; i++) {
            data.push(fetchPokemon(getRandomNumber(1, 1000)))
        }
        Promise.all(data).then(pokemons => setPokemons([...pokemons]))
    }, [])


    return (
        <div className={styles.game}>
            {
                pokemons.length && <Game pokemons={pokemons} />
            }
        </div>
    )


}
