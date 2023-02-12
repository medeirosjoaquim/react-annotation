import { useEffect, useState, useRef } from "react"
import { fabric } from "fabric"
import { nanoid } from "nanoid"
import { useAppStore } from "../main"

export const useFabric = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  annotations: object[],
  currentTime: string
) => {
  const [fabricInstance, setFabricInstance] = useState<fabric.Canvas>(
    new fabric.Canvas("")
  )
  const [isDrawing, setIsDrawing] = useState(false)
  const addAnnotation = useAppStore((state) => state.add)

  useEffect(() => {
    if (canvasRef.current) {
      setFabricInstance(
        new fabric.Canvas(canvasRef.current, {
          isDrawingMode: false,
        })
      )
      fabricInstance.freeDrawingBrush.color = "#FF0000"
      fabricInstance.freeDrawingBrush.width = 12
    }
    return () => {
      console.log("end")
      canvasRef.current = null
      fabricInstance.dispose()
    }
  }, [canvasRef])

  //create a useeffect for isDrawing

  useEffect(() => {
    if (fabricInstance) {
      fabricInstance.isDrawingMode = isDrawing
    }
  }, [isDrawing, fabricInstance])

  useEffect(() => {
    if (fabricInstance && annotations.length > 0) {
      const timeFrames = annotations.map((item: any) => item.time)
      if (timeFrames.includes(currentTime)) {
        const obj: any = annotations.find(
          (item: any) => item.time === currentTime
        )
        fabricInstance.clear()
        fabricInstance.loadFromJSON(obj, () => {
          fabricInstance.renderAll()
        })
        console.log(currentTime)
      }
    }
  }, [annotations, fabricInstance, currentTime])

  useEffect(() => {
    if (fabricInstance) {
      fabricInstance.freeDrawingBrush.color = "#FF0000"
      fabricInstance.freeDrawingBrush.width = 12
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
  const onSave = () => {
    const canvas = fabricInstance.toObject(["id", "time"])
    canvas.id = nanoid()
    canvas.time = currentTime
    addAnnotation(canvas)
    console.log(canvas)
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
    setIsDrawing,
    onSave,
  }
}
