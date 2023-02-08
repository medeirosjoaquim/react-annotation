import React, { useRef, useState, useEffect, useMemo } from "react"
import "./VideoControls.css"
interface Props {
  videoRef: React.RefObject<HTMLVideoElement>
  annotationsTimeframe: string[]
}

const convertToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time
    .split(":")
    .map((val) => parseFloat(val))
  return hours * 3600 + minutes * 60 + seconds
}

const VideoControls: React.FC<Props> = ({ videoRef, annotationsTimeframe }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
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

  function formatDuration(timeInSeconds: number) {
    return (
      `${Math.floor(timeInSeconds / 3600)
        .toString()
        .padStart(2, "0")}:` +
      `${Math.floor((timeInSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0")}:` +
      `${Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, "0")}`
    )
  }

  const convertedMarks = useMemo(
    () => annotationsTimeframe.map((mark) => convertToSeconds(mark)),
    [annotationsTimeframe]
  )

  //write the getPercentage function here so each marker is placed correctly
  // time is hh:mm:ss format
  // consider the input lenght to place the markers correctly
  // marker 00:01:15 should be placed where the input thumb is
  // showing 00:01:15 of the video being played

  const getPixelPosition = (time: string) => {
    if (!inputRef.current) {
      return 0
    }

    const inputWidth = inputRef.current!.offsetWidth
    let seconds = convertToSeconds(time)
    console.log(time, seconds)
    if (seconds === 0) {
      seconds += 3
    } else if (seconds > 0 && seconds <= 180) {
      seconds += 3
    }
    // else if (seconds < 180) {
    //   // handle corner case for values under 00:03:00
    //   seconds *= 1.3
    // }
    return (seconds / duration) * inputWidth
  }
  return (
    <div className="video-controls">
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
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </div>
      </div>
      <div className="video-progress">
        <input
          ref={inputRef}
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <div className="marker-wrapper">
          {annotationsTimeframe.map((time, index) => (
            <div
              key={index}
              className="marker"
              style={{
                left: `calc(${getPixelPosition(time)}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoControls
