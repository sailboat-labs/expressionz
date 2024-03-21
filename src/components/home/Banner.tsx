import React from "react";

function Banner() {
  return (
    <>
      <section className="hidden h-[20vh] w-full flex-row bg-darkPurple bg-[url('/images/home/big-bird2.webp')] bg-contain bg-right-top bg-no-repeat md:flex md:h-[50vh] lg:h-[60vh] xl:h-[75vh]">
        <div className="mx-auto -mt-32 flex w-11/12 flex-col justify-center lg:w-4/5">
          <img
            src="/images/logos/logo.webp"
            className="h-auto w-2/5 object-contain lg:w-1/2"
            alt="Logo"
          />
          <p className="font-presstart mb-8 mt-3 text-white text-xs xl:text-base">
            I am my PFP and my PFP is me
          </p>
          <button className="">
            <img
              src="/images/buttons/try-it-now.webp"
              className="w-40"
              alt="Try it now"
            />
          </button>
        </div>
      </section>

      <section className="flex w-full flex-col justify-center bg-darkPurple pb-10 md:hidden">
        <img
          src="/images/home/big-bird2.webp"
          className="h-auto w-3/4 self-end object-contain"
          alt="Mirror moonbird"
        />
        <div className="mx-auto mt-10 flex w-4/5 flex-col justify-center lg:w-4/5">
          <img
            src="/images/logos/logo.webp"
            className="h-auto w-1/2 object-contain"
            alt="Logo"
          />
          <p className="font-presstart my-5 text-xs text-white lg:text-base">
            I am my PFP and my PFP is me
          </p>
          <button className="">
            <img
              src="/images/buttons/try-it-now.webp"
              className="w-40"
              alt="Try it now"
            />
          </button>
        </div>
      </section>
    </>
  );
}

export default Banner;
