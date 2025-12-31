import Caret from "./Caret"



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