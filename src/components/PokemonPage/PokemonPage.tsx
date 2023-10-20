import { useEffect, useState } from "react"
import styles from "./PokemonPage.module.scss"
import { useParams } from "react-router-dom"
import IPokemon from "../../types/IPokemon"
import getPokemonImage from "../../functions/getPokemonImage"
import loader from "../../assets/pokeballLoader.gif"
import "../../styles/types.scss"

function extractSprites(obj: any): string[] {
    delete obj["versions"]
    const result: string[] = [];

    for (const key in obj) {
        if (obj[key] === null) {
            continue;
        } else if (typeof obj[key] === 'string') {
            result.push(obj[key]);
        } else if (typeof obj[key] === 'object') {
            result.push(...extractSprites(obj[key]));
        }
    }

    return result;
}

export const PokemonPage = () => {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState<IPokemon>()

    useEffect(() => {
        (async () => {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            const pokemonData = await fetch(url).then(res => res.json())
            setPokemon({
                id: pokemonData.id,
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                img: getPokemonImage(pokemonData),
                types: pokemonData.types,
                abilities: pokemonData.abilities,
                stats: pokemonData.stats,
                sprites: extractSprites(pokemonData.sprites)
            })
        })()
    }, [])

    if (pokemon) {
        return (
            <div className={styles.page}>
                <div className={styles.content}>
                    <h1 className={styles.pokemon_name}>{pokemon.name}</h1>

                    <div className={styles.main}>
                        <div className={styles.main_left}>
                            <img className={styles.main_image} src={pokemon.img} alt={pokemon.name} />

                        </div>
                        <div className={styles.main_right}>
                            <h2>Height</h2>
                            <p>{pokemon.height}</p>
                            <h2>Weight</h2>
                            <p>{pokemon.weight}</p>
                            <div className={styles.types}>
                                {
                                    pokemon.types.map((type) => (
                                        <span className={type.type.name}>{type.type.name}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.stats}>
                        <h2>Stats</h2>
                        {
                            pokemon.stats.map((stat) => (
                                <div>Base {stat.stat.name}: {stat.base_stat}</div>
                            ))
                        }
                    </div>

                    <div className={styles.abilities}>
                        <h2>Abilities</h2>
                        {
                            pokemon.abilities.map((ability) => (
                                <span>{ability.ability.name}</span>
                            ))
                        }
                    </div>

                    <div className={styles.sprites}>
                        <h2>Sprites</h2>
                        {
                            pokemon.sprites.map((sprite) => (
                                <img src={sprite} alt={sprite} />
                            ))
                        }
                    </div>


                </div>
            </div>
        )
    }
    return (
        <div className={styles.loader}>
            <img src={loader} alt="loader" />
        </div>
    )
}
