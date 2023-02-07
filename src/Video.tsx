import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import "./Video.css"
import VideoControls from "./VideoControls"
function Video() {
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>
  const url = "/big_buck_bunny_640.mp4#1"
  const [duration, setDuration] = useState<number>()
  const getDuration = useCallback((file: File) => {
    const video = document.createElement("video")
    video.preload = "metadata"
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src)
      setDuration(video.duration)
    }
    video.src = URL.createObjectURL(file)
  }, [])

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration)
  }
  return (
    <div className="video-wrapper">
      <video
        preload="metadata"
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={url} />
      </video>
      // copilot create a settime
      <VideoControls
        videoRef={videoRef}
        annotationsTimeframe={["00:00:0", "00:00:10", "00:01:15"]}
      />
    </div>
  )
}

export default Video
