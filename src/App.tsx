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
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3 align-justify">
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

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto px-4 mt-20">  

      <TimeSelecter onTimeSelect={setCountdownSeconds} />
      <Toaster />

      <WordsContainer>
        <GenerateWords words={words} />
        <UserTypings className="absolute inset-0" userTypings={typed} words={words} />
      </WordsContainer>

      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => restart()}
      />

      <Results
        state={state}
        className="mt-10"
        errors={errors}
        totalTime={selectedTime}
        accuracyPercentage={calculateAccuracyPercentage(totalTyped.current, errors)}
        total={totalTyped.current}
      />

      <div className="mt-10 flex gap-4 justify-center text-slate-500">
        <div>Time: <span className="text-primary-400">{timeLeft}s</span></div>
        <div>Errors: <span className="text-red-500">{errors}</span></div>
        <div>Typed: <span className="text-green-500">{totalTyped.current}</span></div>
      </div>
    </div>
  );
};

export default App;