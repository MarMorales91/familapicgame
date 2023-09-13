import React from 'react'
import Logo from "../assets/Marlon Harvey.png"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className=' relative'>
        <img src={Logo} alt="" />
        <div>
            <button className=' absolute bottom-0 left-0 bg-blue-600 p-4 text-3xl text-white uppercase border-2 border-white'><Link to='/game'>Start</Link></button>
        </div>
    </div>
  )
}

export default Home