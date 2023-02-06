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
        controls
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={url} />
      </video>
      <VideoControls videoRef={videoRef} />
    </div>
  )
}

export default Video
