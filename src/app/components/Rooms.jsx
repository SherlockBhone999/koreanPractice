import { Context } from '../../App'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const LastRoomDoor = ({lastRoomNum}) => {
  const { allItems } = useContext(Context)
  const navigate = useNavigate()
  

  return <div class="flex w-full">
    <button onClick={()=>{
      navigate(`/rooms/${lastRoomNum+1}`)
    }} class="w-full h-[10vh] bg-blue-200 rounded m-2 flex justify-center items-center"
    >
      <div>
        <p class="text-xl">{lastRoomNum+1}</p>
        <p class="text-xs">{lastRoomNum*50} - {allItems.length}</p>
      </div>
    </button>
  </div>
}


const OneRoomDoor = ({num}) => {
  const navigate = useNavigate()

  return <div class="flex w-full">
    <button onClick={()=>{
      navigate(`/rooms/${num}`)
    }} class="w-full h-[10vh] bg-blue-200 rounded m-2 flex justify-center items-center"
    >
      <div>
        <p class="text-xl">{num}</p>
        <p class="text-xs">{(num-1)*50} - {num*50}</p>
      </div>
    </button>
  </div>
}


export default function TestRooms () {
  const { allItems } = useContext(Context)
  const [ rooms, setRooms ] = useState([])
  
  useEffect(()=>{
    const roomCount = Math.floor( allItems.length / 50 )
    const arrOfNum = []
    for(let i=1; i<=roomCount ; i++){
      arrOfNum.push(i)
    }
    setRooms(arrOfNum)
  },[])
  
  return (
    <div class="w-full h-[90vh] overflow-scroll">
    
      <div class="grid grid-cols-4 w-full mb-7">
        {rooms.map((n)=><div>
          <OneRoomDoor num={n} />
        </div>)}
        <LastRoomDoor lastRoomNum={rooms.length}/>
      
      </div>
    </div>
    )
}