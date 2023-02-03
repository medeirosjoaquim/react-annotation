import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import "./Canvas.css"
import { fabric } from "fabric"

const Canvas = () => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement | null>
  const fabricRef = useRef() as MutableRefObject<fabric.Canvas>
  const [isDrawing, setIsDrawing] = useState(false)
  const [isAnnotating, setIsAnnotating] = useState(false)
  useEffect(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: false,
      })
      fabricRef.current.freeDrawingBrush.color = "#e83e8c"
      fabricRef.current.freeDrawingBrush.width = 7
    }
    return () => {
      console.log("end")
      canvasRef.current = null
      fabricRef.current.dispose()
    }
  }, [canvasRef])

  const toggleBrush = () => {
    fabricRef.current.isDrawingMode = !fabricRef.current.isDrawingMode
    setIsDrawing(fabricRef.current.isDrawingMode)
  }

  const onAddText = () => {
    var text = new fabric.IText("add comment", { left: 100, top: 100 })
    fabricRef.current.add(text)
  }

  const onAddArrow = () => {
    const triangle = new fabric.Triangle({
      width: 10,
      height: 15,
      fill: "lime",
      left: 150,
      top: 66,
      angle: 90,
    })
    const line = new fabric.Line([50, 100, 120, 100], {
      left: 75,
      top: 70,
      strokeWidth: 3,
      stroke: "lime",
    })
    const arrow = new fabric.Group([line, triangle])
    fabricRef.current.add(arrow)
  }

  return (
    <div
      className="canvas-wrapper"
      style={{
        zIndex: isAnnotating ? 3 : 1,
      }}
    >
      <div className="canvas-parent">
        <canvas id="mycanvas" ref={canvasRef} width={640} height={400} />
      </div>
      <div className="toggle-annotation">
        <input
          type="checkbox"
          onChange={(e) => setIsAnnotating(e.target.checked)}
        />
        <span>Toggle Annotation</span>
      </div>
      <div className="controls">
        <button
          onClick={() => toggleBrush()}
          style={{
            border: !isDrawing ? "" : "1px solid #fafafa",
          }}
        >
          toggle brush
        </button>
        <button onClick={() => onAddText()}>add text</button>
        <button onClick={() => onAddArrow()}>add arrow</button>
      </div>
    </div>
  )
}

export default Canvas
