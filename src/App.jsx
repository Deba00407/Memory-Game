import React from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import MemoryGame from './components/MemoryGame.jsx'

function App() {
  

  return (
    <div className='main-container relative h-screen w-screen dark:bg-custom-black dark:text-white'>
      <Navbar />
      <div className='pt-16 w-full  flex justify-center'>
        <MemoryGame />
      </div>
    </div>
  )
}

export default App
