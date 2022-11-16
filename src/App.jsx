import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Grabadora from './views/Grabadora'
import Layout from './layout/Layout'
import WebCamRecorder from './componentes/WebCamRecorder'
import Lienzo from './views/Lienzo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<Layout/> }>
        <Route path="/" element={<WebCamRecorder />} />
        <Route path={'/grabadora'} element={<Grabadora/>}/>
        <Route path={'/canva'} element={<Lienzo/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
    )
}

export default App
