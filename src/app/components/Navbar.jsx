import Dictionary from './Dictionary'

import { useLocation, useNavigate } from 'react-router-dom'
import { useState , useEffect } from 'react'

export default function Navbar(){
  const [ navList, setNavList ] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [ sideStyle, setSideStyle ] = useState("translate-y-full")
  
  useEffect(()=>{
    const full = location.pathname
    
    //theres always Home
    const arr = [{ name:'Home ', destination:'/' }]
    const two = { name : '/ Rooms' , destination : '/rooms'}
    //full.slice(7,9)
    const three = { name : '/ '+full.slice(7) , destination : `/rooms/${full.slice(7)}` }
    const dul = { name : '/ Groups' , destination : '/groups'}
    const sae = { name : '/ '+full.slice(8) , destination : `/groups/${full.slice(8)}`}
    if(full === '/rooms' ) arr.push(two)
    else if(full.includes('/rooms/') ){ arr.push(two) ; arr.push(three) }
    else if(full === '/groups') arr.push(dul)
    else if(full.includes('/groups/') ){ arr.push(dul) ; arr.push(sae) }
    setNavList(arr)
  },[])
  
  return (
    <>
      <div class="m-4 h-12 text-xs bg-blue-300 flex justify-between">
        <div class="flex p-2">
          {navList.map((obj)=> <div>
             <button onClick={()=>navigate(obj.destination)} class="m-1"> {obj.name}</button>
          </div>)}
        </div>
        
        <button class="bg-red-400 w-1/12 flex justify-center items-center" 
        onClick={()=>{
          if(sideStyle==="translate-y-full") setSideStyle("translate-y-half")
          else setSideStyle("translate-y-full")
        }}>
          D
        </button>
      </div>
      
      <div class={`fixed w-screen h-screen bg-white right-0 transition  duration-500 ${sideStyle} `}>
        <Dictionary />
      </div>
    </>
    )
}