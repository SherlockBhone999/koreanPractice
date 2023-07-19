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
    <div class="h-[65vh] bg-gray-600 overflow-scroll m-2 p-4 border-2 border-black relative">
      <input type='text' class='p-2 rounded mb-2' placeholder='...search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      
      <div class='absolute top-10 right-0 bg-white text-blue-600 rounded border-4 border-black m-1' >
        <button class='p-4' onClick={()=>{
          if(searchLanguage === "eng") setSearchLanguage("korean")
          else setSearchLanguage("eng")
        }}>
          { searchLanguage === "eng" ? 'search in Korean' : 'search in Eng'}
        </button>
      </div>
      
        <div class='bg-gray-200 rounded '>
          <div class='flex' >
            <p class='bg-gray-600 p-2 text-white '> {list.length} items found </p>
          </div>
      
          <div class='grid grid-cols-4 p-2 rounded gap-2'>
            {list.map(obj => <div class="flex justify-center">
              <button onClick={()=>setCurrentItem(obj)}>
                <p class="text-2xl">{obj.korean}</p>
                <p class="text-sm">{obj.eng}</p>
              </button>
            </div>)}
          </div>  
        </div>
        
    
    </div>
  </div>
}

export default SearchAndResult
