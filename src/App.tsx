import { useState } from 'react'
import './App.css'
import { MantineProvider } from '@mantine/core'
import { PartyButtonBox } from './PartyButtonBox';

function App() {
  const [score, setScore] = useState(0);

  const handleButtonClick = () => {
    setScore(score + 1);
  }
  return (
    <MantineProvider >
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "100%", alignItems: "center" }}>

          <h1 style={{height: "10vh"}}>Titel des Spiels</h1>
          <p style={{height: "20vh"}}>Hier kommt eine Beschreibung hin</p>

          <p style={{height: "15vh"}}>Aktueller Score: {score}</p>
          <PartyButtonBox handleButtonClick={handleButtonClick}/>
        </div></div>
    </MantineProvider>
  )
}

export default App
