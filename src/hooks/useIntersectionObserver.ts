import { useEffect, useRef } from "react";

export const useObserver = (ref: React.MutableRefObject<Element>, canLoad: boolean, isLoading: boolean, callback: () => void) => {
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        var cb = function (entries: IntersectionObserverEntry[]) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}