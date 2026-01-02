import RestartButton from "./components/RestartButton"
import { Toaster } from "react-hot-toast";
import useEngine from "./hooks/useEngine"
import TimeSelecter from "./components/TimeSelecter"
import GenerateWords from "./components/GenerateWords"
import { useState } from "react"
import UserTypings from "./components/UserTypings";
import { calculateAccuracyPercentage } from "./utils/helpers"
import Results from "./components/Results"


const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-full leading-relaxed break-all mt-3 align-justify [word-spacing:0.2em] ">
      {children}
    </div>
  )
}

const App = () => {
  const { 
    state, 
    words, 
    timeLeft, 
    typed, 
    errors, 
    restart, 
    totalTyped,
    setCountdownSeconds 
  } = useEngine()

  const [selectedTime, setSelectedTime] = useState(0)

  const handleTimeSelect = (time: number) => {
    setCountdownSeconds(time)
    setSelectedTime(time)
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto px-4 mt-20">  

      <TimeSelecter onTimeSelect={handleTimeSelect} timeLeft={timeLeft} state={state} />
      <Toaster />

      <WordsContainer>
        <GenerateWords words={words} />
        <UserTypings className="absolute inset-0" userTypings={typed} words={words} />
      </WordsContainer>

      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => {
          restart()
          setSelectedTime(0)
        }}
      />

      <Results
        state={state}
        className="mt-10"
        errors={errors}
        totalTime={selectedTime}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped.current)}
        total={totalTyped.current}
      />

    </div>
  );
};

export default App;