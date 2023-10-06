import { useState } from "react"
import debounce from "../../functions/debounce"
import styles from "./Search.module.scss"

export const Search = () => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className={styles.container}>
            <input placeholder="Search by name" type="text" onChange={debounce((e) => setSearchValue(e.target.value), 300)} />
        </div>
    )
}
