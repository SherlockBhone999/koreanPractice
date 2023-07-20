const OneButton = ({data, setCurrentRoom}) => {
  return <div class="w-full flex justify-center items-center">
    <button class=" h-12 bg-blue-300 rounded-lg shadow m-2 p-2"
    onClick={()=>{
      setCurrentRoom(data.letter+"-")
    }}>{ data.letter }-</button>
  </div>
}

const OneButton2 = ({data, setCurrentRoom}) => {
  return <div class="w-full flex justify-center items-center">
    <button class=" h-12 bg-blue-300 rounded-lg shadow m-2 p-2"
    onClick={()=>{
      setCurrentRoom("-"+data.letter)
    }}>-{ data.letter }</button>
  </div>
}

const Rooms = ({groupObj, setCurrentRoom}) => {
  
  return <div class="w-full grid grid-cols-7 h-[60vh] overflow-scroll">
    {groupObj.starts.map(obj => <div>
      <OneButton data={obj} setCurrentRoom={setCurrentRoom} />
    </div>)}
    {groupObj.ends.map(obj => <div>
      <OneButton2 data={obj} setCurrentRoom={setCurrentRoom} />
    </div>)}
  </div>
}

export default Rooms
