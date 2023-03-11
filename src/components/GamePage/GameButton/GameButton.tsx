import React from 'react'
import styles from "./GameButton.module.scss"

interface GameButtonProps {
    onClick: (() => void) | ((e: React.MouseEvent) => void),
    children?: React.ReactNode
}

export default function GameButton({ onClick, children }: GameButtonProps) {
    return (
        <button onClick={onClick} className={styles.button}>
            {
                children
            }
        </button>
    )
}
