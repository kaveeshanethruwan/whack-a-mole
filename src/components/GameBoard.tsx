import mole from "../assets/mole.png";
import hole from "../assets/hole.png";
import { useEffect, useState } from "react";

const GameBoard = () => {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);

  const updateMoles = (index: number, value: boolean) => {
    const updatedMoles = [...moles];
    updatedMoles[index] = value;
    setMoles(updatedMoles);
  };

  useEffect(() => {
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

  return (
    <>
      <p>score: {score}</p>
      <div className="grid">
        {moles &&
          moles.map((item, index) => {
            return (
              <img
                onClick={() => {
                  updateScore(index);
                }}
                key={index}
                src={item ? mole : hole}
              />
            );
          })}
      </div>
    </>
  );
};

export default GameBoard;
