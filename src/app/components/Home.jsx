import { useNavigate } from 'react-router-dom'





export default function Home(){
  const navigate = useNavigate()
  return <div>
    <button onClick={()=>navigate('/rooms')} class="m-2">Rooms</button>
    <hr/>
    <button onClick={()=>navigate('/groups')} class="m-2">Lab</button>
    
  </div>
}