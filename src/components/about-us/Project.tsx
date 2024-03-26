import React, { useState } from "react";
import Video from "./Video";
import Image from "next/image";

// Images
import AboutText from "~/images/about-us/text.webp";
import VideoPoster from "~/images/about-us/video.webp";
import { isMobile } from "react-device-detect";

export default function Project() {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  return (
    <section>
      <div className="mx-auto w-11/12 lg:w-3/5">
        <Image
          src={AboutText}
          alt="About us text"
          loading="lazy"
          className="mx-auto my-20 w-4/5 lg:w-3/5"
        />
        <h2 className="font-presstart mx-4 text-xl font-normal text-yellow lg:mx-0">
          The project
        </h2>
        <div className="mx-4 my-6 space-y-6 lg:mx-0">
          {projectInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between space-x-5"
            >
              <Image
                src={info.emojiUrl}
                alt="Emoji"
                width={36}
                height={36}
                className="h-auto w-9"
              />
              <p className="text-xs leading-relaxed tracking-wide text-white">
                {info.text}
              </p>
            </div>
          ))}
        </div>
        <div className="relative mx-auto my-16 w-full lg:w-4/5">
          <Image src={VideoPoster} alt="Video" loading="lazy" />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white bg-opacity-50"
              onClick={() => setShowVideo(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
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
          <div className="mt-5 flex justify-center">
            <button className="">
              <img
                src="/images/buttons/try-it-now.webp"
                className="w-40 3xl:w-60"
                alt="Try it now"
              />
            </button>
          </div>
        </div>
      </div>

      <Video
        show={showVideo}
        onClose={() => setShowVideo(false)}
        src={isMobile ? "/videos/about-us.mp4" : "/videos/about-us.webm"}
      />
    </section>
  );
}

const projectInfo = [
  {
    emojiUrl: "/images/about-us/hugs.webp",
    text: "Powered by the Moonbirds Lunar Society, this is a cross-platform tool to make emoji packs based on your digital assets.",
  },
  {
    emojiUrl: "/images/about-us/smartphone.webp",
    text: "The most recognisable use of our digital assets are often as profile pictures. We are our PFPs and our PFPs are us. But they often lose relevance in our daily lives outside of web3. Digital self-expressions on daily communications platform are limited to a predetermined range of stock image emojis. ",
  },
  {
    emojiUrl: "/images/about-us/gear.webp",
    text: (
      <p>
        <span className="text-purple">Expressionz.xyz </span>
        is building a browser-based tool that allows the unlocking of digital
        assets for use as expressions across different communication platforms –
        no editing, coding, or other technical expertise required. It combines
        the use of algorithms, art and design to generate graphics
      </p>
    ),
  },
  {
    emojiUrl: "/images/about-us/art.webp",
    text: "Creators can also contribute directly to the library of emojis and possible customisations. We are building the rails to enable creators to contribute to the brand building process, for themselves, for their assets, and for the wider community. ",
  },
  {
    emojiUrl: "/images/about-us/fire.webp",
    text: (
      <p>
        The first product from{" "}
        <span className="text-purple">Expressionz.xyz </span> is the EmojiBox.
        In a few clicks, you can generate a set of graphics based on your
        digital asset for use in messaging apps you use for daily communications
        (e.g. WhatsApp).
      </p>
    ),
  },
  {
    emojiUrl: "/images/about-us/stars.webp",
    text: "These are expression that represents YOU, and you can even share them for wider use. This is initially exclusive and free to use for Moonbird holders, with the intention of opening it up for future use by other communities.",
  },
];
