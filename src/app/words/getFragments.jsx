import { items } from './allItems'

const oneNs = items.filter(obj => obj.korean.length === 1)
const oneVs = items.filter(item => item.korean.length === 2 && item.korean[1] === "다")

export const getFragments = (item) => {
  const array = []
  for(let i=0; i < item.korean.length ; i++){
    const letter = item.korean[i]
    oneNs.forEach(obj => {
      if(obj.korean === letter ){
        array.push(obj)
      }
    })
    oneVs.forEach(obj => {
      if(obj.korean[0] === letter ){
        array.push(obj)
      }
    })
  }
  
  //there could be same korean word
  const arrayWithoutCurrentItem = array.filter(obj => obj.eng !== item.eng )
  
  return arrayWithoutCurrentItem
}