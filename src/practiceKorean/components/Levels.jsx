import { useState, useEffect } from 'react'
import { words } from '../words'
import { useNavigate } from 'react-router-dom'

const TheLastLevelRoom = () => {
  const navigate = useNavigate()
  const n = Math.floor(words.length/50)
  const nn = words.length%50
  
  return <div>
    <button class='w-40 h-36 bg-blue-200 rounded m-2 flex justify-center items-center'
    onClick={()=>{
      navigate(`/:${n+1}`)
    }}>
      <div>
        <p class='flex justify-center'>{ n + 1 }</p>
        <p>{n*50} to {(n*50)+nn} </p>
      </div>
    </button>
  </div>
}

const OneLevelRoom = ({num}) => {
  const navigate = useNavigate()
  
  return <div>
    <button class='w-40 h-36 bg-blue-200 rounded m-2 flex justify-center items-center'
    onClick={()=>{
      navigate(`/:${num}`)
    }}>
      <div>
      <p class='flex justify-center'>{num}</p>
      <p>{((num-1)*50)+0} to {num*50}</p>
      </div>
    </button>
  </div>
}


export default function Levels(){
  const [ levelRooms , setLevelRooms ] = useState([])
  
  useEffect(()=>{
    const n = Math.floor( words.length / 50 )
    const arr = []
    for(let i=1; i<=n; i++ ){
      arr.push(i)
    }
    setLevelRooms(arr)
  },[])
  
  return <div>
  
    <div class='grid grid-cols-4'>
      {
        levelRooms.map(num => <div>
          <OneLevelRoom num={num} />
        </div>)
      }
      <TheLastLevelRoom />
    </div>
    
  </div>
}