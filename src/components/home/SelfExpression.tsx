import { useEffect, useState } from "react";

const emojis = [
  {
    img: "/images/samples/1.webp",
    emoji: "/images/emojis/samples/1.webp",
  },
  {
    img: "/images/samples/2.webp",
    emoji: "/images/emojis/samples/2.webp",
  },
  {
    img: "/images/samples/3.webp",
    emoji: "/images/emojis/samples/3.webp",
  },
  {
    img: "/images/samples/4.gif",
    emoji: "/images/emojis/samples/4.webp",
  },
  {
    img: "/images/samples/5.webp",
    emoji: "/images/emojis/samples/5.webp",
  },
  {
    img: "/images/samples/6.webp",
    emoji: "/images/emojis/samples/6.webp",
  },
  {
    img: "/images/samples/7.webp",
    emoji: "/images/emojis/samples/7.webp",
  },
  {
    img: "/images/samples/8.gif",
    emoji: "/images/emojis/samples/8.webp",
  },
  {
    img: "/images/samples/9.webp",
    emoji: "/images/emojis/samples/9.webp",
  },
  {
    img: "/images/samples/10.webp",
    emoji: "/images/emojis/samples/10.webp",
  },
  {
    img: "/images/samples/11.webp",
    emoji: "/images/emojis/samples/11.webp",
  },
  {
    img: "/images/samples/12.gif",
    emoji: "/images/emojis/samples/12.webp",
  },
  {
    img: "/images/samples/13.webp",
    emoji: "/images/emojis/samples/13.webp",
  },
  {
    img: "/images/samples/14.webp",
    emoji: "/images/emojis/samples/14.webp",
  },
  {
    img: "/images/samples/15.webp",
    emoji: "/images/emojis/samples/15.webp",
  },
  {
    img: "/images/samples/16.gif",
    emoji: "/images/emojis/samples/16.webp",
  },
];

function SelfExpression() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === emojis.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="my-20 h-[80vh] w-full bg-darkPurple bg-[url('/images/home/left-pixel-bg.webp')] bg-cover bg-left bg-no-repeat lg:mt-32 lg:h-[53vh] lg:bg-contain 3xl:h-[60vh]">
      <div className="font-presstart mx-auto flex w-4/5 flex-col-reverse lg:h-full lg:w-4/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="mt-9 w-full space-y-4 lg:mt-0 lg:w-2/3">
          <h1 className="text-left text-3xl uppercase text-yellow 3xl:text-5xl 3xl:leading-snug">
            A NEW WORLD OF <br />
            SELF-EXPRESSION
          </h1>
          <p className="text-left text-xs text-white lg:leading-relaxed 3xl:text-xl 3xl:leading-loose">
            Turn your PFPs into custom emotes to convey emotions, reactions, and
            sentiments in a way that's uniquely you
          </p>
        </div>
        <div className="-mt-10 self-end lg:mt-0 lg:self-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={emojis[current].emoji}
              className="mb-5 h-12 w-12 lg:h-20 lg:w-20"
            />
            <img
              src={emojis[current].img}
              className="h-36 w-36 object-contain lg:h-60 lg:w-60 3xl:mr-10 3xl:h-80 3xl:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelfExpression;
