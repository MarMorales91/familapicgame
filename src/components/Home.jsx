import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className=' bg-white border-2 border-black h-[80vh]'>
        <div>
            <h1 className=' text-5xl uppercase text-green-800'>Marlon Harvey Presents:</h1>
        </div>
        <div>
            <h1 className=' text-7xl'>Pictionary</h1>
            <button className=' bg-red-950 p-4 text-3xl text-white uppercase border-2 border-white'><Link to='/game'>Start</Link></button>
        </div>
    </div>
  )
}

export default Home