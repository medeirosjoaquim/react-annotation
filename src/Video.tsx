import React from "react"
import "./Video.css"
function Video() {
  const url = "/birds.mp4#t=0.1"
  return (
    <div className="video-wrapper">
      <video preload="metadata" controls>
        <source src={url} />
      </video>
    </div>
  )
}

export default Video
