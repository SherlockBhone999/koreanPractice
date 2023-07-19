
const exceptionArray = [ '바다',"자신보다" ]



////////////////////////
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
    //cause there is extra blank
    if(n !== " "){
      const narray = array.filter(obj => obj.korean.includes(n))
      const nobject = {targetLetter : n, array : narray }
      bigArray.push(nobject)
    }
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



export const getSimilarWordsForKorean = (targetWord, array) => {
  //cause there is extra space behind korean words
  if(targetWord.length === 2){
    const array1 = array.filter(obj => obj.korean.includes(targetWord))
    const array2 = arrangeArrayItemsFromShortToLongForKorean(array1, targetWord)
    const array3 = array2.filter(obj => obj.korean !== targetWord )
    return array3
  }else if(targetWord.length === 3 ){
    const array1 = array.filter(obj => obj.korean.startsWith(targetWord[0]))
    const array2 = array.filter(obj => {
      if(targetWord[1] !== '다'){
        return obj.korean[1] === targetWord[1]
      }
      })
    const array3 = array1.concat(array2)
    const array4 = array3.filter(obj => obj.korean !== targetWord)
    const array5 = arrangeArrayItemsFromShortToLongForKorean(array4, targetWord)
    return array5
  }else if(targetWord.length > 3 && targetWord.endsWith('하다 ')){
    const tw = targetWord.substring(0, targetWord.indexOf('하'))
    const array1 = array.filter(obj => obj.korean.startsWith(tw[0]))
    const array2 = array.filter(obj =>  obj.korean[1] === tw[1] )
    const array3 = array1.concat(array2)
    const array4 = array3.filter(obj => obj.korean !== targetWord)
    const array5 = arrangeArrayItemsFromShortToLongForKorean(array4, targetWord)
    return array5
  
  }else{
   const array1 = getWordsContainingAtLeastTwoLetterFromTargetWordForKorean(targetWord,array) 
  const array2 = arrangeArrayItemsFromShortToLongForKorean(array1, targetWord)
  const array3 = array2.filter(obj => obj.korean !== targetWord )
    return array3
  }
}
