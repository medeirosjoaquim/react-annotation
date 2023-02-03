import React, { useState, useRef, useEffect, MutableRefObject } from "react"

interface VideoTimelineProps {
  video: File
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ video }) => {
  const [duration, setDuration] = useState<number>(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRefs = useRef([]) as MutableRefObject<
    React.LegacyRef<HTMLCanvasElement>[]
  >

  const handleVideoLoad = (): void => {
    setDuration(videoRef.current?.duration || 0)
  }
  const range = secondsToRange(duration)

  return (
    <div>
      <video
        ref={videoRef}
        onLoadedData={handleVideoLoad}
        src={URL.createObjectURL(video)}
        controls
        style={{ display: "none" }}
      />
      <ul style={{ display: "flex", flexDirection: "row" }}>
        {range.map((time, index) => {
          return (
            <li key={index} style={{ width: "100px", height: "100px" }}>
              <canvas
                style={{ width: "100%", height: "100%" }}
                ref={canvasRefs.current[index]}
              />
              <p>{time}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VideoTimeline
