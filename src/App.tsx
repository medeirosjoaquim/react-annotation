import { useState } from "react"
import "./App.css"
import Canvas from "./Canvas"
import Video from "./Video"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Video />
      <Canvas />
    </div>
  )
}

export default App
