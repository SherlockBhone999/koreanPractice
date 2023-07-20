const handleClick = (ownValue, currentItem, currentIndex, setCurrentIndex, list) => {
  if(ownValue.korean === currentItem.korean){
    if(currentIndex !== list.length-1 ){
      setCurrentIndex( currentIndex + 1 )
    }
  }
}

const OptionButtons = ({options, currentItem, currentIndex, setCurrentIndex , list, chosenTest }) => {
  
  return <div class="w-full grid grid-cols-2 gap-2">
    { 
      options.map(obj => <div class="">
        <button class="bg-blue-400 rounded shadow w-full h-[12vh] overflow-scroll p-2"
        onClick={()=>handleClick(obj, currentItem, currentIndex, setCurrentIndex, list) }>
          {chosenTest === "testKorea" ? <p class="text-2xl"> {obj.korean} </p> :
          <p class="text-2xl"> {obj.eng} </p>}
        </button>
      </div>)
    }
  </div>
}

export default OptionButtons