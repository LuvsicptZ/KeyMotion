
import './App.css'

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex flex-col gap-4"> 
      <div className="text-primary-400 font-medium">Choose time:</div>

      <Toaster />

      <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3 align-justify">
         <div className="text-slate-500">
            Generating random words... 
         </div>
      </div>

      <button className="mx-auto mt-10 text-slate-500">
        Restart
      </button>

      <div className="mt-10">Results</div>
    </div>
  );
};

export default App;