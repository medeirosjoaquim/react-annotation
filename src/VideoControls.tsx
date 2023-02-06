import React, { useRef, useState, useEffect } from "react"
import "./VideoControls.css"
interface Props {
  videoRef: React.RefObject<HTMLVideoElement>
}

const VideoControls: React.FC<Props> = ({ videoRef }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [videoRef])

  const handlePlayPause = () => {
    if (playing) {
      videoRef.current!.pause()
    } else {
      videoRef.current!.play()
    }

    setPlaying(!playing)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    videoRef.current!.currentTime = Number(e.target.value)
  }

  const handleRewind = () => {
    videoRef.current!.currentTime -= 10
  }

  const handleAdvance = () => {
    videoRef.current!.currentTime += 10
  }

  return (
    <div
      style={{ width: videoRef.current?.offsetWidth }}
      className="video-controls"
    >
      <div className="video-commands">
        <button onClick={handlePlayPause}>
          {playing ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}
        </button>
        <button onClick={handleRewind}>
          <span>&#8630;</span>
        </button>
        <button onClick={handleAdvance}>
          <span>&#8631;</span>
        </button>
        <div>
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)} /{" "}
          {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
        </div>
      </div>
      <div className="video-progress">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>
    </div>
  )
}

export default VideoControls
