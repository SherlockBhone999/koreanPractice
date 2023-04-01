

import { useState, useEffect, useRef } from 'react'
import TestKorean from './TestKorean'
import TestEnglish from './TestEng'
import Dictionary from './Dictionary'


const KoreanPractice = () => {
  
  const [ chosenInterface, setChosenInterface ] = useState('dictionary')
  
  
  const Chosen = ({keyboardState}) =>{
    if(chosenInterface === 'testeng'){
      return <TestEnglish />
    }else if(chosenInterface === 'testkorean'){
      return <TestKorean  />
    }else if(chosenInterface === 'dictionary'){
      return <Dictionary  />
    }
  }

return <div class='p-4 m-2 rounded '>

<div class='grid grid-flow-col gap-2 p-2 '>
{ chosenInterface !=='testeng'? <button onClick={()=>setChosenInterface('testeng')} 
class='border-blue-400 border-2 rounded' > Test English </button> : null}

{ chosenInterface !== 'testkorean'? <button onClick={()=>setChosenInterface('testkorean')}
class='border-blue-400 border-2 rounded' > Test Korean</button> : null}

<button onClick={()=>setChosenInterface('dictionary')} class='border-blue-400 border-2 rounded' > Dictionary </button>


</div>
<Chosen />
</div>
}
export default KoreanPractice