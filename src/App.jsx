import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  function handleSelectSquare(){
    setActivePlayer((prevPlayer) => prevPlayer === "X" ? "O" : "X");
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="PLAYER 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="PLAYER 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayer={activePlayer}/>
      </div>
    </main>
  )
}

export default App
