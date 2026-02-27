import { useCallback, useRef } from "react";

export const useThrottle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
) => {
    const inThrottle = useRef(false);

    return useCallback(
        (...args: Parameters<T>) => {
            if (!inThrottle.current) {
                func(...args);
                inThrottle.current = true;
                setTimeout(() => {
                    inThrottle.current = false;
                }, limit);
            }
        },
        [func, limit]
    );
};