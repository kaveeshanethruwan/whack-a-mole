import { useRef, useState, useEffect } from "react";

function Stopwatch() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

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
        console.log("im running");
        setNow(Date.now());
      }, 10);
    }
  };

  let secondsPassed = 0;
  if (running) {
    secondsPassed = (now! - startTime!) / 1000;
  }

  const remainingTime = Math.max(60 - secondsPassed, 0); // Countdown from 1 minute

  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  const milliseconds = String(Math.floor((remainingTime - Math.floor(remainingTime)) * 1000)).padStart(3, "0");

  return (
    <>
      <div style={{ backgroundColor: "green", width: "100%" }}>
        <h1>Time remaining: {remainingTime.toFixed(3)}</h1>

        <p>Minutes:{String(minutes).padStart(2, "0")} </p>
        <p>Seconds:{String(seconds).padStart(2, "0")} </p>
        <p>Milliseconds:{milliseconds}</p>
        <button
          onClick={() => {
            if (!running) {
              handleStart();
            }
          }}>
          {!running ? `Start` : `Running`}
        </button>
      </div>
    </>
  );
}

export default Stopwatch;
