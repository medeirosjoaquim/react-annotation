import React from "react"
import "./Video.css"
function Video() {
  const url =
    "https://vod-progressive.akamaized.net/exp=1675407720~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3123%2F20%2F515619483%2F2392243950.mp4~hmac=90ae004681b59cbc060650e7f67fa10fb82695e14630806bf807426ee477c8f4/vimeo-prod-skyfire-std-us/01/3123/20/515619483/2392243950.mp4"
  return (
    <div className="video-wrapper">
      <video controls src={url}></video>
    </div>
  )
}

export default Video
