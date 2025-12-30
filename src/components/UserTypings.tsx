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
    return (
        <div className={className}>
            {words.split("").map((char, index) => (
                <Character
                    key={index}
                    actual={userTypings[index] || ""}
                    expected={char}
                />
            ))}
        </div>
    )
}

export default UserTypings