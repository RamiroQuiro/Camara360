import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Grabadora from './views/Grabadora'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/grabadora'} element={<Grabadora/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App
