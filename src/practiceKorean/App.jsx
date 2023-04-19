import Homepage from './pages/Homepage'
import MultipleChoiceRoompage from './pages/MultipleChoiceRoompage'
import Levelspage from './pages/Levelspage'
import { BrowserRouter, Routes, Route , useParams } from 'react-router-dom'

function App(){
  const { roomNum } = useParams()
  return <div>
  <BrowserRouter >
    <Routes >
      <Route exact path='/' element={<Homepage />} />
      <Route path='/:roomNum' element={<MultipleChoiceRoompage />} />
      <Route path='/l' element={<Levelspage />} />
    </Routes>
  </BrowserRouter>
  </div>
}


export default App
