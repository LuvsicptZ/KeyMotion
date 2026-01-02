import { useState, useEffect } from "react"
import { IoIosHelpCircleOutline } from "react-icons/io"
import { useSound } from "use-sound"

const TIME_OPTIONS = [30, 60, 90]

export default function TimeSelector({
  onTimeSelect,
  timeLeft,
  state,
}: {
  onTimeSelect: (time: number) => void
  timeLeft: number
  state: string
}) {
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [play] = useSound("/bubble.wav", { volume: 0.5 })

  useEffect(() => {
    if (state === "start") setSelectedTime(null)
  }, [state])

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time)
    onTimeSelect(time)
  } 

  if (state === 'run' || state === 'finish') {
    return (
      <div className="flex gap-2 justify-start items-center mt-10 text-lg text-green-600">
        Time Left: {timeLeft}s
      </div>  
    )
  }

  return (
    <div className="flex gap-2 justify-start items-center mt-10">
      <div
        onMouseEnter={() => play()}
        className="flex gap-1 cursor-default has-tooltip items-center text-md dark:text-primary-400 text-green-600 font-medium text-start"
      >
        <IoIosHelpCircleOutline className="hover:scale-105 hover:cursor-pointer" />
        <div>Choose time:</div>
        <span className="-mt-[7rem] text-sm w-fit max-w-[22rem] tooltip rounded py-2 bg-transparent dark:text-slate-300 text-slate-600 transition">
          Choose the countdown time and type to start testing your typing speed!
        </span>
      </div>
      
      <div className="flex items-center">
        {TIME_OPTIONS.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            className={`${
              selectedTime === time 
                ? "bg-gray-300 underline dark:bg-slate-700" 
                : ""
            } hover:underline hover:cursor-pointer dark:text-primary-400 text-green-600 p-2 rounded-md transition-colors`}
          >
            {time}s
          </button>
        ))}
      </div>
    </div>
  )
}