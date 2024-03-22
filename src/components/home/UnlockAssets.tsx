import React from "react";

function UnlockAssets() {
  return (
    <section className="my-20 h-[80vh] w-full bg-darkPurple bg-[url('/images/home/right-pixel-bg.webp')] bg-cover bg-right bg-no-repeat lg:h-[53vh] lg:bg-contain 3xl:h-[60vh]">
      <div className="font-presstart mx-auto flex h-full w-4/5 flex-col items-start lg:w-4/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="self-start">
          <img
            src="/images/home/placeholder.webp"
            className="-mt-20 h-60 w-60 lg:-mt-16 lg:h-80 lg:w-80 3xl:h-96 3xl:w-96"
          />
        </div>
        <div className="mt-12 space-y-4 lg:mt-0 3xl:-mr-10">
          <h1 className="text-right text-3xl uppercase text-yellow 3xl:text-5xl">
            UNLOCK YOUR <br />
            DIGITAL ASSETS
          </h1>
          <p className="text-right text-xs text-white 3xl:text-xl 3xl:leading-loose">
            Free them from the confines <br className="hidden 3xl:flex" />
            of your digital gallery
          </p>
        </div>
      </div>
    </section>
  );
}

export default UnlockAssets;
