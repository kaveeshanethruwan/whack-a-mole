import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);

  const onStartChange = () => {
    setIsStarted(!isStarted);
  };

  const onScoreChange = (score: number) => {
    setScore(score);
  };

  return (
    <div className="app-container">
      <h1>Whack-A-Mole</h1>
      {isStarted && <h1>Score: {score}</h1>}
      {isStarted ? (
        <GameBoard
          isStarted={isStarted}
          onScoreChange={(score: number) => {
            onScoreChange(score);
          }}
        />
      ) : null}

      <button className="app-main-button" onClick={onStartChange}>
        {isStarted ? "EXIT" : "START"}
      </button>
    </div>
  );
}

export default App;
