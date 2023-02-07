import { useEffect, useState, useRef } from "react"
import { fabric } from "fabric"

export const useFabric = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const [fabricInstance, setFabricInstance] = useState<fabric.Canvas>(
    new fabric.Canvas("")
  )
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      setFabricInstance(
        new fabric.Canvas(canvasRef.current, {
          isDrawingMode: false,
        })
      )
      fabricInstance.freeDrawingBrush.color = "#e83e8c"
      fabricInstance.freeDrawingBrush.width = 7
    }
    return () => {
      console.log("end")
      canvasRef.current = null
      fabricInstance.dispose()
    }
  }, [canvasRef])

  useEffect(() => {
    if (fabricInstance) {
      fabricInstance.isDrawingMode = isDrawing
    }
  }, [isDrawing, fabricInstance])

  const toggleBrush = () => {
    setIsDrawing(!fabricInstance.isDrawingMode)
  }

  const onAddText = () => {
    setIsDrawing(false)
    var text = new fabric.IText("add comment", { left: 100, top: 100 })
    fabricInstance.add(text)
  }
  const deleteSelected = () => {
    setIsDrawing(false)
    fabricInstance.getActiveObjects().forEach((obj) => {
      fabricInstance.remove(obj)
    })
    fabricInstance.discardActiveObject().renderAll()
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
    fabricInstance.add(arrow)
  }

  return {
    fabricInstance,
    toggleBrush,
    onAddText,
    deleteSelected,
    onAddArrow,
    isDrawing,
  }
}
