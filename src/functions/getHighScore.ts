export default function getHighScore(): number {
    const highScore = localStorage.getItem("highScore")
    if (!highScore) {
        localStorage.setItem("highScore", "0")
    }
    return parseInt(JSON.parse(localStorage.getItem("highScore") as string))
}