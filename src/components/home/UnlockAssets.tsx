import React from "react";

function UnlockAssets() {
  return (
    <section className="my-20 h-[80vh] w-full bg-darkPurple bg-[url('/images/home/right-pixel-bg.webp')] bg-cover bg-right bg-no-repeat lg:h-[53vh] lg:bg-contain">
      <div className="font-presstart mx-auto flex h-full w-4/5 flex-col items-start lg:w-4/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="self-start">
          <img
            src="/images/home/placeholder.webp"
            className="-mt-20 h-60 w-60 lg:-mt-16 lg:h-80 lg:w-80"
          />
        </div>
        <div className="mt-12 space-y-4 lg:mt-0">
          <h1 className="text-right text-3xl uppercase text-yellow">
            UNLOCK YOUR <br />
            DIGITAL ASSETS
          </h1>
          <p className="text-right text-xs text-white">
            Free them from the confines of your digital gallery
          </p>
        </div>
      </div>
    </section>
  );
}

export default UnlockAssets;
