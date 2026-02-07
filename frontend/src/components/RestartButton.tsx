import { useRef } from "react"
import { FaRotateRight } from "react-icons/fa6"

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
        className={`block rounded px-8 py-2 dark:hover:bg-slate-700/50 hover:cursor-pointer hover:bg-slate-200/90 ${className}`}
        >
        <FaRotateRight className="w-6 h-6" />
        </button>
    )
}

export default RestartButton