

const OneButton = ({data, setCurrentRoom}) => {
  return <div class="w-full flex justify-center items-center">
    <button class=" bg-blue-300 rounded-lg shadow m-2 w-full h-16"
    onClick={()=>{
      setCurrentRoom(data.num)
    }}>{ data.num }</button>
  </div>
}

const Rooms = ({list, setCurrentRoom}) => {
  
  return <div class="w-full h-[75vh] overflow-scroll">
    <div class="w-full grid grid-cols-2 gap-1">
      {list.map(obj => <div>
        <OneButton data={obj} setCurrentRoom={setCurrentRoom} />
      </div>)}
    </div>
  </div>
}

export default Rooms