import { useRef, useState, useEffect } from "react";

function useTimer() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [matured, setMatured] = useState(false);

  useEffect(() => {
    // Set initial value to 1 minute when component mounts
    setStartTime(Date.now() - 60000);
    setNow(Date.now());

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, []);

  const handleStart = () => {
    if (!running) {
      setRunning(true);
      setStartTime(Date.now());
      setNow(Date.now());

      intervalRef.current = setInterval(() => {
        setNow(Date.now());
        setMatured(true);
      }, 10);
    }
  };

  let secondsPassed = 0;
  if (running) {
    secondsPassed = (now! - startTime!) / 1000;
  }

  const remainingTime = Math.max(60 - secondsPassed, 0); // Countdown from 1 minute
  const seconds = Math.floor(remainingTime % 60);

  return {
    start: handleStart,
    remaining: String(seconds).padStart(2, "0"),
    completed: seconds === 0 && matured ? true : false,
  };
}

export default useTimer;
