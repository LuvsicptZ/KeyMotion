import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import { motion } from "framer-motion";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

const BGM_STORAGE_KEY = "keymotion-bgm-enabled";

type BackgroundMusicProps = {
  src?: string;
  volume?: number;
  className?: string;
};

export default function BackgroundMusic({
  src = "/background.mp3",
  volume = 0.3,
  className = "",
}: BackgroundMusicProps) {
  const [musicOn, setMusicOn] = useState(() => {
    try {
      return localStorage.getItem(BGM_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [playBgm, { stop: stopBgm }] = useSound(src, {
    loop: true,
    volume,
  });

  const [playToggle] = useSound("/toggle.wav", { volume: 0.5 });

  useEffect(() => {
    try {
      localStorage.setItem(BGM_STORAGE_KEY, String(musicOn));
    } catch {
    }
  }, [musicOn]);

  useEffect(() => {
    if (musicOn) {
      playBgm();
    } else {
      stopBgm();
    }
    return () => stopBgm();
  }, [musicOn, playBgm, stopBgm]);

  return (
    <motion.button
      type="button"
      onClick={() => {
        playToggle();
        setMusicOn((v) => !v);
      }}
      className={
        className ||
        "fixed top-6 right-16 z-50 p-3 rounded-full text-slate-700 dark:text-slate-200 hover:scale-110 transition-all duration-300"
      }
      whileTap={{ scale: 0.9, rotate: 180 }}
      title={musicOn ? "Mute background music" : "Play background music"}
      aria-label={musicOn ? "Mute background music" : "Play background music"}
    >
      <motion.div
        key={musicOn ? "on" : "off"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {musicOn ? (
          <FaMusic className="text-slate-800 dark:text-slate-100" size={22} />
        ) : (
          <FaVolumeMute className="text-slate-500 dark:text-slate-400" size={22} />
        )}
      </motion.div>
    </motion.button>
  );
}
