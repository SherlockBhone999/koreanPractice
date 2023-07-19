import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'


function Homepage(){
  return <div>
    <Navbar />
    <Home />
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
      <Homepage />
    </div>
  </div>
}