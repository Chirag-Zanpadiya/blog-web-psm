import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64'>
      {/* NavBar */}
      <NavBar/>
     
    </div>
    </>
  )
}

export default App
