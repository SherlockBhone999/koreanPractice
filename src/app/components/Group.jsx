
import OneN from './groups/1N'
import OneV from "./groups/1V"
import TwoN from './groups/2N'
import TwoV from './groups/2V'
import ThreeN from './groups/3N'
import Eng from './groups/Eng'
import Derived from './groups/Derived'
import GrammarAndExtra from './groups/Grammar&Extra'
import Similar from './groups/Similar'
import TheRest from './groups/TheRest'
import Sentence from './groups/Sentence'


import { useLocation } from 'react-router-dom'
import { useState, useEffect} from 'react'

const Chosen = ({chosen}) => {
  return <div>
    {chosen === "1N"? <OneN /> : null}
    {chosen === "1V"? <OneV /> : null}
    {chosen === "2N"? <TwoN /> : null}
    {chosen === "2V"? <TwoV /> : null}
    {chosen ==="3N"? <ThreeN />: null}
    {chosen === "Eng"? <Eng /> : null}
    {chosen === "Sentences"? <Sentence /> : null}
    {chosen === "Grammar&Extra"? <GrammarAndExtra /> : null}
    {chosen === "Similar"? <Similar /> : null}
    {chosen === "Derived"? <Derived /> : null}
    {chosen === "TheRest"? <TheRest /> : null}
  </div>
}

export default function Group (){
  const location = useLocation()
  const [ chosenGroup,setChosenGroup ] = useState('')
  
  useEffect(()=>{
    const chosen = location.pathname.slice(8)
    setChosenGroup(chosen)
  },[])
  
  return <div>
  <Chosen chosen={chosenGroup} />
  
  </div>
}