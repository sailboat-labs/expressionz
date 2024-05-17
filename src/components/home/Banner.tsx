import Link from "next/link";

function Banner() {
  return (
    <>
      <section className="mb-20 hidden h-[20vh] w-full flex-row bg-darkPurple bg-[url('/images/home/big-bird2.webp')] bg-contain bg-right-top bg-no-repeat md:flex md:h-[50vh] lg:h-[60vh] xl:h-[75vh]">
        <div className="mx-auto  flex w-11/12 flex-col justify-center lg:w-4/5">
          <img
            src="/images/logos/logo.webp"
            className="h-auto w-2/5 object-contain lg:w-1/2"
            alt="Logo"
          />
          <p className="mb-8 mt-3 font-presstart text-xs text-white xl:text-base 3xl:my-16 3xl:text-xl">
            Emote your NFT
          </p>

          <Link href="/collections">
            <img
              src="/images/buttons/try-it-now.webp"
              className="w-40 3xl:w-60"
              alt="Try it now"
            />
          </Link>
        </div>
      </section>

      <section className="flex w-full flex-col justify-center bg-darkPurple pb-10 md:hidden">
        {/* <img
          src="/images/home/big-bird2.webp"
          className="h-auto w-3/4 self-end object-contain"
          alt="Mirror moonbird"
        /> */}
        <div className="mx-auto mt-10 flex flex-col justify-center px-4  lg:w-4/5">
          <img
            src="/images/logos/logo.webp"
            className="h-auto w-1/2 object-contain"
            alt="Logo"
          />
          {/* <picture className="h-auto w-1/2 object-contain">
            <source
              media="(min-width: 1440px)"
              srcSet="/images/logos/expressionz-logo-desktop.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="/images/logos/expressionz-logo-laptop.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/logos/expressionz-logo-tablet.webp"
              type="image/webp"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/images/logos/expressionz-logo-mobile.webp"
              type="image/webp"
            />
            <img
              src="/images/logos/expressionz-logo-mobile.webp"
              className="h-auto w-full object-contain"
              alt="Logo"
            />
          </picture> */}
          <p className="my-5 font-presstart text-xs text-white lg:text-base">
            Emote your NFT
          </p>
          <Link href="/collections">
            <img
              src="/images/buttons/try-it-now.webp"
              className="w-40"
              alt="Try it now"
            />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Banner;
