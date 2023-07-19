import Navbar from '../components/Navbar'
import Room from '../components/Room'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'


function Roompage() {
  return <div>
    <Navbar />
    <Room />
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
      <Roompage />
    </div>
  </div>
}