

import { words } from './words'
import { useState, useEffect, useRef } from 'react'
import FillerKeyboard from './FillerKeyboard'
import { arrayOfSingleLetters } from './FillerKeyboard'

///////////////////////////////////////////////////////////
const seeIfItemIsAlreadyInArray = (array, item) => {
  const stringArray = []
  array.map(obj => {
    stringArray.push(obj.korean)
  })
  if(stringArray.includes(item.korean)){
    return true
  }else{
    return false
  }
}

const getSameItemsFromTwoArrayForKorean = (array1, array2) =>{
  const newArray = []
  array1.map(obj => {
    array2.map(obj2 => {
      if(obj2.korean === obj.korean){
        newArray.push(obj2)
      }
    })
  })
  return newArray
}


const getWordsContainingAtLeastTwoLetterFromTargetWordForKorean = (targetWord, array) => {
  const bigArray = []
  for(let i=0; i< targetWord.length; i++){
    const n = targetWord[i]
    const narray = array.filter(obj => obj.korean.includes(n))
    console.log(narray)
    const nobject = {targetLetter : n, array : narray }
    bigArray.push(nobject)
  }
  const finalArray = []
  bigArray.map(obj =>{
    bigArray.map(obj2 => {
      if(obj2.targetLetter === obj.targetLetter) return
      else{
        const array = getSameItemsFromTwoArrayForKorean(obj.array, obj2.array)
        array.forEach(obj3 => {
          const alreadyExist = seeIfItemIsAlreadyInArray(finalArray,obj3)
          if(!alreadyExist){ finalArray.push(obj3) }
        })
      }
    })
  })
  const arrayOfItemsThatIncludeTwoLetterOfTargetWord = finalArray
  console.log('words containing at least two from '+ targetWord )
  return arrayOfItemsThatIncludeTwoLetterOfTargetWord
}


const arrangeArrayItemsFromShortToLongForKorean = (array, targetWord) => {
  const newArray = []
  array.map(obj => {
    if(obj.korean.length === 1){ newArray.push(obj) }
  })
  array.map(obj => {
    if(obj.korean.length === 2 && obj.korean.startsWith(targetWord[0])){ 
      newArray.push(obj)
    }
  })
  
  array.map(obj => {
    const alreadyExist = seeIfItemIsAlreadyInArray(newArray, obj)
    if(obj.korean.length === 2 && !alreadyExist ){
      newArray.push(obj)
    }
  })
  array.map(obj => {
    if(obj.korean.length === 3){ newArray.push(obj) }
  })
  array.map(obj => {
    if(obj.korean.length === 4){ newArray.push(obj) }
  })
  array.map(obj => {
    if(obj.korean.length === 5){ newArray.push(obj) }
  })
  array.map(obj => {
    if(obj.korean.length === 6){ newArray.push(obj) }
  })
  array.map(obj => {
    if(obj.korean.length > 6){ newArray.push(obj) }
  })
  return newArray
}
  
const getSimilarWordsForKorean = (targetWord, array) => {
  if(targetWord.length === 1){
    const array1 = array.filter(obj => obj.korean.includes(targetWord))
    const array2 = arrangeArrayItemsFromShortToLongForKorean(array1, targetWord)
    const array3 = array2.filter(obj => obj.korean !== targetWord )
    return array3
  }else{
   const array1 = getWordsContainingAtLeastTwoLetterFromTargetWordForKorean(targetWord,array) 
  const array2 = arrangeArrayItemsFromShortToLongForKorean(array1, targetWord)
  const array3 = array2.filter(obj => obj.korean !== targetWord )
    return array3
  }
}
//all this just to find similar words for korean
///////////////////////////!/!/!////////////////////////////////

const doRandomSingleInput = (setLeftSingleList, setSearchTerm, leftSingleList, setCurrentItem ) => {
  const randomN = Math.floor( Math.random()*leftSingleList.length )
  const arr = [...leftSingleList]
  arr.splice(randomN, 1)
  setLeftSingleList(arr)
  setSearchTerm(leftSingleList[randomN])
  setCurrentItem({ eng : '', korean : ''})
}

const OneSimilarWord = ({obj}) => {
  const [showEng , setShowEng ] = useState(false)
  return <div>
  {showEng?
  <button onClick={()=>setShowEng(false)} >{obj.eng}</button>
  :
  <button onClick={()=>setShowEng(true)} >{obj.korean}</button>
  }
  </div>
}



const Dictionary = () => {
    const [list, setList ] = useState(words)
    const [currentItem, setCurrentItem ] = useState({eng : '', korean : ''})
    const [ searchEng, setSearchEng ] = useState(false)
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ hideKeyboard, setHideKeyboard ] = useState('hidden')
    const [ leftSingleList , setLeftSingleList ] = useState(arrayOfSingleLetters)
    const [ similarWords , setSimilarWords ] = useState([])
  
    
    
    const handleChange = (e) =>{
      setSearchTerm(e.target.value)
    }
    
    useEffect(()=>{
    
        if(searchEng){
          const a = searchTerm
          const array = words.filter(item => item.eng.includes(a))
          setList(array)
        }else{
          const a = searchTerm
          const array = getSimilarWordsForKorean(searchTerm, words)
          setList(array)
        }
      
    },[searchTerm])
    
    useEffect(()=>{
      const arr = getSimilarWordsForKorean( currentItem.korean , words )
      setSimilarWords(arr)
    },[currentItem])
    
    
    
    return  <div class='h-screen'>
    <p class='m-2'> all words : {words.length } </p>
    
    <div class='flex justify-between'>
        <button onClick={()=>{
          if(hideKeyboard === ''){ setHideKeyboard('hidden') }
          else{ setHideKeyboard('') }
        }} class='m-2 p-3 bg-blue-400 rounded'> Letters </button>
        
        <div class='flex'>
          <p class='m-2 p-3'>{leftSingleList.length} left </p>
          <button class='bg-blue-400 rounded m-2 p-3' 
          onClick={()=>doRandomSingleInput(setLeftSingleList, setSearchTerm, leftSingleList, setCurrentItem )}>random</button>
        </div>
    </div>
    
    <div class='flex w-full' >
        <div class='p-4 m-2 bg-gray-600 rounded text-white text-2xl flex-auto'>
          <p>{currentItem.korean}</p>
          <p>{currentItem.eng}</p>
        </div>
        
        <div class='w-auto'>
          <p class='m-2'>similar words</p>
          <div class='p-4 m-2 bg-gray-300 rounded '>
            {
              similarWords.map(obj => <div>
                <OneSimilarWord obj={obj} />
              </div>)
            }
          </div>
        </div>
    </div>
    
    <div class='bg-gray-600 p-4 m-2 relative h-4/6 overflow-scroll border-4 border-black '>
      
      <input type='text' class='p-2 rounded mb-2' placeholder='...search' value={searchTerm}
        onChange={handleChange} />
      
      <div class='absolute top-10 right-0 bg-white text-blue-600 rounded border-4 border-black ' >
        <button onClick={()=>setSearchEng(!searchEng)} class='p-4'>
          {searchEng? 'search in Korean' : 'search in English'}
        </button>
      </div>
    
  
      
        <div class='bg-gray-200 rounded '>
          <div class='flex' >
            <p class='bg-gray-600 p-2 text-white '> {list.length} items found </p>
          </div>
      
          <div class='grid grid-cols-4 p-2 rounded'>
            {list.map(item => <button onClick={()=>setCurrentItem(item)}>
                {item.korean}
              </button>)}
          </div>  
        </div>
    </div>
    
    
      <FillerKeyboard setInput={setSearchTerm} keyboardState={hideKeyboard} />
    
    </div>
  }
  
export default Dictionary


