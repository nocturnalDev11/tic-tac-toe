"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegCircle, FaTimes } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { TbMoodEmpty } from "react-icons/tb";

export default function Home() {
    const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const winner = calculateWinner(board);
    const status = winner
        ? `Winner: ${winner}`
        : board.every(Boolean)
        ? "It's a Draw!"
        : `Next player: ${xIsNext ? "X" : "O"}`;

    function handleClick(index: number) {
        if (board[index] || winner) return;
        const newBoard = board.slice();
        newBoard[index] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-neutral-800 text-white">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-extrabold mb-8 tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
            >
                Tic-Tac-Toe
            </motion.h1>

            <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            >
                {board.map((value, index) => (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    key={index}
                    onClick={() => handleClick(index)}
                    className="w-28 h-28 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg flex items-center justify-center text-5xl transition-all"
                >
                    {value === "X" && <FaTimes className="text-red-500" />}
                    {value === "O" && <FaRegCircle className="text-blue-400" />}
                    {!value && <TbMoodEmpty className="text-white/20" />}
                </motion.button>
                ))}
            </motion.div>

            <motion.div
                className="mt-8 flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <p className="text-2xl font-medium">{status}</p>
                <button
                    onClick={resetGame}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity shadow-md"
                >
                    <FiRefreshCw className="text-xl" />
                    <span>Reset Game</span>
                </button>
            </motion.div>
        </main>
    );
}

function calculateWinner(squares: Array<string | null>) {
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
    for (const [a, b, c] of lines) {
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
  return null;
}
