import { cn } from "@/lib/misc.lib";
import { useEffect, useRef } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

export function LoadingProgress({
  show,
  progress,
  total,
}: {
  show: boolean;
  progress: number;
  total: number;
}) {
  if (!show) return null;

  return (
    <div className="fixed z-9999 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {/* Loading progress bar */}
        <div className="flex h-3 w-3/5 rounded-full bg-gray-500 lg:w-1/4">
          <div
            style={{ width: `${(progress / total) * 100}%` }}
            className="h-full rounded-full bg-white"
          ></div>
        </div>
        <div className="flex justify-center text-xl text-white">
          Loading {`${((progress / total) * 100).toFixed(1)}%`}
        </div>
      </div>
    </div>
  );
}

export default function MoonbirdsVideoLoader({
  show,
  progress,
  total,
}: {
  show: boolean;
  progress: number;
  total: number;
}) {
  const videoElement = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoElement.current != null && videoElement.current.paused) {
      videoElement.current.play();
    }
  }, []);

  // const texts = [
  //   "is generating your emojis...",
  //   "is drawing you a smiley face...",
  //   "is magicking up some expressionz...",
  //   "is making you an EmojiBox...",
  //   "is preparing to teleport your emojis...",
  // ];

  // const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setCurrent(current >= texts.length - 1 ? 0 : current + 1);
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [show, current]);

  if (!show) return null;

  return (
    <section
      className={`${
        show ? "left-0 top-0 z-9999 flex" : "z-0 hidden"
      } fixed h-screen w-screen bg-black bg-opacity-80`}
    >
      <div className="flex h-full w-full items-center justify-center space-y-5">
        <div className="relative flex  w-11/12 flex-col items-center justify-center rounded-lg    xl:w-1/2">
          <div className=" absolute top-2 flex w-full items-center justify-center md:top-5">
            <img
              src="/images/loading-logo.webp"
              alt="loading logo"
              className=" h-5 w-auto object-contain  lg:h-8"
            />
          </div>
          <video
            ref={videoElement}
            playsInline
            autoPlay
            loop
            muted
            poster="/videos/loading/moonbirds-loading-poster.webp"
            className="h-auto rounded-lg object-cover "
          >
            <source
              type="video/webm"
              src="/videos/loading/moonbirds-loading.webm"
            />
            <source
              type="video/mp4"
              src="/videos/loading/moonbirds-loading.mp4"
            />
          </video>

          <div
            className={cn(
              "absolute bottom-3 flex w-full items-center justify-center gap-2 sm:bottom-6 ",
              "text-xs text-[#FFD702] lg:text-lg",
            )}
          >
            <div className="">
              <LiaSpinnerSolid className="h-5 w-5 animate-spin" />
            </div>
            Generating emojis...
            {/* <StripedLoader className="mx-2 max-w-sm" /> */}
          </div>
          {/* <p className="-translate-y-8 text-center text-xs font-bold text-[#FFD702] opacity-90 lg:text-lg">
            {texts[current]}

            Generating emojis&nbsp;
            <span>{`${((progress / total) * 100).toFixed(0)}%`}</span>
          </p> */}
        </div>
      </div>
    </section>
  );
}
