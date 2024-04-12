import { METADATA } from "@/data/metadata";
import { toast } from "sonner";

const DummyPage = () => {
  const moonbird = METADATA[0];
  return (
    <div className="m-16 flex h-[80vh] flex-col">
      <div className="">
        <div className="flex items-center justify-between border-[10px] border-b-0  border-violet-400 bg-violet-100 p-5 pb-10">
          <h1 className="  font-semibold md:text-xl xl:text-3xl">
            Moonbird #{1}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/moonbirds/${moonbird.id}`,
                );
                toast.success("Copied link to clipboard");
              }}
              className="flex h-5 w-5 scale-150 cursor-pointer items-center justify-center rounded border border-violet-700 bg-violet-200 text-violet-700"
            >
              <ion-icon name="share-social"></ion-icon>
            </button>
            <button
              //   onClick={() => {
              //     closeModal();
              //   }}
              className="ml-1 flex h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-violet-700 bg-violet-200 text-violet-700"
            >
              <ion-icon name="close"></ion-icon>
            </button>
          </div>
        </div>
        <div className="h-8 border-l border-r border-violet-600 bg-violet-300"></div>
      </div>
      <div className="h-full flex-1 overflow-clip border-[10px] border-violet-400">
        <div className=" h-full overflow-y-auto border-[10px] border-violet-200 p-5">
          <div>
            <div className="flex w-full flex-col items-center justify-center gap-5 pt-5">
              <h1 className="hidden  font-semibold md:text-xl lg:block xl:text-3xl">
                Moonbird #{1}
              </h1>
              <div className="relative flex h-[21vw] w-[21vw] items-center justify-center">
                <img
                  src={`/images/moonbirds/tokens/1.png`}
                  className=" h-[45%] w-[45%] rounded"
                />
                <img
                  src="/images/frame.webp"
                  className="absolute top-0 rounded"
                />
              </div>
              <div className="mb-5 mt-2 flex flex-col items-center gap-5 md:flex md:gap-4">
                <div
                  // onClick={() => {
                  //   download(`/images/moonbirds/tokens/${index}.png`);
                  // }}
                  className="w-fit cursor-pointer"
                >
                  <img
                    src="/images/buttons/download_pfp.webp"
                    className="w-40"
                  />
                </div>
                <div
                  className="w-fit cursor-pointer"
                  // onClick={() => {
                  //   router.push(`${moonbird.id}/generated`);
                  // }}
                >
                  <img
                    src="/images/buttons/generate-btn.webp"
                    className="w-48"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-5  flex flex-col gap-2 pr-5">
              <div className="z-[2] mb-3 flex h-fit items-center justify-between">
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold  md:text-lg xl:text-2xl">
                    Traits
                  </span>
                  <div className="hidden items-center gap-4 lg:flex">
                    <button
                      // onClick={() => {
                      //   navigator.clipboard.writeText(
                      //     `${window.location.origin}/moonbirds/${moonbird.id}`,
                      //   );
                      //   toast.success("Copied link to clipboard");
                      // }}
                      className="flex h-5 w-5 scale-150 cursor-pointer items-center justify-center rounded border border-violet-700 bg-violet-200 text-violet-700"
                    >
                      <ion-icon name="share-social"></ion-icon>
                    </button>
                    <button
                      // onClick={() => {
                      //   closeModal();
                      // }}
                      className="ml-1 flex h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-violet-700 bg-violet-200 text-violet-700"
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-2 ">
                {moonbird.meta.attributes.map((attribute, index) => (
                  <div
                    key={attribute.trait_type}
                    className="flex gap-2 rounded-md bg-white bg-opacity-40 p-2"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                      <img
                        src={`/images/attribute-icons/${attribute.trait_type}.webp`}
                        className="h-8 w-8 object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div>{attribute.trait_type}</div>
                      <div className="font-bold">{attribute.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 hidden">
                <div className="font-bold text-[#3E1600]">Inscription ID</div>
                <div className="mt-1 flex gap-2">
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(moonbird.id);
                      toast.success("Copied to clipboard");
                    }}
                    className="w-fit cursor-pointer rounded-md px-2 text-xs text-orange-500 transition-all"
                  >
                    {/* Copy */}
                    <img src="/images/copy.webp" className="h-6 w-6" />
                  </div>
                  <div className="hidden text-lg font-semibold uppercase  md:block">{`#${moonbird.id.slice(
                    0,
                    20,
                  )}...${moonbird.id.slice(
                    moonbird.id.length - 5,
                    moonbird.id.length,
                  )}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DummyPage;
