import { useState , useEffect } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'
import { words } from '../words'
import { getSimilarWordsForKorean } from './findSimilarWords'


const OneWord = ({obj}) => {
  return <div>
  {obj.korean}
  </div>
}

const AllWords = ({roomNum}) => {
  const f = ( roomNum - 1 ) * 50
  const l = ( roomNum * 50 ) 
  const arr = []
  for(let i= f; i < l ; i++){
    arr.push(words[i])
  }
  return <div>
  <div class='bg-gray-200 m-4 p-3 border-2 border-black rounded grid grid-cols-5 gap-4'>
    {arr.map(obj => <div>
      <p>{obj.korean}</p>
      <p>{obj.eng}</p>
    </div>)}
  </div>
  </div>
}


const MultipleChoices = () => {
  return <div>
  MultipleChoices
  </div>
}

const getRandomItemFromArrayAndSubstractIt = (array) => {
  const n = Math.floor( Math.random() * array.length )
  const arr = array.filter(obj => obj.korean !== array[n])
  return { item : array[n] , array : arr }
}

const getChoices = (targetObj , setChoices ) => {
  const targetWord = targetObj.korean
  const similarWords = getSimilarWordsForKorean(targetWord , words )
  const choicesArr = []
  if(similarWords.length >3 ){
    const obj = getRandomItemFromArrayAndSubstractIt(similarWords)
    choicesArr.push(obj.item)
    const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
    choicesArr.push(obj2.item)
    const obj3 = getRandomItemFromArrayAndSubstractIt(obj2.array)
    choicesArr.push(obj3.item)
  }else{
    if(similarWords.length === 0){
      const obj = getRandomItemFromArrayAndSubstractIt(words)
      choicesArr.push(obj.item)
      const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
      choicesArr.push(obj2.item)
      const obj3 = getRandomItemFromArrayAndSubstractIt(obj2.array)
      choicesArr.push(obj3.item)
    }else if(similarWords.length === 1){
      choicesArr.push(similarWords[0])
      const obj = getRandomItemFromArrayAndSubstractIt(words)
      choicesArr.push(obj.item)
      const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
      choicesArr.push(obj2.item)
    }else if(similarWords.length === 2){
      choicesArr.push(similarWords[0])
      choicesArr.push(similarWords[1])
      //theres a chance that two choices can be the same but its luck
      const obj = getRandomItemFromArrayAndSubstractIt(words)
      choicesArr.push(obj.item)
    }else if(similarWords.length === 3){
      choicesArr.push(similarWords[0])
      choicesArr.push(similarWords[1])
      choicesArr.push(similarWords[2])
    }
  }
//need to re-arrange
choicesArr.push(targetObj)


setChoices(choicesArr)
}


const getRandomItem = (setCurrentItem, list, setList, setChoices ) => {
  const n = Math.floor( list.length * Math.random() )
  setCurrentItem(list[n])
  //substract that item
  const arr = list.filter(obj => obj.korean !== list[n].korean )
  setList(arr)
  
  getChoices(list[n], setChoices )
}

export default function MultipleChoiceRoom () {
  const location = useLocation()
  const roomNum = location.pathname.slice(2,4)
  
  const navigate = useNavigate()
  const [ list, setList ] = useState([])
  const [ showAllWords , setShowAllWords ] = useState('hidden')
  const [ currentItem ,setCurrentItem ] = useState(null)
  const [ choices, setChoices ] = useState([])
  
  
  useEffect(()=>{
    const f = ( roomNum - 1 ) * 50
    const l = ( roomNum * 50 ) 
    const arr = []
    for(let i= f; i < l ; i++){
      arr.push(words[i])
    }
    setList(arr)
  },[])
  
  return <div>
  
    <div>
      <button onClick={()=>navigate(-1)} class='bg-gray-400 m-2 p-3 rounded'>Back </button>
    </div>
    <p> Level : {roomNum} </p>
    
    <div>
    { showAllWords === ''?
      <button onClick={()=>setShowAllWords('hidden') } class='bg-blue-400 m-2 p-3 rounded'> Hide</button>
    :
      <button onClick={()=>setShowAllWords('') } class='bg-blue-400 m-2 p-3 rounded'>Show </button>
    }
    </div>
    
    <div class={`${showAllWords}`}>
      <AllWords roomNum={roomNum} />
    </div>
    
    <div>
      <button onClick={()=>getRandomItem(setCurrentItem, list, setList , setChoices )} 
      class='bg-gray-400 m-2 p-3 rounded'>Start </button>
    </div>
    
    <div>currentItem : {JSON.stringify(currentItem)}</div>
    
    <div>choices : {JSON.stringify(choices)}</div>
    <MultipleChoices />
    
  </div>
}