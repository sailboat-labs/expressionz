import React, { useState } from "react";
import CustomConnectButton from "../buttons/CustomConnectButton";

function VideoSection() {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  return (
    <div className="w-4/5 relative mx-auto my-16">
      <video
        poster="/images/about-us/video.webp"
        src="/videos/about-us.webm"
        className="h-auto w-full object-cover"
        playsInline
        autoPlay={showVideo}
      >
        <source type="video/webm" src="/videos/about-us.webm" />
        <source type="video/mp4" src="/videos/about-us.mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="w-20 h-20 bg-white bg-opacity-50 rounded-full flex justify-center items-center"
          onClick={() => setShowVideo(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16"
          >
            <g id=" Fill / chevron-right">
              <path
                id="Verctor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.956 18.0028C10.649 18.0028 10.339 17.9368 10.05 17.8008C9.402 17.4948 9 16.8878 9 16.2148V7.78878C9 7.11578 9.402 6.50878 10.05 6.20278C10.782 5.85778 11.65 5.95878 12.259 6.46178L17.358 10.6758C17.767 11.0118 18 11.4958 18 12.0018C18 12.5078 17.767 12.9918 17.358 13.3278L12.259 17.5408C11.891 17.8458 11.427 18.0028 10.956 18.0028Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <CustomConnectButton text="Try it now" />
      </div>
    </div>
  );
}

export default VideoSection;
