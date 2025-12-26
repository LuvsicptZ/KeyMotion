import './App.css'
import RestartButton from "./components/RestartButton"
import { Toaster } from "react-hot-toast";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3 align-justify">
      {children}
    </div>
  )
}

const App = () => {
  return (
    <div className="flex flex-col gap-4"> 
      <div className="text-primary-400 font-medium">Choose time:</div>

      <Toaster />

      <WordsContainer>
        <div className="text-slate-500">
          Generating random words... 
        </div>
      </WordsContainer>

      <RestartButton
        className="mx-auto mt-10 text-slat-500"
        onRestart={() => restart()}
      />

      <div className="mt-10">Results</div>
    </div>
  );
};

export default App;