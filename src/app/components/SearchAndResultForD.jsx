import { useState, useContext, useEffect } from 'react'
import { Context } from '../../App'


const filterWords = (searchLanguage, searchTerm, setList , allWords) => {
  //don't want to render all words
  if(searchTerm !== ""){
    if(searchLanguage === "eng"){
      const arr = allWords.filter(obj => obj.eng.includes(searchTerm))
      setList(arr)
    }else{
      const arr = allWords.filter(obj => obj.korean.includes(searchTerm))
      setList(arr)
    }
  }else{
    setList([])
  }
}


const SearchAndResult = ({ currentItem, setCurrentItem}) => {
  const { allWords } = useContext(Context)

  const [ list, setList] = useState(allWords)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchLanguage, setSearchLanguage ] = useState('eng')
  
  useEffect(()=>{
    filterWords(searchLanguage, searchTerm, setList , allWords )
  },[searchTerm])
  
  return <div>
    <div class="h-[64vh] bg-gray-600 overflow-scroll m-2 p-4 border-2 border-black relative">
      <input type='text' class='p-2 rounded mb-2 text-[0.75rem]' placeholder='...search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      
      <div class='absolute top-10 right-0 bg-white text-blue-600 rounded border-4 border-black m-1' >
        <button class='p-3 text-[0.75rem]' onClick={()=>{
          if(searchLanguage === "eng") setSearchLanguage("korean")
          else setSearchLanguage("eng")
        }}>
          { searchLanguage === "eng" ? 'search in Korean' : 'search in Eng'}
        </button>
      </div>
      
        <div class='bg-gray-200 rounded '>
          <div class='flex' >
            <p class='bg-gray-600 p-2 text-white text-[0.1rem]'> {list.length} items found </p>
          </div>
      
          <div class='grid grid-cols-3 p-2vrounded gap-2 overflow-hidden'>
            {list.map(obj => <div class="flex justify-center overflow-scroll">
              <button onClick={()=>setCurrentItem(obj)}>
                <p class="text-xl ">{obj.korean}</p>
                <p class="text-xs ">{obj.eng}</p>
              </button>
            </div>)}
          </div>  
        </div>
        
    
    </div>
  </div>
}

export default SearchAndResult
