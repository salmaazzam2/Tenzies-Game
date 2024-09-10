import { useEffect, useRef, useState } from "react"
import Die from "./Die"
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'


function App() {
  const generateAllNewDice = () => {
    const diceArray = []
    for (let i =0; i < 10; i++) {
          const randomNum = Math.floor(Math.random() * 6) + 1
          diceArray.push({value: randomNum, isHeld: false, id: nanoid()})
    }
    return diceArray
  }

  const [dice, setDice] = useState(() => generateAllNewDice())
  const [tenzies, setTenzies] = useState(false)
  const numberOfRolls = useRef(0)

  const heldDice = (id) => {
    const updated = dice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
    setDice(updated)
  }
  const diceElements = dice.map(die => (<Die key={die.id} value={die.value} isHeld={die.isHeld} onClick={() => heldDice(die.id)} />))
  
  const roll = () => {
    if (tenzies) {
      setDice(generateAllNewDice())
      setTenzies(false)
      numberOfRolls.current = 0
    } else {
      numberOfRolls.current = numberOfRolls.current + 1
      const rolled = dice.map(die => die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1})
      setDice(rolled)
    }
    
  }

  useEffect(() => {
    const firstVal = dice[0].value
    const allSame = dice.filter(die => die.value === firstVal).length === 10
    const allHeld = dice.filter(die => die.isHeld === true).length === 10 

    if (allSame && allHeld) {
     setTenzies(true)
    }
  }, [dice])

  return (
    <main className="bg-[#0B2434] overflow-hidden h-screen font-karla flex justify-center items-center">
      {tenzies && <Confetti className="w-full"/>}
      <div className="px-5 w-4/5 h-4/5 md:h-3/5  bg-[#F5F5F5] rounded-lg flex flex-col items-center justify-around">
      <h1 className="text-4xl">Tenzies</h1>
      <div className=" w-full px-5 flex items-center justify-center text-lg">
        <h4 className="text-[#5035ff] font-bold">Number of rolls: {numberOfRolls.current} </h4>
      </div>
      <h4 className="text-center text-xl px-3">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
      <div className="grid grid-cols-5 grid-rows-2 gap-3 py-4">
        {diceElements}
      </div>
      <button className="bg-[#5035FF] px-10 py-3 text-white rounded-lg my-2 text-2xl" onClick={() => roll()}> {tenzies ? 'New Game' : 'Roll'} </button>
      </div>
    </main>
  )
}

export default App
