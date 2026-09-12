import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

const getWinner = (board) => winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) ? board[winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c])[0]] : null

const chooseMove = (board) => {
  const available = board.map((value, index) => value ? null : index).filter((index) => index !== null)
  for (const mark of ['O', 'X']) {
    for (const index of available) {
      const candidate = [...board]
      candidate[index] = mark
      if (getWinner(candidate) === mark) return index
    }
  }
  return available.includes(4) ? 4 : available[Math.floor(Math.random() * available.length)]
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')
  const [winner, setWinner] = useState(null)
  const [isThinking, setIsThinking] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isDraw = !winner && board.every(Boolean)

  useEffect(() => {
    if (turn !== 'O' || winner || isDraw) return undefined
    setIsThinking(true)
    const timeout = window.setTimeout(() => {
      setBoard((currentBoard) => {
        const move = chooseMove(currentBoard)
        if (move === undefined) return currentBoard
        const nextBoard = [...currentBoard]
        nextBoard[move] = 'O'
        const nextWinner = getWinner(nextBoard)
        setWinner(nextWinner)
        setTurn(nextWinner || nextBoard.every(Boolean) ? null : 'X')
        setIsThinking(false)
        return nextBoard
      })
    }, shouldReduceMotion ? 0 : 550)
    return () => window.clearTimeout(timeout)
  }, [board, isDraw, shouldReduceMotion, turn, winner])

  const handleCellClick = (index) => {
    if (board[index] || turn !== 'X' || winner || isDraw) return
    const nextBoard = [...board]
    nextBoard[index] = 'X'
    const nextWinner = getWinner(nextBoard)
    setBoard(nextBoard)
    setWinner(nextWinner)
    setTurn(nextWinner || nextBoard.every(Boolean) ? null : 'O')
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn('X')
    setWinner(null)
    setIsThinking(false)
  }

  return (
    <div className="tic-tac-toe" aria-label="Tic-Tac-Toe game">
      <div className="tic-tac-toe-status" aria-live="polite">
        {winner ? `${winner === 'X' ? 'You win!' : 'I win!'} ` : isDraw ? 'Draw game. ' : isThinking ? 'Thinking... ' : `${turn === 'X' ? 'Your turn' : 'My turn'} `}
        {(winner || isDraw) && <button type="button" onClick={resetGame}>Play Again</button>}
      </div>
      <div className="tic-tac-toe-grid">
        {board.map((mark, index) => (
          <button key={index} type="button" className="tic-tac-toe-cell" onClick={() => handleCellClick(index)} disabled={Boolean(mark) || turn !== 'X' || Boolean(winner) || isDraw} aria-label={`Square ${index + 1}${mark ? `, ${mark}` : ''}`}>
            {mark && (
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={mark === 'X' ? 'tic-mark-x' : 'tic-mark-o'}
              >
                {mark}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
