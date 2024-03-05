import mole from "../assets/mole.png";
import hole from "../assets/hole.png";
import useActions from "../hooks/useActions";
import { useEffect } from "react";
import useTimer from "../hooks/useTimer";
import { easy } from "../constants/wininigRates";

interface GameBoardProps {
  isStarted: boolean;
  onScoreChange: (newScore: number) => void;
  onFinish: () => void;
}

const GameBoard = ({ isStarted, onScoreChange, onFinish }: GameBoardProps) => {
  const { score, moles, updateScore } = useActions(isStarted);
  const { remaining, start, completed } = useTimer();

  // set score
  useEffect(() => {
    onScoreChange(score);
  }, [score, onScoreChange]);

  // unmount the component when react 0 seconds
  useEffect(() => {
    if (completed) {
      onFinish();
      if (Number(score) >= easy) window.alert("You won 🚀");
      else window.alert("Failed!. Let's try again 👊");
    }
  }, [remaining]);

  // start the game
  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <p>
        Target {easy - score} score within seconds: {remaining}
      </p>
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
