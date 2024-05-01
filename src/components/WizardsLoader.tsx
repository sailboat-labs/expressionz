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
      className={`${
        show ? "left-0 top-0 z-9999 flex" : "z-0 hidden"
      } fixed h-screen w-screen bg-black bg-opacity-80`}
    >
      <div className="flex h-full w-full items-center justify-center space-y-5">
        <div className="relative flex h-2/5 w-11/12 flex-col items-center justify-center rounded-lg bg-[#3C3C3C] md:h-1/2 lg:h-1/2 lg:w-4/5 lg:bg-transparent lg:px-6 xl:w-1/2">
          <video
            playsInline
            autoPlay
            loop
            muted
            poster="/images/wizards-loading-poster.webp"
            className="mb-7 h-auto rounded-lg object-cover lg:mb-2"
          >
            <source type="video/webm" src="/videos/wizards-loading.webm" />
            <source type="video/mp4" src="/videos/wizards-loading.mp4" />
          </video>
          <div className="absolute bottom-6 flex w-full items-center justify-center lg:bottom-10">
            <img
              src="/images/loading-logo.webp"
              alt="loading logo"
              className="mr-2 h-5 w-auto object-contain lg:mr-4 lg:h-8"
            />
            <p className="text-xs font-bold text-[#FFD702] opacity-90 lg:text-lg">
              {/* {texts[current]} */}
              Generating
              <span>{`${((progress / total) * 100).toFixed(0)}%`}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
