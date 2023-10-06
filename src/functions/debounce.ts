type DebounceFunction<T> = (value: T) => void;

export default function debounce<T>(callback: DebounceFunction<T>, delay: number): (value: T) => void {
    let timer: NodeJS.Timeout;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-ignore
            timer = setTimeout(() => { callback(...args) }, delay);
        }, delay);
    };
}