import { useEffect, useState } from "react";

const useActions = (isStarted: boolean) => {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);

  const updateMoles = (index: number, value: boolean) => {
    const updatedMoles = [...moles];
    updatedMoles[index] = value;
    setMoles(updatedMoles);
  };

  useEffect(() => {
    if (!isStarted) return;
    let randomIndex: number;
    const interval = setInterval(() => {
      randomIndex = Math.floor(Math.random() * moles.length);
      updateMoles(randomIndex, true);

      setTimeout(() => {
        updateMoles(randomIndex, false);
      }, 800);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  const updateScore = (index: number) => {
    if (!moles[index]) return;
    updateMoles(index, false);
    setScore(score + 1);
  };

  return {
    score,
    moles,
    updateScore,
  };
};

export default useActions;
