import type { MutableRefObject } from "react";

export default function debounce(func: () => void, timeoutIdRef: MutableRefObject<NodeJS.Timeout | null>) {
    return () => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        timeoutIdRef.current = setTimeout(func, 500);
    }
}