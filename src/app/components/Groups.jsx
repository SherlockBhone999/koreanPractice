import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { Context } from '../../App'



const btnStyle = "flex m-2 text-xs"
const divStyle = "flex"


export default function Groups(){
  const { allItems, allGroups } = useContext(Context)
  const navigate = useNavigate()
  
  
  
  return <div class="m-4 ">
    <div class="grid h-[80vh] overflow-scroll">
      <button onClick={()=>navigate('/groups/1N')} class={btnStyle}> 
        <div class={divStyle}>
          <p>1N</p>
          <p class="ml-2">{ Math.floor(allGroups.oneN.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      
      <button onClick={()=>navigate('/groups/1V')} class={btnStyle}> 
        <div class={divStyle}>
          <p>1V</p>
          <p class="ml-2">{ Math.floor(allGroups.oneV.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      
      <button onClick={()=>navigate('/groups/2N')} class={btnStyle}>
        <div class={divStyle}>
          <p>2N</p>
          <p class="ml-2">{ Math.floor(allGroups.twoN.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
    
      <button onClick={()=>navigate('/groups/2V')} class={btnStyle}>
        <div class={divStyle}>
          <p>2V</p>
          <p class="ml-2">{ Math.floor(allGroups.twoV.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      <button onClick={()=>navigate('/groups/3N')} class={btnStyle}> 
        <div class={divStyle}>
          <p>3N</p>
          <p class="ml-2">{ Math.floor(allGroups.threeN.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      <hr class="bg-gray-400 h-0.5 shadow" />
     
      <button onClick={()=>navigate('/groups/Derived')} class={btnStyle}> 
        <div class={divStyle}>
          <p>Derived</p>
          <p class="ml-2">{ Math.floor(allGroups.derived.count/allItems.length * 100) } % </p>
        </div>
      </button>
     
      <button onClick={()=>navigate('/groups/Eng')} class={btnStyle}> 
        <div class={divStyle}>
          <p>Eng</p>
          <p class="ml-2">{ Math.floor(allGroups.eng.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      <button onClick={()=>navigate('/groups/Sentences')} class={btnStyle}>
        <div class={divStyle}>
          <p>Sentences</p>
          <p class="ml-2">{ Math.floor(allGroups.sentence.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      <button onClick={()=>navigate('/groups/Grammar&Extra')} class={btnStyle}> 
        <div class={divStyle}>
          <p>GrammarAndExtra</p>
          <p class="ml-2">{ Math.floor(allGroups.grammarAndExtra.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      <button onClick={()=>navigate('/groups/TheRest')} class={btnStyle}> 
        <div class={divStyle}>
          <p>TheRest</p>
          <p class="ml-2">{ Math.floor(allGroups.theRest.count/allItems.length * 100) } % </p>
        </div>
      </button>
      
      <button onClick={()=>navigate('/groups/Similar')} class={btnStyle}> 
        <div class={divStyle}>
          <p>Similar</p>_
          <p>not yet</p>
        </div>
      </button>
      

    </div>
  
  </div>
}


