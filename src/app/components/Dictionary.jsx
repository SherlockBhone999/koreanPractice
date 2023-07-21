import SearchAndResult from './SearchAndResultForD'
import { getSimilarWordsForKorean } from '../words/findSimilarWords'
import { getFragments } from '../words/getFragments'

import { useState, useContext, useEffect } from 'react'
import { Context } from '../../App'

const Fragments = ({list}) => {
  return <div class=" ">
    {
      list.map(obj => <div class="flex">
        <p class="text-[0.75rem] mb-2 mr-2"> {obj.korean} </p>
        <p class="text-[0.1rem] mb-2"> {obj.eng} </p>
      </div>)
    }
  </div>
}

const Similar = ({list}) => {
  return <div class=" ">
    {
      list.map(obj => <div class="flex w-96 overflow-x-scroll mb-1">
        <p class="mb-2 mr-2 text-[0.75rem]"> {obj.korean} </p>
        <p class="text-[0.1rem] mb-2"> {obj.eng} </p>
      </div>)
    }
  </div>
}

const CurrentItemAndSimilars = ({currentItem, similarWords , fragments}) => {
  
  return <div class="m-2 p-4 bg-blue-50 grid grid-flow-col w-full">
    <div class="flex flex-col ">
      <div class="mb-3 w-48">
        <p class=" text-[0.75rem] w-full overflow-scroll">{currentItem.korean} </p>
        <p class=" text-[0.1rem] w-full overflow-scroll">{currentItem.eng} </p>
      </div>
      <Fragments list={fragments} />
    
    </div>
    <div class="h-[20vh] overflow-scroll">
      <Similar list={similarWords} />
    </div>
  </div>
}



export default function Dictionary () {
  const { allWords } = useContext(Context)
  const [ currentItem, setCurrentItem ] = useState({ eng : '', korean : ''})
  const [ similarWords , setSimilarWords ] = useState([{eng : "", korean : ""} ])
  const [ fragments, setFragments ] = useState([])
  
  useEffect(()=>{
    const arr = getSimilarWordsForKorean( currentItem.korean , allWords )
    const arrLimited = []
    for (let i=0; i<10; i++){
      if(arr[i]) arrLimited.push(arr[i])
    }
    setSimilarWords(arrLimited)
    
    const arrF = getFragments(currentItem)
    setFragments(arrF)
  },[currentItem])
  
  return <div class="flex-col">
  
  <CurrentItemAndSimilars currentItem={currentItem} 
  similarWords={similarWords}
  fragments={fragments}/>
  
  <div class="flex-auto">
    <SearchAndResult setCurrentItem={setCurrentItem} currentItem={currentItem}/>
  </div>
  
  </div>
}