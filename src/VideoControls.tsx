import React, { useRef, useState, useEffect, useMemo, useCallback } from "react"
import "./VideoControls.css"
import { useAtom } from "jotai"
import { isPlayingAtom } from "./atoms/isPlaying.atom"
import { setCurrentTimeAtom } from "./atoms/currentTimeAtom"
import { useAppStore } from "./main"
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

function convertToHHMMSS(seconds: number): string {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds % 3600) / 60)
  let remainingSeconds = Math.floor(seconds % 60)

  let hoursString = hours < 10 ? "0" + hours : hours.toString()
  let minutesString = minutes < 10 ? "0" + minutes : minutes.toString()
  let secondsString =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds.toString()

  return `${hoursString}:${minutesString}:${secondsString}`
}

const VideoControls: React.FC<Props> = ({ videoRef, annotationsTimeframe }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const setCurrentTimeState = useAppStore((state) => state.setCurrentTime)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useAtom(isPlayingAtom)
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
      setCurrentTimeState(convertToHHMMSS(video.currentTime))
    }

    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [videoRef])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }
    if (playing === null) {
      return
    }
    // video state must be equal to isPlayingAtom
    if (playing) {
      video.play()
    } else {
      video.pause()
    }
  }, [playing])

  const handlePlayPause = () => {
    if (playing === null) {
      setPlaying(true)
      return
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

  const getPixelPosition = useCallback(
    (time: string) => {
      if (!inputRef.current) {
        return 0
      }

      const inputWidth = inputRef.current!.offsetWidth
      let seconds = convertToSeconds(time)
      // console.log(time, seconds)
      if (seconds === 0) {
        seconds += 3
      } else if (seconds > 0 && seconds <= 180) {
        seconds += 8
      }
      // else if (seconds < 180) {
      //   // handle corner case for values under 00:03:00
      //   seconds *= 1.3
      // }
      return (seconds / duration) * inputWidth
    },
    [duration]
  )

  const convertedMarks = useMemo(
    () => annotationsTimeframe.map((mark) => getPixelPosition(mark)),
    [annotationsTimeframe, duration]
  )

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
          {convertedMarks.map((time, index) => (
            <div
              key={index}
              className="marker"
              style={{
                left: `calc(${time}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoControls
