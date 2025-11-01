import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function calculateWinner(board) {
    const lines = [
        // rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // cols
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    for (const line of lines) {
        const [[aR, aC], [bR, bC], [cR, cC]] = line;
        const a = board[aR][aC];
        if (a && a === board[bR][bC] && a === board[cR][cC]) {
            return a;
        }
    }
    return null;
}

export default function GameBoard({ onSelectSquare, activePlayer, onReset, playerNames = {} }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    function handleSelectSquare(rowIndex, colIndex) {
        // ignore clicks when game already won
        if (winner || isDraw) return;

        // don't overwrite an occupied square
        if (gameBoard[rowIndex][colIndex]) return;

        const updated = gameBoard.map((r) => [...r]);
        updated[rowIndex][colIndex] = activePlayer;
        setGameBoard(updated);

        const w = calculateWinner(updated);
        if (w) {
            setWinner(w);
            return;
        }

        const full = updated.flat().every((cell) => cell !== null);
        if (full) {
            setIsDraw(true);
            return;
        }

        // only toggle active player when a move was made and game continues
        if (onSelectSquare) onSelectSquare();
    }

    function handleReset() {
        setGameBoard(initialGameBoard);
        setWinner(null);
        setIsDraw(false);
        if (onReset) onReset();
    }

    return (
        <>
            <ol id="game-board">
                {gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => (
                                <li key={colIndex}>
                                    <button
                                        onClick={() => handleSelectSquare(rowIndex, colIndex)}
                                        aria-label={`Square ${rowIndex + 1}-${colIndex + 1}`}>
                                        {playerSymbol || ""}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>

                    {(winner || isDraw) && (
                        <div id="game-over">
                            <h2>{winner ? `${playerNames[winner] || winner} wins!` : "Draw"}</h2>
                            <p>{winner ? `${playerNames[winner] || ('Player ' + winner)} wins the game.` : "No more moves left."}</p>
                            <button onClick={handleReset}>New Game</button>
                        </div>
                    )}
        </>
    );
}