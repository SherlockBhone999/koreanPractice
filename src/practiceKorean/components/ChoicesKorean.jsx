import { getSimilarWordsForKorean } from './findSimilarWords'
import { words } from '../words'
import { useState } from 'react'



const getRandomItemFromArrayAndSubstractIt = (array) => {
  const n = Math.floor( Math.random() * array.length )
  const arr = array.filter(obj => obj.korean !== array[n].korean )
  return { item : array[n] , array : arr }
}

export const getChoices = (targetObj , setChoices ) => {
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
const rearangedArr = []
const obj = getRandomItemFromArrayAndSubstractIt(choicesArr)
rearangedArr.push(obj.item)
const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
rearangedArr.push(obj2.item)
const obj3 = getRandomItemFromArrayAndSubstractIt(obj2.array)
rearangedArr.push(obj3.item)
rearangedArr.push(obj3.array[0])
setChoices(rearangedArr)
}

const getRandomItem = (setCurrentItem, list, setList, setChoices ) => {
  const n = Math.floor( list.length * Math.random() )
  setCurrentItem(list[n])
  //substract that item
  const arr = list.filter(obj => obj.korean !== list[n].korean )
  setList(arr)
  
  getChoices(list[n], setChoices )
}


export default function Choices ({choices, currentItem , list, setList, setCurrentItem, setChoices }){
  const [ isDone, setIsDone ] = useState(false)
  return <div class=''>
  <div class=''>{list.length} Left </div>
  
  { currentItem ?
    <div class='flex justify-center items-center'>
      <div class='bg-blue-400 w-40 h-24 m-2 p-2 w-40 flex justify-center items-center rounded'>
        <p>{currentItem.korean} </p>
      </div>
    </div>
  : null }
  
  { isDone === false?
      <div class='flex justify-center'>
        <div class=' grid grid-cols-2 gap-3'>
          {
            choices.map(obj => <div>
              <button class='bg-pink-500 w-60 h-36 rounded' onClick={()=>{
                if(currentItem.korean === obj.korean ) {
                  if(list.length > 0){
                    getRandomItem(setCurrentItem, list, setList , setChoices )
                  }else{
                    setIsDone(true)
                    setCurrentItem(null)
                  }
                }
              }}>{obj.eng}</button>
            </div>)
          }
        </div>
      </div>
  :
      <div class='flex justify-center items-center'>
        <div class='bg-blue-500 w-80 h-48 rounded flex justify-center items-center'>
          Congratulation!
        </div>
      </div>
  }
  
  </div>
}