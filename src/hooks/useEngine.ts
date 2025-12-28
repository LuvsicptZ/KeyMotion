import useWords from "./useWords"
import useTimer from "./useTimer"
import useTypings from "./useTyping"
import { countErrors } from "../utils/helpers"
import { useCallback, useEffect, useState } from "react"


const NUMBER_OF_WORDS = 15

export type State = 'start' | 'run' | 'finish'

const useEngine = () => {
    const [state, setState] = useState<State>('start')
    const { words, updateWords} = useWords(NUMBER_OF_WORDS)
    const [countdownSeconds, setCountdownSeconds] = useState(0)
    const {typed, cursor, totalTyped, clearTyped, resetTotalTyped} = useTypings(state === 'finish', countdownSeconds)
    const { timeLeft, startCountdown, resetCountdown  } = useTimer(countdownSeconds)

    const [ errors,setErrors ]= useState(0)
    const isStarted = state === 'start' && cursor > 0
    const isWordsComplete = cursor === words.length

    const restart = useCallback(() => {
        resetTotalTyped()
        resetCountdown()
        setState('start')
        updateWords()
        clearTyped()
        setErrors(0)
    }, [clearTyped, resetCountdown, resetTotalTyped, updateWords])

    const sumErrors = useCallback(() => {
        const wordsReached = words.slice(0, Math.min(cursor, words.length))
        setErrors(prev => prev + countErrors(typed, wordsReached))
    }, [typed, cursor, words])

    useEffect(() => {
        if (isStarted && countdownSeconds > 0) {
            setState('run')
            startCountdown()
        }
    }, [isStarted, startCountdown, countdownSeconds])

    useEffect(() => {
        if(timeLeft === 0 && state === 'run') {
            setState('finish')
            sumErrors()
            setCountdownSeconds(0)
        }
    }, [timeLeft, state, sumErrors, setCountdownSeconds])

    useEffect(() => {
        if(isWordsComplete && state === 'run') {
            updateWords()
            clearTyped()
            sumErrors()
        }
    }, [isWordsComplete, state, updateWords, clearTyped, sumErrors])

    return { state, words, timeLeft, typed, cursor, totalTyped, resetTotalTyped, errors, restart, isWordsComplete, setCountdownSeconds }

}

export default useEngine;