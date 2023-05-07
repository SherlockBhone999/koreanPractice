
import { useState , useEffect } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'
import { words } from '../words'
import { getChoices } from './ChoicesKorean'
import ChoicesKorean from './ChoicesKorean'
import ChoicesEng from './ChoicesEng'


const OneWord = ({obj}) => {
  return <div>
  {obj.korean}
  </div>
}

const AllWords = ({roomNum}) => {
  const f = ( roomNum - 1 ) * 50
  const l = ( words.length-1 ) 
  const arr = []
  for(let i= f; i < l ; i++){
    arr.push(words[i])
  }
  return <div>
  <div class='bg-gray-200 m-4 p-3 border-2 border-black rounded grid grid-cols-5 gap-4'>
    {arr.map(obj => <div>
      <p class='flex justify-center text-xl'>{obj.korean}</p>
      <p class='flex justify-center'>{obj.eng}</p>
    </div>)}
  </div>
  </div>
}



const getRandomItem = (setCurrentItem, list, setList, setChoices ) => {
  const n = Math.floor( list.length * Math.random() )
  setCurrentItem(list[n])
  //substract that item
  const arr = list.filter(obj => obj.korean !== list[n].korean )
  setList(arr)
  
  getChoices(list[n], setChoices )
}




export default function MultipleChoiceForLastRoom () {
  const location = useLocation()
  const roomNum = location.pathname.slice(2,4)
  
  const navigate = useNavigate()
  const [ list, setList ] = useState([])
  const [ currentItem ,setCurrentItem ] = useState(null)
  const [ choices, setChoices ] = useState([])
  const [ chosen, setChosen ] = useState('')
  
  
  useEffect(()=>{
    const f = ( roomNum - 1 ) * 50
    const l = ( words.length-1 ) 
    const arr = []
    for(let i= f; i < l ; i++){
      arr.push(words[i])
    }
    setList(arr)
  },[])
  
  return <div>

    <div class='p-3 bg-blue-200 flex items-center'>
      <button onClick={()=>navigate(-1)} class='bg-gray-400 m-2 p-3 rounded'>Back </button>
      <p class='m-2'> Room : {roomNum} </p>
    </div>
   
    
    <div class='flex'>
      { chosen !== 'test_korean' && currentItem === null ?
        <button onClick={()=>{
          getRandomItem(setCurrentItem, list, setList , setChoices )
          setChosen('test_korean')
        }} 
        class='bg-gray-400 m-2 p-3 rounded'>Test Korean</button>
      : null }
      
      
      { chosen !== 'test_eng' && currentItem === null ?
        <button onClick={()=>{
          getRandomItem(setCurrentItem, list, setList , setChoices )
          setChosen('test_eng')
        }} 
        class='bg-gray-400 m-2 p-3 rounded'>Test Eng</button>
      : null }
      
      
      { currentItem === null ?
        <button onClick={()=>{
          if(chosen !== 'all_words'){ setChosen('all_words') }
          else setChosen('')
        }} 
        class='bg-gray-400 m-2 p-3 rounded'>All Words</button>
      : null }
      
    </div>
    
    { chosen === 'all_words'? <AllWords roomNum={roomNum} /> : null }
    { chosen === 'test_korean' ? <div>
      <ChoicesKorean choices={choices}
      currentItem={currentItem}
      list={list}
      setList={setList}
      setCurrentItem={setCurrentItem}
      setChoices={setChoices} />
    </div> : null }
    { chosen === 'test_eng' ? <div>
      <ChoicesEng choices={choices}
      currentItem={currentItem}
      list={list}
      setList={setList}
      setCurrentItem={setCurrentItem}
      setChoices={setChoices} />
    </div> : null }

    
  </div>
}

