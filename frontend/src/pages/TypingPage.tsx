import RestartButton from "../components/RestartButton";
import toast, { Toaster } from "react-hot-toast";
import useEngine from "../hooks/useEngine";
import TimeSelecter from "../components/TimeSelecter";
import GenerateWords from "../components/GenerateWords";
import { useEffect, useRef, useState } from "react";
import UserTypings from "../components/UserTypings";
import { calculateAccuracyPercentage, calculateWPM } from "../utils/helpers";
import Results from "../components/Results";
import ThemeToggle from "../components/ThemeToggle";
import { createResult } from "../api/results";
import { Link } from "react-router-dom";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-full leading-relaxed break-all mt-3 align-justify [word-spacing:0.2em] ">
      {children}
    </div>
  );
};

const TypingPage = () => {
  const {
    state,
    words,
    timeLeft,
    typed,
    errors,
    restart,
    totalTyped,
    setCountdownSeconds,
  } = useEngine();

  const [selectedTime, setSelectedTime] = useState(0);
  const hasReportedRef = useRef(false);

  const total = totalTyped.current;
  const accuracyPercentage = calculateAccuracyPercentage(errors, total);

  const handleTimeSelect = (time: number) => {
    setCountdownSeconds(time);
    setSelectedTime(time);
  };

  useEffect(() => {
    if (state !== "finish") {
      hasReportedRef.current = false;
      return;
    }

    if (hasReportedRef.current || selectedTime <= 0) {
      return;
    }

    hasReportedRef.current = true;
    const correctCount = Math.max(total - errors, 0);
    const wpm = calculateWPM(correctCount, selectedTime);

    void createResult({
      wpm,
      accuracy: accuracyPercentage / 100,
      correctCount,
      totalCount: total,
      durationSec: selectedTime,
      mode: "time",
    }).catch((error: unknown) => {
      hasReportedRef.current = false;
      const message = error instanceof Error ? error.message : "Result upload failed";
      toast.error(message);
    });
  }, [state, selectedTime, total, errors, accuracyPercentage]);

  return (
    <div className="min-h-screen w-full relative">
      <h1 className="fixed top-6 left-6 text-2xl font-bold text-yellow-500 tracking-tight z-50">
        Key<span className="text-slate-500 dark:text-slate-400">Motion</span>
      </h1>

      <ThemeToggle />
      <Link
        to="/leaderboard"
        className="fixed top-7 right-20 z-50 border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 hover:border-yellow-400 hover:text-yellow-500 transition-colors"
      >
        Leaderboard
      </Link>

      <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto px-4 pt-24">
        <TimeSelecter
          onTimeSelect={handleTimeSelect}
          timeLeft={timeLeft}
          state={state}
          selectedTime={selectedTime}
        />
        <Toaster />

        <WordsContainer>
          <GenerateWords words={words} />
          <UserTypings className="absolute inset-0" userTypings={typed} words={words} />
        </WordsContainer>

        <RestartButton
          className="mx-auto mt-10 text-slate-500"
          onRestart={() => {
            restart();
            setSelectedTime(0);
          }}
        />

        <Results
          state={state}
          className="mt-10"
          errors={errors}
          totalTime={selectedTime}
          accuracyPercentage={accuracyPercentage}
          total={total}
        />
      </div>
    </div>
  );
};

export default TypingPage;