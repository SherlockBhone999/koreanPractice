import Rooms from '../components/Rooms'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'

const TestRoomspage =() => {
  return <div>
    <Navbar />
    <Rooms />
  </div>
}


export default function Container () {
  const [ componentState , setComponentState ] = useState('hidden')
  const [ loadingState , setLoadingState ] = useState('')
  
  useEffect(()=>{
    setTimeout(()=>{
      setComponentState('')
      setLoadingState('hidden')
    }, 200)
  },[])
  
  return <div>

  
    <div class={loadingState}>
      <Loading />
    </div>
    
    <div class={componentState}>
      <TestRoomspage />
    </div>
  </div>
}