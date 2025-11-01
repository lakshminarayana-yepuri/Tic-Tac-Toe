import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [player1Name, setPlayer1Name] = useState("PLAYER 1");
  const [player2Name, setPlayer2Name] = useState("PLAYER 2");

  function handleSelectSquare() {
    setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={player1Name} onNameChange={setPlayer1Name} symbol="X" isActive={activePlayer === "X"} />
          <Player name={player2Name} onNameChange={setPlayer2Name} symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayer={activePlayer}
          onReset={() => setActivePlayer("X")}
          playerNames={{ X: player1Name, O: player2Name }}
        />
      </div>
    </main>
  );
}

export default App
