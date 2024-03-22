import React from "react";

function SeamlessIntegration() {
  return (
    <section className="-mt-16 h-[80vh] w-full bg-darkPurple bg-[url('/images/home/right-pixel-bg.webp')] bg-cover bg-right bg-no-repeat lg:my-40 lg:h-[53vh] lg:bg-contain">
      <div className="font-presstart mx-auto flex h-full w-full flex-col items-center justify-center lg:w-4/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative -mt-20 w-11/12 lg:-mt-0 lg:w-auto">
          <video
            playsInline
            autoPlay
            loop={true}
            muted
            poster="/videos/seamless-integration-poster"
            className="h-auto w-full object-cover p-2"
          >
            <source type="video/webm" src="/videos/seamless-integration.webm" />
            <source type="video/mp4" src="/videos/seamless-integration.mp4" />
          </video>
          <img
            src="/images/home/video-frame.webp"
            className="z-50 absolute top-0 h-auto w-full object-cover"
          />
        </div>
        <div className="mt-8 w-11/12 space-y-4 text-left lg:mt-0 lg:w-full lg:text-right lg:ml-5">
          <h1 className="text-3xl uppercase text-yellow">
            SEAMLESS <br />
            INTEGRATION
          </h1>
          <p className="text-xs text-white">
            No fuss export into your favorite messenger platforms.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SeamlessIntegration;
