import React, { useState, useEffect } from "react";

function PlayGames() {
  return (
    <div className="p-6 mt-20 text-center min-h-screen bg-gradient-to-br from-indigo-50 to-pink-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-indigo-600 mb-2">🎮 Play Games</h1>
      <p className="text-gray-700 mb-10 text-lg">
        Boost your mood and relax with these mini games 😄
      </p>

      {/* Games */}
      <div className="flex flex-col gap-16 items-center">
        <MemoryGame />
        <TicTacToe />
        <ReactionGame />
      </div>
    </div>
  );
}

export default PlayGames;

//
// 🧩 Memory Match Game
//
function MemoryGame() {
  const emojis = ["🍎", "🍇", "🍉", "🍒", "🍍", "🍓"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
  }, []);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        setMatched([...matched, cards[a].emoji]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">🧠 Memory Match</h2>
      <p className="text-gray-500 mb-4">Match the emoji pairs as fast as you can!</p>
      <div className="grid grid-cols-4 gap-4 justify-center max-w-md mx-auto">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => handleFlip(i)}
            className="bg-indigo-100 text-3xl p-4 rounded-lg shadow-md hover:bg-indigo-200 transition-all"
          >
            {flipped.includes(i) || matched.includes(card.emoji) ? card.emoji : "❓"}
          </button>
        ))}
      </div>
      {matched.length === emojis.length && (
        <p className="mt-4 text-green-600 font-semibold">🎉 You matched all pairs!</p>
      )}
    </div>
  );
}

//
// ⭕ Tic Tac Toe Game
//
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(i) {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">⭕ Tic Tac Toe</h2>
      <p className="text-gray-500 mb-4">Classic game for two players!</p>

      <div className="grid grid-cols-3 gap-2 justify-center max-w-xs mx-auto">
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 bg-indigo-50 text-3xl font-bold rounded-lg shadow-md hover:bg-indigo-100"
          >
            {value}
          </button>
        ))}
      </div>

      <p className="mt-4 text-lg font-semibold">
        {winner
          ? `🎉 Winner: ${winner}`
          : `Next Player: ${xIsNext ? "X" : "O"}`}
      </p>

      <button
        onClick={resetGame}
        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        🔄 Restart
      </button>
    </div>
  );
}

//
// ⚡ Reaction Time Game
//
function ReactionGame() {
  const [waiting, setWaiting] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("Click to Start");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);

  const startGame = () => {
    setWaiting(true);
    setMessage("Wait for green...");
    setReactionTime(null);
    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      setReady(true);
      setWaiting(false);
      setMessage("Click now!");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (waiting) {
      setMessage("Too soon! Wait for green 😅");
      setWaiting(false);
    } else if (ready) {
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setMessage(`Your reaction: ${reaction} ms ⚡`);
      setReady(false);
    } else {
      startGame();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-green-600 mb-4">⚡ Reaction Time</h2>
      <p className="text-gray-500 mb-4">Test how fast you can react!</p>

      <div
        onClick={handleClick}
        className={`w-80 h-60 mx-auto flex items-center justify-center text-xl font-semibold text-white rounded-2xl shadow-lg cursor-pointer transition-colors ${
          waiting
            ? "bg-red-500"
            : ready
            ? "bg-green-500"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {message}
      </div>

      {reactionTime && (
        <p className="mt-4 text-lg text-gray-700">Try to beat your score!</p>
      )}
    </div>
  );
}
