import Groups from '../components/Groups'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'


function Groupspage (){
  return <div>
    <Navbar />
    <Groups />
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
      <Groupspage />
    </div>
  </div>
}