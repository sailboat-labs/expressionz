import { cn } from "@/lib/utils/cn";
import { ComponentPropsWithoutRef } from "react";
import Marquee from "react-fast-marquee";

type TTokenMarqueeProps = ComponentPropsWithoutRef<"section">;

function TokenMarquee({ className, ...props }: TTokenMarqueeProps) {
  const tokens = [
    "/images/samples/1.webp",
    "/images/samples/2.webp",
    "/images/samples/3.webp",
    "/images/samples/4.gif",
    "/images/samples/5.webp",
    "/images/samples/6.webp",
    "/images/samples/7.webp",
    "/images/samples/8.gif",
    "/images/samples/9.webp",
    "/images/samples/10.webp",
    "/images/samples/11.webp",
    "/images/samples/12.gif",
    "/images/samples/13.webp",
    "/images/samples/14.webp",
    "/images/samples/15.webp",
    "/images/samples/16.gif",
  ];

  return (
    <section
      className={cn("w-full bg-yellow py-6 backdrop-blur 3xl:py-10", className)}
      {...props}
    >
      <Marquee className="flex flex-row" autoFill>
        {tokens.map((token, index) => (
          <img
            key={index}
            src={token}
            alt="token"
            loading="lazy"
            className="mr-6 h-auto w-20 object-contain lg:w-32"
          />
        ))}
      </Marquee>
    </section>
  );
}

export default TokenMarquee;
