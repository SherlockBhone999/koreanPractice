import Words from './multipleChoice/WordsInRoom'
import MTChoiceContainer from './multipleChoice/MTChoiceContainer'
import { shuffleArray } from '../words/getOptionsForEachWord'

import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../App'

const ChoiceButtons = ({setChosen, chosen }) => {
  return <div>
  <div class = "bg-blue-200 w-36" >
    { chosen !== "words"?
    <button onClick={()=>setChosen("words")} class="p-4"> WORDS</button> :
    <button onClick={()=>setChosen("testKorea")} class="p-4">TEST </button>
    }
  </div>
  </div>
}

const Chosen = ({chosen, list , setChosen }) => {
  if( chosen === "words"){
    return <Words list={list} />
  }else {
    return <MTChoiceContainer chosen={chosen} list={list} setChosen={setChosen}/>
  }
}


export default function Room () {
  const { allItems } = useContext(Context)
  const location = useLocation()
  const roomNumber = location.pathname.slice(7)
  const [ list, setList ] = useState([])
  //for interface and MTC one of two 
  const [ chosen , setChosen ] = useState("testKorea")

  
  useEffect(()=>{
    //get the words in the corresponding range, 0-50 for 1, 50-100 for 2
    //can be refreshed
    const f = ( roomNumber - 1 ) * 50
    const l =  roomNumber * 50 
    const arr = []
    for(let i=f; i<l; i++){
      if(allItems[i]) arr.push(allItems[i])
    }
    const arrr = shuffleArray(arr)
    setList(arrr)
  },[])
  
  return <div class="h-[80vh] overflow-hidden">
   <ChoiceButtons setChosen={setChosen} chosen={chosen}/>
   <Chosen chosen={chosen} list={list} setChosen={setChosen}/>
   
   
   
  </div>
}