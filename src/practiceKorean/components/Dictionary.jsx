

import { words } from '../words'
import { useState, useEffect, useRef } from 'react'
import LettersKeyboard from './LettersKeyBoard'
import { arrayOfSingleLetters } from './LettersKeyBoard'
import { getSimilarWordsForKorean } from './findSimilarWords'


const doRandomSingleInput = (setLeftSingleList, setSearchTerm, leftSingleList, setCurrentItem ) => {
  const randomN = Math.floor( Math.random()*leftSingleList.length )
  const arr = [...leftSingleList]
  arr.splice(randomN, 1)
  setLeftSingleList(arr)
  setSearchTerm(leftSingleList[randomN])
  setCurrentItem({ eng : '', korean : ''})
}





const SimilarWords = ({similarWordsDivided}) => {
  return <div>
    <div class=''>
      <p class='m-2'>similar words</p>
      <div class='grid grid-cols-2'>
        <div class='p-4 m-2 bg-gray-300 rounded flex'>
            <div>
              {
                similarWordsDivided.first.map(obj => <div>
                <button onClick={()=>setCurrentItem(obj)} 
                class='w-[100px] h-[30px] overflow-scroll mt-1'>{obj.korean}</button>
                </div>)
                  
              }
            </div>
            <div class='ml-5 '>
              {
                similarWordsDivided.first.map(obj => <div class=' w-[150px] overflow-scroll h-[30px] mt-1'>
                <div class=''>{obj.eng}</div>
                </div>)
              }
            </div>
        </div>
        <div class='p-4 m-2 bg-gray-300 rounded flex'>
            <div>
              {
                similarWordsDivided.second.map(obj => <div 
                class='w-[100px] h-[30px] overflow-scroll mt-1'>
                <button onClick={()=>setCurrentItem(obj)}>{obj.korean}</button>
                </div>)
              }
            </div>
            <div class='ml-5 '>
              {
                similarWordsDivided.second.map(obj => <div class='w-[150px] overflow-scroll h-[30px] mt-1'>
                <div class=''>{obj.eng}</div>
                </div>)
              }
            </div>
        </div>
      </div>
    </div>
  </div>
}


const Dictionary = () => {
    const [list, setList ] = useState([])
    const [currentItem, setCurrentItem ] = useState({eng : '', korean : ''})
    const [ searchEng, setSearchEng ] = useState(false)
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ hideKeyboard, setHideKeyboard ] = useState('hidden')
    const [ leftSingleList , setLeftSingleList ] = useState(arrayOfSingleLetters)
    const [ similarWords , setSimilarWords ] = useState([])
    const [ similarWordsDivided , setSimilarWordsDivided ] = useState({first : [], second : []})
  
    
    
    const handleChange = (e) =>{
      setSearchTerm(e.target.value)
    }
    
    useEffect(()=>{
    
        if(searchEng){
          const a = searchTerm
          if(a ===''){ 
            // to speed up render
            setList([]) 
          }else{
            const array = words.filter(item => item.eng.includes(a))
            setList(array)
          }
        }else{
          const a = searchTerm
          if(a === ''){
            setList([]) 
          }else{
            const array = words.filter(item => item.korean.includes(a))
            setList(array)
          }
        }
        
        
      
    },[searchTerm])
    
    useEffect(()=>{
      const arr = getSimilarWordsForKorean( currentItem.korean , words )
      setSimilarWords(arr)
    },[currentItem])
    
    useEffect(()=>{
      const arr1 = []
      const arr2 = []
      if(similarWords.length % 2 === 0){
        const a = similarWords.length /2
        for(let i=0; i<a ; i++){
          arr1.push(similarWords[i])
        }
        for(let i=a; i<2*a ; i++){
          arr2.push(similarWords[i])
        }
      }else{
        const a = Math.floor( similarWords.length/2) + 1
        for(let i=0; i<a ; i++){
          arr1.push(similarWords[i])
        }
        for(let i=a ; i< similarWords.length ; i++){
          arr2.push(similarWords[i])
        }
      }
      const obj = { first : arr1 , second : arr2 }
      setSimilarWordsDivided(obj)
    },[similarWords])
    
    
    
    return  <div class='h-screen'>
    
    <div class='flex '>
        <button onClick={()=>{
          if(hideKeyboard === ''){ setHideKeyboard('hidden') }
          else{ setHideKeyboard('') }
        }} class='m-2 p-3 bg-blue-400 rounded'> Letters </button>
        
        <button class='bg-blue-400 rounded m-2 p-3' 
        onClick={()=>doRandomSingleInput(setLeftSingleList, setSearchTerm, leftSingleList, setCurrentItem )}>random</button>
        
        <p class='m-2 p-3'>{leftSingleList.length} left </p>
       
    </div>
    
    <p class='m-2'>Total : {words.length}</p>
    
    { currentItem.korean !== ''?
      <div class='w-full' >
          <div class='p-4 m-2 bg-gray-600 rounded flex-auto'>
            <p class='text-white text-2xl '>{currentItem.korean}</p>
            <p class='text-white text-2xl '>{currentItem.eng}</p>
            { similarWordsDivided.first.length > 0 ?
              <SimilarWords similarWordsDivided={similarWordsDivided} />
            : null }
          </div>
      </div>
    : null }
    
    
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
                <p class='text-lg '>{item.korean}</p>
                <p class='text-xs mb-4'>{item.eng}</p>
              </button>)}
          </div>  
        </div>
    </div>
    
    
      <LettersKeyboard setInput={setSearchTerm} keyboardState={hideKeyboard} />
    
    </div>
  }
  
export default Dictionary


