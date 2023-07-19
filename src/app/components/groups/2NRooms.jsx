

//just copy 1NRoome
const OneButton = ({data, setCurrentRoom}) => {
  return <div class="w-full flex justify-center items-center">
    <button class="w-24 h-24 bg-blue-300 rounded-lg shadow m-2 p-2"
    onClick={()=>{
      setCurrentRoom(data.num)
    }}>{ data.num }</button>
  </div>
}

const Rooms = ({list, setCurrentRoom}) => {
  
  return <div class="w-full grid grid-cols-6 ">
    {list.map(obj => <div>
      <OneButton data={obj} setCurrentRoom={setCurrentRoom} />
    </div>)}
  </div>
}

export default Rooms