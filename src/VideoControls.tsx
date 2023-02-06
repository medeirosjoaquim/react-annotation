import React, { useState, useEffect } from "react"
import "./VideoControls.css"
interface Props {
  videoRef: React.RefObject<HTMLVideoElement | null>
}

const VideoControls: React.FC<Props> = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }

    const updateProgress = () => {
      if (!videoRef.current) {
        return
      }

      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      )
      setCurrentTime(videoRef.current.currentTime)
    }

    videoRef.current.addEventListener("timeupdate", updateProgress)

    return () => {
      if (!videoRef.current) {
        return
      }
      videoRef.current.removeEventListener("timeupdate", updateProgress)
    }
  }, [videoRef])

  const togglePlay = () => {
    if (!videoRef.current) {
      return
    }

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skipBackward = () => {
    if (!videoRef.current) {
      return
    }

    videoRef.current.currentTime -= 10
  }

  const skipForward = () => {
    if (!videoRef.current) {
      return
    }

    videoRef.current.currentTime += 10
  }

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) {
      return
    }

    const time = (event.target.valueAsNumber / 100) * videoRef.current.duration
    videoRef.current.currentTime = time
  }

  return (
    <div className="video-controls">
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={skipBackward}>-10s</button>
      <div style={{ display: "inline-block", width: "100%" }}>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={seek}
          style={{ width: "100%" }}
        />
      </div>
      <button onClick={skipForward}>+10s</button>
      <div style={{ display: "inline-block", marginLeft: "10px" }}>
        {currentTime.toFixed(1)} / {videoRef.current?.duration.toFixed(1)}
      </div>
    </div>
  )
}

export default VideoControls
