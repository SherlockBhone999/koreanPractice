import {useState, useEffect} from 'react'
import { words } from '../words'


const getArrayOfSingleLetters = () => {
  const arr = []
  words.map( obj => {
    const str = obj.korean
    for(let i=0; i< str.length ; i++){
      if(!arr.includes(str[i])){ arr.push(str[i]) }
    }
  })
  return arr
}

export const arrayOfSingleLetters = getArrayOfSingleLetters()

// slpit above array into two

const arrForSingleLetterWithMeaning = []
arrayOfSingleLetters.map(str => {
  words.map(obj => {
    if(obj.korean === str || obj.korean === ( str + '다') ){
      if(!arrForSingleLetterWithMeaning.includes(str)){
        arrForSingleLetterWithMeaning.push(str)
      }
    }
  })
})
   
const arrForTheRest = arrayOfSingleLetters.filter(str => !arrForSingleLetterWithMeaning.includes(str))


const OneItem = ({setInput,value,styledItem,setStyledItem}) => {
  const [style, setStyle] = useState('')
  
  useEffect(()=>{
    if(styledItem === value){
      setStyle('bg-blue-600 rounded text-white')
    }else{
      setStyle('')
    }
  },[styledItem])
  
  return <div>
    <button onClick={()=>{
      setInput(value)
      setStyledItem(value)
    }} class={`pr-2 ${style}`}>{value}</button>
  </div>
}

export default function LettersKeyBoard({setInput, keyboardState }){
  const [styledItem,setStyledItem] = useState('')
  return (
  <div class={`grid fixed top-0 right-0 h-60 w-60 overflow-scroll overflow-x-scroll bg-blue-200 border-4 border-black p-2 ${keyboardState}`}>
    <div class='grid grid-cols-10'>
    {arrForSingleLetterWithMeaning.map(str => <div>
          <OneItem setInput={setInput} 
          value={str} 
          styledItem={styledItem}
          setStyledItem={setStyledItem}/>
    </div>)}
    </div>
    <hr/>
    <div class='grid grid-cols-10'>
    {arrForTheRest.map(str => <div>
          <OneItem setInput={setInput} 
          value={str} 
          styledItem={styledItem}
          setStyledItem={setStyledItem}/>
    </div>)}
    </div>
    
  </div>
    )
}

