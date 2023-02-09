import { useState } from "react"
import "./App.css"
import Canvas from "./Canvas"
import Video from "./Video"

function App() {
  return (
    <div className="App">
      <Video />
      <Canvas />
    </div>
  )
}

export default App
