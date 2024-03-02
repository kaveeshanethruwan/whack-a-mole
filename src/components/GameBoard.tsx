import mole from "../assets/mole.png";
import hole from "../assets/hole.png";
import { useEffect, useState } from "react";

const GameBoard = () => {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      const updatedMoles = [...moles];
      updatedMoles[randomIndex] = true;
      setMoles(updatedMoles);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  const updateScore = (index: number) => {
    if (!moles[index]) return;
    const updatedMoles = [...moles];
    updatedMoles[index] = false;
    setMoles(updatedMoles);
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
