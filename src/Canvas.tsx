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
  const fabricRef = useRef(
    new fabric.Canvas("")
  ) as MutableRefObject<fabric.Canvas>
  const [isDrawing, setIsDrawing] = useState(false)
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

  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.isDrawingMode = isDrawing
    }
  }, [isDrawing])

  const toggleBrush = () => {
    setIsDrawing(!fabricRef.current.isDrawingMode)
  }

  const onAddText = () => {
    setIsDrawing(false)
    var text = new fabric.IText("add comment", { left: 100, top: 100 })
    fabricRef.current.add(text)
  }
  const deleteSelected = () => {
    setIsDrawing(false)
    if (fabricRef.current.getActiveObject()) {
      fabricRef.current.remove(fabricRef.current.getActiveObject()!)
    }
  }

  const onAddArrow = () => {
    setIsDrawing(false)

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
