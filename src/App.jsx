import { useState } from "react"

const TURNS ={
  X:'x',
  O:'o'
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const Squere = ({children, updateBoard, index,isSelected})=>{
  const className = `square ${isSelected ? 'is-selected':''}`

  const handleclick = () =>{
    updateBoard(index)
  }
  return(
    <div className={className} onClick={handleclick}>
        {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const updateBoard = (index)=>{
    //si hay una ficha o un ganador para el juego
    if(board[index] || winner) return

    //actualizar el turno
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn =  turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
      {
        board.map((_,index)=>{
          return(
            <Squere 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
            {board[index]}
            </Squere>
          )
        })
      }

      </section>
      <section className="turn">
        <Squere isSelected={turn === TURNS.X}>{TURNS.X}</Squere>
        <Squere isSelected={turn === TURNS.O}>{TURNS.O}</Squere>
      </section>

        {
          winner != null && (
            <section className="winner">
              <div className="text">
                <h2 >
                  {
                    winner === false ? 'Empate' : 'Gano'
                  }
                </h2>
                <header className="win">
                  { winner && <Squere>{winner}</Squere>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }

    </main>
  )
}

export default App
