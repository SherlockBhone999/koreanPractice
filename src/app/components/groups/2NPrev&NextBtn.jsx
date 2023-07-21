import { useState, useEffect } from 'react'

const getArrayOfRoomNo = (groupObj) => {
  const arr = []
  groupObj.subgroups.forEach(obj => {
    arr.push(obj.num)
  })
  //some has no starts
  groupObj.starts && groupObj.starts.forEach(obj => {
    arr.push(obj.letter+"-")
  })
  groupObj.ends && groupObj.ends.forEach(obj => {
    arr.push("-"+obj.letter)
  })
  return arr
}

const handlePrev = (index, setCurrentRoom, arrOfNumAndLetters ) => {
  if(index !== 0 ){
    const n = arrOfNumAndLetters[index-1]
    setCurrentRoom(n)
  }
}

const handleNext = (index, setCurrentRoom, arrOfNumAndLetters ) => {
  if(index !== arrOfNumAndLetters.length-1 ){
    const n = arrOfNumAndLetters[index+1]
    setCurrentRoom(n)
  }
}


const NextPrevBtn = ({ groupObj, setCurrentRoom, currentRoom}) => {
  //[ 'ga', 'la', ...]
  const arrOfNumAndLetters = getArrayOfRoomNo(groupObj)
  const index = arrOfNumAndLetters.indexOf(currentRoom)
  
  
  
  
  return <div>
    <div class="flex justify-end text-[0.75rem]">
      <p class="mr-4 flex items-center "> {index+1}/{arrOfNumAndLetters.length}</p>
      <button onClick={()=>handlePrev(index, setCurrentRoom, arrOfNumAndLetters )} class="p-2 bg-blue-400 mr-0.5"> Prev </button>
      <button onClick={()=>handleNext(index, setCurrentRoom, arrOfNumAndLetters )} class="p-2 bg-blue-400"> Next </button>
      
    </div>
  </div>
}

export default NextPrevBtn