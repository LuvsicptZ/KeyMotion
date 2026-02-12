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
import { Link, useNavigate } from "react-router-dom";
import PixelLogo from "../components/PixelLogo";
import { useAuth } from "../auth/AuthContext";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-full leading-relaxed break-all mt-3 align-justify [word-spacing:0.2em] ">
      {children}
    </div>
  );
};

const TypingPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
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
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-mono">
      <PixelLogo />

      <ThemeToggle />
      <div className="fixed top-7 right-20 z-50 flex items-center gap-3">
        <Link to="/profile" className="pixel-button text-sm font-bold">
          Profile
        </Link>
        <Link to="/leaderboard" className="pixel-button text-sm font-bold">
          Leaderboard
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="pixel-button text-sm font-bold"
        >
          Log out
        </button>
      </div>

      <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center">
          <TimeSelecter
            onTimeSelect={handleTimeSelect}
            timeLeft={timeLeft}
            state={state}
            selectedTime={selectedTime}
          />
        </div>
        
        <Toaster />

        <div className="relative">
          {/* Decorative frame for the typing area */}
          <div className="pixel-card bg-white dark:bg-slate-900 min-h-[200px] flex items-center justify-center p-8">
            <WordsContainer>
              <GenerateWords words={words} />
              <UserTypings className="absolute inset-0" userTypings={typed} words={words} />
            </WordsContainer>
          </div>
          
          {/* Keyboard prompt */}
          {state === "start" && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-sm animate-pulse">
              Start typing to begin...
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-8">
          <RestartButton
            onRestart={() => {
              restart();
              setSelectedTime(0);
            }}
          />

          <Results
            state={state}
            errors={errors}
            totalTime={selectedTime}
            accuracyPercentage={accuracyPercentage}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingPage;