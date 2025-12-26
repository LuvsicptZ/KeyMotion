import { useRef } from "react"

function RestartButton({
    className = "",
    onRestart: handleRestart,
}: {
    className?: string
    onRestart: () => void
}) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClick = () => {
        buttonRef.current?.blur()
        handleRestart()
    }
    return (
        <button 
        ref={buttonRef} 
        onClick={handleClick} 
        className={`block rounded px-8 py-2 dark:hover:bg-slate-700/50 hover:bg-slate-600 ${className}`}
        >
        Restart
        </button>
    )
}

export default RestartButton