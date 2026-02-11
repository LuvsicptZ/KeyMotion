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
        title="Restart"
        className={`pixel-button group ${className}`}
        >
        <FaRotateRight className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
    )
}

export default RestartButton