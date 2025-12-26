import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (seconds: number) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        setTimeLeft(seconds);
    }, [seconds]);

    const intervalRef = useRef<number | null>(null);

    const startCountdown = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                return timeLeft - 1
            })

        }, 1000)
    }, []);

    const resetCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimeLeft(seconds);
    }, [seconds]);


    useEffect(() => {
        if(timeLeft === 0 && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [timeLeft]);

    return { timeLeft, startCountdown, resetCountdown };
}

export default useTimer;