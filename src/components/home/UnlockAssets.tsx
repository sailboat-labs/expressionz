function UnlockAssets() {
  return (
    <section className="my-20 h-[80vh] w-full bg-darkPurple bg-[url('/images/home/right-pixel-bg.webp')] bg-cover bg-right bg-no-repeat lg:h-[53vh] lg:bg-contain 3xl:h-[60vh]">
      <div className="mx-auto flex h-full w-4/5 flex-col items-start font-presstart lg:w-4/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative -mt-10 h-36 h-36 lg:w-60 lg:w-80 self-start lg:-mt-0  lg:self-center 3xl:h-80 3xl:w-80">
          <video
            playsInline
            autoPlay
            loop={true}
            muted
            poster="/images/home/placeholder.webp"
            className=""
          >
            <source type="video/webm" src="/videos/bird-with-chain.webm" />
            <source type="video/mp4" src="/videos/bird-with-chain.mp4" />
          </video>
          <img
            src="/videos/bird-with-chain-frame.webp"
            className="absolute top-0 z-50 h-auto w-full object-cover"
          />
        </div>
        <div className="mt-12 space-y-4 lg:mt-0 3xl:-mr-10">
          <h1 className="text-right text-3xl uppercase text-yellow 3xl:text-5xl 3xl:leading-snug">
            UNLOCK YOUR <br />
            DIGITAL ASSETS
          </h1>
          <p className="text-right text-xs text-white 3xl:text-xl 3xl:leading-snug">
            Free them from the confines <br className="hidden 3xl:flex" />
            of your digital gallery
          </p>
        </div>
      </div>
    </section>
  );
}

export default UnlockAssets;
