import useSound from "use-sound";
import Caret from "./Caret"
import { useRef, useEffect, useMemo } from "react"


const Character = ({ actual, expected }: { actual: string; expected: string }) => {
    const isCorrect = actual === expected
    const isWhiteSpace = expected === " "

    const getClassName = () => {
        if (!isCorrect && !isWhiteSpace) return "text-red-500"
        if (isCorrect && !isWhiteSpace) return "text-green-500"
        if (!isCorrect && isWhiteSpace) return "bg-red-500/60"
        return ""
    }
    
    return (
        <span className={getClassName()}>
            {expected}
        </span>
    )
}

const UserTypings = ({
    userTypings,
    words,
    className,
}: {
    userTypings: string
    words: string
    className?: string
}) => {
    const typedCharacters = userTypings.split("")

    const soundOptions = useMemo(() => ({ volume: 0.5, interrupt: true }), [])
    const [playCorrect] = useSound("/keyboard_stroke.wav", soundOptions)
    const [playWrong] = useSound("/typing_wrong.wav", soundOptions)

    const prevLenRef = useRef(0)


    useEffect(() => {
        const prevLen = prevLenRef.current
        const nextLen = userTypings.length
        
        if (nextLen > prevLen) {
            const index = nextLen - 1
            const actualChar = userTypings[index]
            const expectedChar = words[index]

            if (expectedChar == null) return

            const isCorrect = actualChar === expectedChar
            console.log("[typing-sound]", { index, actualChar, expectedChar, isCorrect })
        
            if (isCorrect) playCorrect()
            else playWrong()
        }
        
        prevLenRef.current = nextLen
    }, [userTypings, words, playCorrect, playWrong])



    
    return (
        <div className={className}>
            {typedCharacters.map((char, index) => (
                <Character
                    key={`${char}_${index}`}
                    actual={char}
                    expected={words[index]}
                />
            ))}
            <Caret />
        </div>
    )
}

export default UserTypings