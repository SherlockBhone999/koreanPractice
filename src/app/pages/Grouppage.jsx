import Group from '../components/Group'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'


function Grouppage (){
  return <div>
  <Navbar />
  <Group />
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
      <Grouppage />
    </div>
  </div>
}