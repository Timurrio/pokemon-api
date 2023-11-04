import { useMemo, useState } from "react"
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs"
import styles from "./SpriteGallery.module.scss"


export const SpriteGallery = ({ sprites }: { sprites: string[] }) => {
    const [activeSlide, setActiveSlide] = useState(0)

    const displayedSlides = useMemo(() => {
        if (activeSlide - 2 >= 0 && activeSlide + 2 <= sprites.length - 1) {
            return sprites.slice(activeSlide - 2, activeSlide + 3)
        } else if (activeSlide - 2 < 0) {
            return sprites.slice(0, 5)
        } else {
            return sprites.slice(sprites.length - 5, sprites.length)
        }
    }, [activeSlide])

    function handleRightArrow() {
        if (activeSlide < sprites.length - 1) {
            setActiveSlide(prev => prev + 1)
        } else {
            setActiveSlide(0)
        }
    }

    function handleLeftArrow() {
        if (activeSlide > 0) {
            setActiveSlide(prev => prev - 1)
        } else {
            setActiveSlide(sprites.length - 1)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                <p className={styles.slide_number}>{activeSlide + 1}/{sprites.length}</p>
                <img className={styles.active_image} src={sprites[activeSlide]} alt={sprites[activeSlide]} />
                <BsFillArrowLeftSquareFill onClick={() => handleLeftArrow()} className={styles.arrow_left} />
                <BsFillArrowRightSquareFill onClick={() => handleRightArrow()} className={styles.arrow_right} />
            </div>
            <div className={styles.slides}>
                {
                    sprites.map((sprite, index) => (
                        displayedSlides.includes(sprite) && <img onClick={() => { setActiveSlide(index) }} className={`${styles.slide} ${activeSlide === index ? styles["slide--active"] : ""}`} height={100} width={100} src={sprite} alt={sprite} />
                    ))
                }
            </div>
        </div>
    )
}
