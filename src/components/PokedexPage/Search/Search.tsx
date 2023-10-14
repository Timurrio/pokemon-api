import debounce from "../../../functions/debounce"
import styles from "./Search.module.scss"
import { useAppDispatch } from "../../../app/hooks"
import { setSearch } from "../../../features/pokedexFilterSlice/pokedexFilterSlice"

export const Search = () => {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.container}>
            <input placeholder="Search by name" type="text" onChange={debounce((e) => dispatch(setSearch(e.target.value)), 300)} />
        </div>
    )
}
