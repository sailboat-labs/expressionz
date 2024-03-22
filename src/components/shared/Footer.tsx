/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import TwitterLogo from "~/images/logos/twitter.webp";

function Footer() {
  const router = useRouter();

  return (
    <footer id="footer" className="bottom-0 z-0 w-full bg-darkGrey">
      <div className="m-auto flex h-20 w-11/12 items-center justify-center lg:m-auto lg:w-4/5 lg:flex-row lg:justify-between lg:space-y-0 3xl:h-24">
        <img
          src="/images/logos/logo.webp"
          alt="Logo"
          className="h-auto w-32 object-contain 3xl:w-40"
        />
        <div className="font-presstart hidden text-sm text-white lg:flex">
          <Image
            src={TwitterLogo}
            alt="Twitter Logo"
            className="h-auto w-6 3xl:w-8"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
