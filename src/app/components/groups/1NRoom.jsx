
//very import for all groups and also for all rooms

import { getSimilarWordsForKorean } from '../../words/findSimilarWords'
import { getFragments } from '../../words/getFragments'

import { useState, useEffect, useContext} from 'react'
import { Context } from '../../../App'



const OneItem = ({item, setCurrentItem, currentItem }) => {
  const [ style , setStyle ] = useState(" ")
  
  useEffect(()=>{
    if(item.korean === currentItem.korean ){ setStyle("text-pink-400") }
    else setStyle("")
  },[currentItem])
  return <div>
      <button class={`w-full h-full ${style}`} onClick={()=>setCurrentItem(item)}>
        <p class="text-[0.75rem]"> {item.korean}</p>
        <p class="text-[5px]"> {item.eng}</p>
      </button>
  </div>
}

const Menu = ({list , setCurrentItem , currentItem }) => {
  
  return <div class="grid grid-cols-2 gap-2">
    {list.map(obj => <div class="flex justify-center w-full h-full overflow-scroll mb-2">
      <OneItem item={obj} setCurrentItem={setCurrentItem} currentItem={currentItem}/>
    </div>)}
  </div>
}


const Fragments = ({list}) => {
  return <div class="m-2 ">
    {
      list.map(obj => <div class="flex">
        <p class="text-[0.75rem] mb-1 mr-2"> {obj.korean} </p>
        <p class="text-[0.1rem] mb-1"> {obj.eng} </p>
      </div>)
    }
  </div>
}

const Result = ({currentItem, fragments }) => {
  return <div class="   ">
    <div class="m-4">
      <p class="text-[0.75rem]"> {currentItem.korean}</p>
      <p class="text-[0.1rem]"> {currentItem.eng}</p>
    </div>
    <Fragments list={fragments} />
  </div>
}

const Similar = ({list}) => {
  return <div class=" ">
    {
      list.map(obj => <div class="flex w-72">
        <p class="text-[0.75rem] mb-2 mr-2"> {obj.korean} </p>
        <p class="text-[0.1rem] mb-2"> {obj.eng} </p>
      </div>)
    }
  </div>
}


const Room = ({list}) => {
  const { allWords } = useContext(Context)
  const [ currentItem, setCurrentItem ] = useState({eng : "", korean : ""})
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
  
  useEffect(()=>{
    //cause currentItem is persisting even thought listforRoom changed
    setCurrentItem({eng : "", korean : ""})
  },[list])
  
  return <div>
    <div class=" h-[67vh] bg-gray-100 flex">
  
      <div class="w-56 h-full bg-stone-200 flex flex-col overflow-scroll">
        <div class="h-[30vh]  ">
          <Result currentItem={currentItem} fragments={fragments}/>
        </div>
       {/* <hr class="h-0.5 bg-gray-600"/> */}
        <div class="flex-auto p-2">
          <Similar list={similarWords}/>
        </div>
      </div>
    
      <div class="w-full h-full overflow-scroll">
        <Menu list={list} setCurrentItem={setCurrentItem} currentItem={currentItem}/>
      </div>
    </div>
  </div>
}

export default Room

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
    starts : [
    { letter :'다' , count : 3 },
    ...
    ],
    ends : [ ]
  }
}

*/