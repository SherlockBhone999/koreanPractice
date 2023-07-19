import { getOptions } from '../../words/getOptionsForEachWord'
import OptionButtons from './Options'
import { useState , useEffect } from 'react'


const CurrentItem = ({ currentItem, setOptions, chosenTest }) => {

  const arr = getOptions( currentItem )
  
  useEffect(()=>{
    setOptions(arr)
  },[currentItem])
  
  //try
  const cIarr = [ currentItem ]
  
  return <div class=" flex justify-center m-4">
    <div class="bg-pink-500 rounded-lg shadow-lg w-96 h-60 flex justify-center items-center overflow-scroll p-2">
      <div>
      {chosenTest === "testKorea"? <p class="text-6xl flex justify-center">{currentItem.eng}</p>:
      <p class="text-6xl flex justify-center">{currentItem.korean}</p>}
      </div>
    </div>
  </div>
}



export default function Container ({chosen, list , setChosen }) {
  const [ currentIndex , setCurrentIndex ] = useState(0)
  const [ choices , setChoices ] = useState([])
  const [ options , setOptions ] = useState([])
  const currentItem = list[currentIndex]
  

  return <div class="bg-gray-100">
  <div class="flex justify-between">
    <p class="m-2 ">{currentIndex+1}/{list.length} </p>
    <button class="p-2 bg-blue-400 rounded-lg mr-4" onClick={()=>{
      if(chosen === "testKorea") { setChosen("testEng") }
      else { setChosen("testKorea") }
    }}
    >{chosen === "testKorea"? "Eng" : "Korean" }</button>
  </div>
  <hr/>
  
  {/* initially list is [], so render error, so be condinitional */}
  { list.length > 0 &&
    <CurrentItem currentItem={currentItem} 
    setOptions={setOptions}
    chosenTest={chosen}/>
  }
  
  
  <div class="m-2">
    <OptionButtons options={options} 
    currentItem={currentItem} 
    currentIndex={currentIndex}
    setCurrentIndex={setCurrentIndex} 
    list={list}
    chosenTest={chosen}/>
  </div>
  
  
  <div class="flex justify-end p-2">
    <button onClick={()=>{
      if(currentIndex !== list.length-1 ){ setCurrentIndex(prevv => prevv + 1) }
    }}> SKIP </button>
  </div>
  <hr/>
  

  
  
  </div>
}