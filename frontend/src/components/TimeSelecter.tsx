import { IoIosHelpCircleOutline } from "react-icons/io"
import { useSound } from "use-sound"

const TIME_OPTIONS = [30, 60, 90]

export default function TimeSelector({
  onTimeSelect,
  timeLeft,
  state,
  selectedTime,
}: {
  onTimeSelect: (time: number) => void
  timeLeft: number
  state: string
  selectedTime: number
}) {
  const [play] = useSound("/bubble.wav", { volume: 0.5 })

  const handleTimeSelect = (time: number) => {
    play()
    onTimeSelect(time)
  } 

  if (state === 'run' || state === 'finish') {
    return (
      <div className="inline-flex items-center px-6 py-3 border-4 border-slate-800 dark:border-slate-100 bg-white dark:bg-slate-800 font-black text-2xl">
        <span className="text-slate-500 mr-2 uppercase text-sm">Time Left:</span>
        <span className={`${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`}>
          {timeLeft}s
        </span>
      </div>  
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 items-center">
        {TIME_OPTIONS.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            className={`pixel-button min-w-[80px] font-bold ${
              selectedTime === time 
                ? "bg-yellow-400! dark:bg-yellow-600! text-slate-900!" 
                : ""
            }`}
          >
            {time}s
          </button>
        ))}
      </div>
      <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
        Select Duration
      </div>
    </div>
  )
}
