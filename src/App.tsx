import RestartButton from "./components/RestartButton"
import { Toaster } from "react-hot-toast";
import useEngine from "./hooks/useEngine"
import TimeSelecter from "./components/TimeSelecter"
import GenerateWords from "./components/GenerateWords"
import { useState } from "react"


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

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto px-4 mt-20">  

      <TimeSelecter onTimeSelect={setCountdownSeconds} />
      <Toaster />

      <WordsContainer>
        <GenerateWords words={words} />
      </WordsContainer>

      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => restart()}
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