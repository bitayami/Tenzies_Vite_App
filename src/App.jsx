import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import Die from './Die';

function App() {
  const [dice, setDice] = useState(()=> generateAllNewDice())
  const buttonRef= useRef(null);
  const audioRef = useRef(null);

  const gameWon= dice.every((die)=> die.isHeld) && dice.every((die)=>die.value===dice[0].value)
  
  useEffect(()=>{
    if(gameWon) {
      buttonRef.current.focus()
      audioRef.current.play();
    }
  },[gameWon])


  function generateAllNewDice() {
    return new Array(10).fill(0).map(()=> ({
      value: Math.ceil(Math.random()* 6),
      // value:4,
      isHeld: false,
      id: nanoid()
    }))
  }

  function rollDice() {
    if(!gameWon) {
      setDice(oldObj=> oldObj.map(die => 
        die.isHeld?
        die:
        {...die, value: Math.ceil(Math.random() * 6)}
      ))
    }
    else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
    setDice(oldObj=> oldObj.map((die)=> 
        die.id===id ? 
            {...die, isHeld: !die.isHeld } :
            die
          ))
  }

  const diceElements= dice.map((dieObj)=> (
                        <Die 
                        key={dieObj.id} 
                        value={dieObj.value} 
                        isHeld={dieObj.isHeld}
                        gameWon={gameWon}
                        hold={()=>hold(dieObj.id)}/>
                      ))

  return (
    <main>
      {gameWon && (
        <>
          <Confetti/>
          <audio ref={audioRef} src="/congrats.mp3" />
        </>
      )}
      <div aria-live='polite' className='sr-only'>
        {gameWon && <p>Congratulations! You won! Press &quot;New Game&quot; to start again.</p>}
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>

      <button ref={buttonRef} className='roll-dice' onClick={rollDice}>
        {gameWon?'New Game':'Roll'}</button>
    </main>
  )
}

export default App
