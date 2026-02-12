import type { RefObject } from "react";

export default function debounce(func: () => void, timeoutIdRef: RefObject<NodeJS.Timeout | null>) {
    return () => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        timeoutIdRef.current = setTimeout(func, 250);
    }
}