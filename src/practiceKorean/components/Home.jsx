
import Dictionary from './Dictionary'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const KoreanPractice = () => {
  const navigate = useNavigate()
return <div class='m-2'>


<button onClick={()=>navigate('/l')}
class='border-blue-400 border-2 rounded m-2 p-4' > Test </button>

<Dictionary />
</div>
}
export default KoreanPractice