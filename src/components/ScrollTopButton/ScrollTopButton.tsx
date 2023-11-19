import { FaArrowUp } from "react-icons/fa6"
import styles from "./ScrollTopButton.module.scss"
import { useEffect, useState } from "react"

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

export const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1000) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        })
    }, [])


    if (!isVisible) {
        return <></>
    }

    return (
        <div className={styles.button} onClick={() => goToTop()}>
            <FaArrowUp className={styles.icon} />
        </div>
    )
}
