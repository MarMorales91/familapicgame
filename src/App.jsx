import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Game from './components/Game'
import Home from "./components/Home";
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
