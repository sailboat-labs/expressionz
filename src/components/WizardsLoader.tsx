import { cn } from "@/lib/utils";

export function WizardsLoader({
  show,
  progress,
  total,
}: {
  show: boolean;
  progress: number;
  total: number;
}) {
  //   const texts = [
  //     "is generating your emojis...",
  //     "is drawing you a smiley face...",
  //     "is magicking up some expressionz...",
  //     "is making you an EmojiBox...",
  //     "is preparing to teleport your emojis...",
  //   ];

  //   const [current, setCurrent] = useState(0);

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       setCurrent(current >= texts.length - 1 ? 0 : current + 1);
  //     }, 2000);

  //     return () => clearTimeout(timeout);
  //   }, [show, current]);

  if (!show) return null;

  return (
    <section
      className={cn(
        "fixed h-screen w-screen bg-black bg-opacity-80",
        show ? "left-0 top-0 z-9999 flex" : "z-0 hidden",
      )}
    >
      <div className="flex h-full w-full items-center justify-center space-y-5 ">
        <div className="relative mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center rounded-lg bg-[#444444]  ">
          {/* <div className=" flex w-full translate-y-8 items-center justify-center">
            <img
              src="/images/loading-logo.webp"
              alt="loading logo"
              className="mr-2 h-5 w-auto object-contain lg:mr-4 lg:h-8"
            />
          </div> */}
          <video
            playsInline
            autoPlay
            loop
            muted
            poster="/images/wizards-loading-poster.webp"
            className="mb-7 h-auto w-full rounded-lg object-cover lg:mb-2"
          >
            <source
              type="video/webm"
              src="/videos/loading/wizards-loading.webm"
            />
            <source
              type="video/mp4"
              src="/videos/loading/wizards-loading.mp4"
            />
            <img
              src="/images/wizards-loading-poster.webp"
              alt="loading poster"
            />
          </video>

          <p className="-mt-1 flex -translate-y-8 items-center gap-2 text-xs font-bold text-[#FFD702] opacity-90 lg:text-lg">
            {/* {texts[current]} */}
            Generating emojis
            <span>{`${((progress / total) * 100).toFixed(0)}%`}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
