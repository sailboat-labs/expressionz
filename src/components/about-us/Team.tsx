import React from "react";
import Image from "next/image";

export default function Team() {
  return (
    <section>
      <div className="">
        <h2 className="font-presstart mx-5 mb-10 w-full text-center text-xl font-normal text-[#22AFFF] lg:mx-auto lg:w-3/5 lg:text-left">
          The team
        </h2>
        <div className="mx-auto w-11/12 space-y-10 lg:w-3/5 lg:space-y-11">
          {teamInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0"
            >
              <Image
                src={info.imageUrl}
                width={240}
                height={240}
                className="mx-auto h-60 w-60 lg:h-40 lg:w-40"
                alt="Team Info"
                loading="lazy"
              />
              <div className="flex flex-col space-y-4">
                <h2 className="mx-4 text-center text-sm font-normal text-white lg:mx-0 lg:text-left lg:text-sm">
                  {info.heading}
                </h2>
                <p className="mx-4 text-justify text-xs leading-relaxed tracking-wide text-white lg:mx-0">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-10 mt-16 w-full bg-white py-10 lg:mb-5">
          <div className="mx-auto flex w-full flex-row flex-wrap gap-5 lg:w-3/5 lg:flex-nowrap lg:justify-between lg:gap-0">
            {restOfTeam.map((info, index) => (
              <div key={index} className="mx-auto flex flex-col space-y-4">
                <Image
                  src={info.imageUrl}
                  width={160}
                  height={160}
                  className="mx-auto h-40 w-40 lg:h-40 lg:w-40"
                  alt="Team Info"
                  loading="lazy"
                />
                <p className="font-presstart text-center text-xs text-black">
                  {info.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const teamInfo = [
  {
    imageUrl: "/images/about-us/girl.webp",
    heading: (
      <>
        <span className="text-lg text-yellow">a girl </span>
        project management
      </>
    ),
    description: (
      <span>
        As a day 0 birb minter and nestooor, a memooor and a prolific
        emoji-user, a girl is in this space as a believer in the ethos and
        spirit of “web3” and the potential of blockchain. a girl has a track
        record of more than a decade of contributing to the development and
        management of projects of various sizes (ranging from $100k - $11m+)
      </span>
    ),
  },
  {
    imageUrl: "/images/about-us/mark.webp",
    heading: (
      <>
        <span className="text-lg text-yellow">Mark</span> resourcing and
        advising
      </>
    ),
    description: (
      <span>
        Founder and investor, Mark exited his first company, Piper after raising
        $15m in VC funding from top investors in silicon valley and the world in
        2018.
        <br />
        <br />
        He was invited to go to New Zealand during the pandemic and started a
        $15m VC fund investing into the local tech ecosystem:
        https://www.nzvc.co.nz/ To date the fund has backed over 35 innovative
        companies including 7 crypto ones.
        <br />
        <br />
        He is also a partner at a blockchain development studio (MCB) where
        they&apos;ve developed extensive NFT and crypto projects:
        https://mycreativitybox.com/ He has a degree from Princeton and dropped
        out of his Machine Learning PhD at Oxford to pursue his first company.
        He will be leading the MCB team that will develop this project.
        <br />
        <br />
        Access to Mark’s team composed of graphic designers, illustrators, and
        developers (both blockchain-specific and general full-stack devs), all
        the necessary skills and experiences to bring this project to life!
      </span>
    ),
  },
];

const restOfTeam = [
  {
    role: "Designer",
    imageUrl: "/images/about-us/designer.webp",
  },
  {
    role: "Illustrator",
    imageUrl: "/images/about-us/illustrator.webp",
  },
  {
    role: "Developer",
    imageUrl: "/images/about-us/dev.webp",
  },
  {
    role: "Animator",
    imageUrl: "/images/about-us/animator.webp",
  },
];
