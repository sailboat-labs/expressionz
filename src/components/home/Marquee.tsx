import React from "react";
import Marquee from "react-fast-marquee";

function TokenMarquee() {
  const tokens = [
    "/images/samples/1.webp",
    "/images/samples/2.webp",
    "/images/samples/3.webp",
    "/images/samples/4.webp",
    "/images/samples/5.webp",
    "/images/samples/6.webp",
    "/images/samples/7.webp",
    "/images/samples/8.webp",
    "/images/samples/9.webp",
    "/images/samples/10.webp",
    "/images/samples/11.webp",
  ];

  return (
    <section className="w-full bg-yellow py-6 backdrop-blur">
      <Marquee className="flex flex-row" autoFill>
        {tokens.map((token, index) => (
          <img
            key={index}
            src={token}
            alt="token"
            className="mr-6 h-auto w-20 object-contain"
          />
        ))}
      </Marquee>
    </section>
  );
}

export default TokenMarquee;
