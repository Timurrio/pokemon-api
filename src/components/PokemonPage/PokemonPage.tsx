import { useEffect, useState } from "react"
import styles from "./PokemonPage.module.scss"
import { useParams } from "react-router-dom"
import IPokemon from "../../types/IPokemon"
import getPokemonImage from "../../functions/getPokemonImage"
import loader from "../../assets/pokeballLoader.gif"
import "../../styles/types.scss"
import { SpriteGallery } from "./SpriteGallery/SpriteGallery"

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
                    <h1 className={styles.pokemon_name}>{pokemon.name} <span className={styles.pokemon_id}>№{pokemon.id}</span></h1>

                    <div className={styles.main}>
                        <div className={styles.main_left}>
                            <img className={styles.main_image} src={pokemon.img} alt={pokemon.name} />

                        </div>
                        <div className={styles.main_right}>

                            <table className={styles.info_table}>
                                <tbody>
                                    <tr>
                                        <th><h2>Height</h2></th>
                                        <th><p>{pokemon.height}</p></th>
                                    </tr>
                                    <tr>
                                        <th><h2>Weight</h2></th>
                                        <th><p>{pokemon.weight}</p></th>
                                    </tr>
                                    <tr>
                                        <th><h2>Types</h2></th>
                                        <th>
                                            <div className={styles.types}>
                                                {
                                                    pokemon.types.map((type) => (
                                                        <span className={styles.pill + " " + type.type.name}>{type.type.name}</span>
                                                    ))
                                                }
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th><h2>Abilities</h2></th>
                                        <th>
                                            <div>
                                                {
                                                    pokemon.abilities.map((ability) => (
                                                        <span className={`${styles.ability} ${styles.pill}`}>{ability.ability.name}</span>
                                                    ))
                                                }
                                            </div></th>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>




                    <div className={styles.stats}>
                        <h2 className={styles.section_header}>Stats</h2>
                        <table className={styles["stats-table"]}>
                            {
                                pokemon.stats.map((stat) => (
                                    <tr>
                                        <th className={styles["stat-header"]}>Base {stat.stat.name} </th>
                                        <td className={styles["stat-bar-container"]}>
                                            <div style={{ width: `${stat.base_stat}%` }} className={styles["stat-bar"]}>
                                                {stat.base_stat}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>



                    <div className={styles.sprites}>
                        <h2 className={styles.section_header}>Sprites</h2>
                        <SpriteGallery sprites={pokemon.sprites} />
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
