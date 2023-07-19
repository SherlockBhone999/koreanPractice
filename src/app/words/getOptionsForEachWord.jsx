import { getSimilarWordsForKorean } from './findSimilarWords'

import { useContext} from 'react'
import { Context } from '../../App'


const getRandomItemFromArrayAndSubstractIt = (array) => {
  const n = Math.floor( Math.random() * array.length )
  const arr = array.filter(obj => obj.korean !== array[n].korean )
  return { item : array[n] , array : arr }
}


export const getOptions = ( currentItem ) => {
  const { allWords } = useContext(Context)
  const similarWords = getSimilarWordsForKorean( currentItem.korean , allWords )
  
  //get 3 choices 
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
      const obj = getRandomItemFromArrayAndSubstractIt(allWords)
      choicesArr.push(obj.item)
      const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
      choicesArr.push(obj2.item)
      const obj3 = getRandomItemFromArrayAndSubstractIt(obj2.array)
      choicesArr.push(obj3.item)
    }else if(similarWords.length === 1){
      choicesArr.push(similarWords[0])
      const obj = getRandomItemFromArrayAndSubstractIt(allWords)
      choicesArr.push(obj.item)
      const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
      choicesArr.push(obj2.item)
    }else if(similarWords.length === 2){
      choicesArr.push(similarWords[0])
      choicesArr.push(similarWords[1])
      //theres a chance that two choices can be the same but its luck
      const obj = getRandomItemFromArrayAndSubstractIt(allWords)
      choicesArr.push(obj.item)
    }else if(similarWords.length === 3){
      choicesArr.push(similarWords[0])
      choicesArr.push(similarWords[1])
      choicesArr.push(similarWords[2])
    }
  }
  
  //get 4 
  choicesArr.push(currentItem)
  //now need to shuffle , because currentItem is always at 4 
  const rearangedArr = []
  const obj = getRandomItemFromArrayAndSubstractIt(choicesArr)
  rearangedArr.push(obj.item)
  const obj2 = getRandomItemFromArrayAndSubstractIt(obj.array)
  rearangedArr.push(obj2.item)
  const obj3 = getRandomItemFromArrayAndSubstractIt(obj2.array)
  rearangedArr.push(obj3.item)
  rearangedArr.push(obj3.array[0])

  
  return rearangedArr
}



//for MTCChoice 
const shuffleIndexs = (array) => {
  const arr = [...array]
  for(let i= array.length - 1; i>0; i--){
    //ceil not work
    const n = Math.floor(Math.random()*array.length)
    const temp = arr[i]
    arr[i] = arr[n]
    arr[n] = temp
 }
 return arr
}

export const shuffleArray = (array) => {
  const indexs = []
  for(let i=0; i < array.length ; i++){
    indexs.push(i)
  }
  
  const shuffledIndexs = shuffleIndexs(indexs)
  const shuffledArr = []
  shuffledIndexs.map(num => {
    shuffledArr.push(array[num])
  })
  return shuffledArr
}