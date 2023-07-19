import Rooms1 from './2NRooms'
import Rooms2 from './2NRooms2'
import Room from './1NRoom'
import NextPrevBtn from './2NPrev&NextBtn'

import { useState, useEffect} from 'react'



const Nav = ({currentRoom, setCurrentRoom}) => {
  return <div class="w-full flex justify-center ">
    <div class="flex ">
      <button onClick={()=>{
        setCurrentRoom(null)
      }}> rooms</button>
      <p class="ml-2" > {currentRoom? " /  "+ currentRoom : null }</p>
    </div>
  </div>
}

const getListOfItemsForEachRoom = (currentRoom, groupObj) => {
  var myarr = []
  if( typeof(currentRoom) === "number" ){
    myarr = groupObj.subgroups[currentRoom-1].items
  }else if( typeof(currentRoom) === "string") {
    //
    if(currentRoom[1] === '-' ){
      groupObj.starts.map(obj => {
        if(obj.letter === currentRoom[0]) {
          myarr = obj.items
        }
      })
    }else if( currentRoom[0] === '-' ){
      groupObj.ends.map(obj => {
        if(obj.letter === currentRoom[1] ){
          myarr = obj.items
        }
      })
    }
  }
  return myarr
}

export default function Container ({groupObj}) {
  const [ currentRoom, setCurrentRoom ] = useState(null)
  const [ roomsShowOrNot, setRoomsShowOrNot] = useState(" hidden")
  const [ roomShowOrNot , setRoomShowOrNot ] = useState("")
  const [ listForRoom , setListForRoom ] = useState([])
  const listForRooms1 = groupObj.subgroups
  

  useEffect(()=>{
    if(currentRoom === null){
      setRoomShowOrNot("hidden")
      setRoomsShowOrNot(" ")
      setListForRoom([])
    }else{
      setRoomShowOrNot("")
      setRoomsShowOrNot("hidden")

      const myarr = getListOfItemsForEachRoom(currentRoom, groupObj)
      setListForRoom(myarr)
    }
  },[currentRoom])
  
  
  
  return <div class="w-screen h-screen ">

    <Nav currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>

    <div class={`${roomsShowOrNot}`}>
      <Rooms1 list={listForRooms1} setCurrentRoom={setCurrentRoom}/>
      <hr/>
      <Rooms2 setCurrentRoom={setCurrentRoom} groupObj={groupObj} />
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
  
  twoN : {
    count : 100,
    subgroups : [
      { num : 1 , items : [ word objs]  },
      { num : 2 , items : []  }, 
      ...
    ],
    starts : [
      { letter : " " , items : [ ] },
      ...
    ],
    ends : [ ]
  }
}

*/