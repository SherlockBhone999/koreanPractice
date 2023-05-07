import MultipleChoiceRoom from '../components/MultipleChoiceRoom'
import LastMultipleChoiceRoom from '../components/MultipleChoiceForLastRoom'
import { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { words } from '../words'

const Chosen = ({chosen}) => {
  return <div>
  { chosen === 'normal'? <MultipleChoiceRoom /> : null }
  { chosen === 'last'? <LastMultipleChoiceRoom /> : null }
  </div>
}
  

export default function MultipleChoiceRoompage (){
  const location  = useLocation()
  const [ chosen, setChosen ] = useState('normal')
  const lp = location.pathname.slice(2,4)
  const lastNum = Math.floor(words.length/50) + 1
  
  useEffect(()=>{
    if(lp === lastNum.toString()){
      setChosen('last')
    }else{
      setChosen('normal')
    }
  },[lp])
  
  return <div>
    <Chosen chosen={chosen} />
  </div>
}