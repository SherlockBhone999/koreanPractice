import { words } from './words'
import { useState, useEffect, useRef } from 'react'
import FillerKeyboard from './FillerKeyboard'


const TestEnglish = () => {
    const [list, setList ] = useState(words)
    const [answer  , setAnswer ] = useState('')
    const [currentItem, setCurrentItem] =useState(list[0])
    const [wrong, setWrong ] = useState(false)
    const buttonRef = useRef()
    const [peek, setPeek ] = useState(false)
    const [ hideKeyboard, setHideKeyboard ] = useState('hidden')
    
    const getRandomNumber = (length) => {
      if (length < 2 ){ return 0 }
      else { return parseInt(Math.random()*length) }
    }
    
    
    const getRandomItem = () => {
      const n = getRandomNumber(list.length)
      setCurrentItem(list[n])
      
      const array = list.filter(item => item !== list[n])
      setList(array)
    }
    
    const handleClick = ()=>{
     //check answer
     //if(currentItem.eng !== answer ){
     if(!currentItem.eng.includes(answer)){
       setWrong(true)
     }else{
       getRandomItem()
       setWrong(false)
       setAnswer('')
     }
    }
    
    useEffect(()=>{
      
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        buttonRef.current.click()
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    
    },[])
    
    
    return <div>
    
    <button onClick={()=>{
      if(hideKeyboard === ''){ setHideKeyboard('hidden') }
      else{ setHideKeyboard('') }
    }} class='m-2 p-1 bg-blue-400 rounded'> consonants </button>
    
    <div class='flex justify-between' >
    <div class='bg-black text-white p-4 m-2 rounded flex-auto'>
      {currentItem.korean }
    </div>
    <div class='p-4 m-2 rounded bg-gray-400'> {list.length} left </div>
    </div>
    
    {wrong? <div class='p-4 m-2 rounded flex-auto bg-red-600 text-white font-bold'> wrong, try again </div> : null }
    
    <div class='flex justify-between'>
    <div class='bg-gray-200 p-2 m-2 flex flex-auto'>
      <input type='text' onChange={(e)=>{setAnswer(e.target.value )}} value={answer} class='w-full'/>
    </div>
    
    <button onClick={handleClick} class='p-6 m-2 bg-blue-400 rounded' ref={buttonRef}>next</button>
    </div>
    
  {peek ? <div class='p-4 m-2 rounded flex-auto bg-gray-400 text-white font-bold'> 

<div>{currentItem.korean} </div>
<div> {currentItem.eng} </div>
</div>
  : null }
  
  <button onClick={()=>setPeek(!peek)} > peek </button>
  <FillerKeyboard setInput={setAnswer} keyboardState={hideKeyboard} />
  
    </div>
  }
  
  
export default TestEnglish