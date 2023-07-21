import Rooms from './1NRooms'
import Room from './1NRoom'
import NextPrevBtn from './2NPrev&NextBtn'

import { useState, useEffect} from 'react'



const Nav = ({currentRoom, setCurrentRoom}) => {
  return <div class="w-full flex justify-center ">
    <div class="flex text-[0.75rem]">
      <button onClick={()=>{
        setCurrentRoom(null)
      }}> rooms</button>
      <p class="ml-2" > {currentRoom? " /  "+ currentRoom : null }</p>
    </div>
  </div>
}



export default function Container ({groupObj}) {
  const [ currentRoom, setCurrentRoom ] = useState(null)
  const [ roomsShowOrNot, setRoomsShowOrNot] = useState(" hidden")
  const [ roomShowOrNot , setRoomShowOrNot ] = useState("")
  const [ listForRoom , setListForRoom ] = useState([])
  const listForRooms = groupObj.subgroups
  
  useEffect(()=>{
    if(currentRoom === null){
      setRoomShowOrNot("hidden")
      setRoomsShowOrNot(" ")
      setListForRoom([])
    }else{
      setRoomShowOrNot("")
      setRoomsShowOrNot("hidden")
    
      const arr = groupObj.subgroups[currentRoom-1].items
      setListForRoom(arr)
    }
  },[currentRoom])
  
  
  
  return <div class="w-screen h-screen overflow-hidden">

    <Nav currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
  
    <div class={`flex justify-center ${roomsShowOrNot}`}>
      <div class="w-7/12">
        <Rooms list={listForRooms} setCurrentRoom={setCurrentRoom}/>
      </div>
    </div>
    
    <div class={`${roomShowOrNot} m-2 rounded-lg shadow`} >
      <NextPrevBtn groupObj={groupObj} 
      setCurrentRoom={setCurrentRoom}
      currentRoom={currentRoom}/>
      <Room list={listForRoom}/>
    </div>
    
  </div>
}



/*
demo data for allgroups 

const allgroups = {
  oneN : {
    count : 100,
    subgroups : [
      { num : 1 , items : [ word objs]  },
      { num : 2 , items : []  }, 
      ...
    ]
  }
  
}

*/