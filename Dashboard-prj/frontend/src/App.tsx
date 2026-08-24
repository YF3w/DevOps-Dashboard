import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
const response = await fetch("http://localhost:3000/api/metrics");
const data = await response.json();

console.log(data);

function App() {
  const [count, setCount] = useState(0) 

  return (
    <>
      * <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code> TETS ME </code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    
      <div className="metrics" >
       <h1>System Metrics</h1>
        <p>CPU Usage: {data.cpu}%</p> 
        <p>Memory Total: {data.memory.total}gb</p>
        <p>Memory Used: {data.memory.used}gb</p>
        <p>Memory Free: {data.memory.free}gb</p>
        <p>Memory Usage percentage: {data.memory.percent}%</p>
        <p>Disk Usage: {data.disk}%</p>
        
        
      </div>
      
    </>

    
  )
}

export default App
