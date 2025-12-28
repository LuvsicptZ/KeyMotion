import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


const isKeyboardCodeAllowed = (code: string) => {
    return (
      code.startsWith("Key") ||
      code.startsWith("Digit") ||
      code === "Backspace" ||
      code === "Space" ||
      code === "Minus"
    );
  };

  const useTypings = (isFinish: boolean, countdownSeconds: number) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(({ key, code }: KeyboardEvent) => {
        if (isFinish) {
            toast('Click restart to play again!', {
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
                duration: 1000
            })
            return
        }
        if (countdownSeconds <= 0) {
            toast('Please choose a time first :)', {
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
                duration: 1000
            })
            return
        }

        if (!isKeyboardCodeAllowed(code)) {
            return;
        }


        switch (key) {
            case 'Backspace':
                if (cursor > 0 && typed.length > 0) {
                    setTyped(prev => prev.slice(0, -1));
                    setCursor(prev => prev - 1);
                    totalTyped.current--;
                }
                break;
            default:
                setTyped(prev => prev + key);
                setCursor(prev => prev + 1);
                totalTyped.current++
        }
    }, [isFinish, countdownSeconds]);
        
    const clearTyped = useCallback(() => {
        setTyped("")
        setCursor(0)
        totalTyped.current = 0
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
    }, [keydownHandler]);

    return {
        typed,
        cursor,
        totalTyped,
        resetTotalTyped,
        clearTyped,
    }
}

export default useTypings;
