function SeamlessIntegration() {
  return (
    <section className="-mt-16 h-[70vh] w-full bg-darkPurple bg-[url('/images/home/right-pixel-bg.webp')] bg-cover bg-right bg-no-repeat py-16 lg:my-40 lg:h-[53vh]  lg:bg-contain">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center font-presstart lg:w-4/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative -mt-20 w-11/12 lg:-mt-0 lg:w-auto 3xl:w-[95%]">
          <video
            playsInline
            autoPlay
            loop={true}
            muted
            poster="/videos/seamless-integration-poster"
            className=" h-auto w-96  object-contain  p-2"
          >
            <source type="video/webm" src="/videos/seamless-integration.webm" />
            <source type="video/mp4" src="/videos/seamless-integration.mp4" />
            <img
              src="/videos/seamless-integration-frame.webp"
              className="absolute top-0 z-50 h-auto w-full object-cover"
            />
          </video>
        </div>
        <div className="mt-8 w-11/12 space-y-4 text-left lg:ml-5 lg:mt-0 lg:w-full lg:max-w-2xl lg:text-right 3xl:space-y-7">
          <h1 className="text-xl uppercase text-yellow xl:text-4xl 3xl:leading-snug">
            SEAMLESS <br />
            INTEGRATION
          </h1>
          <p className="text-xs text-white lg:leading-relaxed 3xl:text-xl 3xl:leading-loose">
            No fuss export into your favorite messenger platforms
          </p>
        </div>
      </div>
    </section>
  );
}

export default SeamlessIntegration;
