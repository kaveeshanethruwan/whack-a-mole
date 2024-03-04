import mole from "../assets/mole.png";
import hole from "../assets/hole.png";
import useActions from "../hooks/useActions";
import { useEffect } from "react";

interface GameBoardProps {
  isStarted: boolean;
  onScoreChange: (newScore: number) => void;
}

const GameBoard = ({ isStarted, onScoreChange }: GameBoardProps) => {
  const { score, moles, updateScore } = useActions(isStarted);

  useEffect(() => {
    onScoreChange(score);
  }, [score, onScoreChange]);

  return (
    <>
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
