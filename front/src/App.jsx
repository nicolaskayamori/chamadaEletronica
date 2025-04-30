import { useState } from 'react'
import './App.css'
import QrCode from './components/QrCode.jsx'

function App() {
  

  return (
    <>
      <div className='titulo'>
       <h2>Chamada Eletrônica</h2>
      </div>

        <QrCode mode="generator" userType="teacher"/>
      
      
    </>
  )
}

export default App
