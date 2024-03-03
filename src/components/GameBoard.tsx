import mole from "../assets/mole.png";
import hole from "../assets/hole.png";
import useActions from "../hooks/useActions";

const GameBoard = () => {
  const { score, moles, updateScore } = useActions();

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
