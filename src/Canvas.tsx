import React, { MutableRefObject, useRef } from "react"
import "./Canvas.css"
import { useFabric } from "./utils/useFabric"

const Canvas = () => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement | null>

  const { toggleBrush, onAddText, deleteSelected, onAddArrow, isDrawing } =
    useFabric(canvasRef)

  return (
    <div
      className="canvas-wrapper"
      style={{
        cursor: "pointer",
      }}
    >
      <div className="canvas-parent">
        <canvas id="mycanvas" ref={canvasRef} width={640} height={400} />
      </div>
      <div className="controls">
        <button
          onClick={() => toggleBrush()}
          style={{
            border: !isDrawing ? "" : "1px solid #fafafa",
          }}
        >
          {isDrawing ? "Toggle selection" : "Toggle brush"}
        </button>
        <button onClick={() => onAddText()}>add text</button>
        <button onClick={() => onAddArrow()}>add arrow</button>
        <button onClick={() => deleteSelected()}>delete</button>
        <button onClick={() => deleteSelected()}>save</button>
      </div>
    </div>
  )
}

export default Canvas
