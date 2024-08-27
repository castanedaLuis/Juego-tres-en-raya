import { Children, useState } from "react"

const TURNS ={
  X:'x',
  O:'o'
}



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

  const updateBoard = (index)=>{
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn =  turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }
  return (
    
    <main className="board">
      <h1>Tic Tac Toe</h1>
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
    </main>
  )
}

export default App
