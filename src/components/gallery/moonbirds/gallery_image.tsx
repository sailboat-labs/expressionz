import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

import { METADATA } from "@/data/metadata";

export default function MoonbirdGalleryImage({
  moonbird,
  index,
}: {
  moonbird: (typeof METADATA)[0];
  index: number;
}) {
  const router = useRouter();

  function closeModal() {
    router.push("/moonbirds");
  }

  async function download(path: string) {
    const response = await fetch(path);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `moonbird_${index}.webp`;
    link.click();
    URL.revokeObjectURL(url);
  }

  //On click escape, go to homescreen
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.replace("/");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <div className="z-[2] flex h-screen w-screen items-center justify-center">
        {/* Desktop */}
        <div className="fixed inset-0 hidden scale-90 items-center justify-center overflow-y-auto text-white md:flex">
          <div className=" hidden h-screen w-[80rem] transform flex-col-reverse items-center justify-center gap-3 overflow-hidden rounded p-3 text-left align-middle transition-all md:flex">
            <Image
              src="/images/Big-Frame.webp"
              className="absolute h-[40vw] w-[40vw] rounded-t-md md:h-full md:w-full"
              height={2000}
              width={2000}
              alt="Background"
              priority
              loading="eager"
            />
            <div className="z-[2] -mt-10 flex h-[70%] w-[80%] md:-mt-20">
              <div className="mr-16 h-full w-full flex-1">
                <div className="z-[2] mr-5 flex flex-col gap-5 md:flex-row">
                  <div className="flex w-full flex-col items-center justify-center gap-5">
                    <div className="flex w-full flex-col items-center justify-center gap-5 pt-5">
                      <h1 className="font-semibold  md:text-xl xl:text-3xl">
                        Moonbird #{index + 1}
                      </h1>
                      <div className="relative flex h-[21vw] w-[21vw] items-center justify-center">
                        <img
                          src={`/images/moonbirds/tokens/${index}.png`}
                          className=" h-[18vw] w-[18vw] rounded"
                        />
                        <img
                          src="/images/frame.webp"
                          className="absolute top-0 rounded"
                        />
                      </div>
                      <div className="mb-5 mt-2 flex flex-col items-center gap-5 md:flex md:gap-4">
                        <div
                          onClick={() => {
                            download(`/images/moonbirds/tokens/${index}.png`);
                          }}
                          className="w-fit cursor-pointer"
                        >
                          <img
                            src="/images/buttons/download_pfp.webp"
                            className="w-40"
                          />
                        </div>
                        <div
                          className="w-fit cursor-pointer"
                          onClick={() => {
                            router.push(`${moonbird.id}/generated`);
                          }}
                        >
                          <img
                            src="/images/buttons/generate-btn.webp"
                            className="w-48"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" h-full w-full flex-1">
                <div className="mt-5  flex flex-col gap-2 pr-5">
                  <div className="z-[2] mb-3 flex h-fit items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold  md:text-lg xl:text-2xl">
                        Traits
                      </span>
                      <div className="flex items-center gap-4">
                        {/* <img
                        onClick={() => {
                          window.open(
                            `https://proof.xyz/moonbirds/${moonbird.id}`,
                            "_blank",
                          );
                        }}
                        className="-mr-2 h-8 w-8 cursor-pointer rounded-md"
                        src="/images/proof-xyz-logo.webp"
                      />
                      <img
                        onClick={() => {
                          window.open(
                            `https://magiceden.io/item-details/ethereum/0x23581767a106ae21c074b2276D25e5C3e136a68b/${moonbird.id}`,
                            "_blank",
                          );
                        }}
                        className="-mr-1 h-8 w-8 cursor-pointer rounded-md"
                        src="/images/melogo.webp"
                      /> */}
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
                          onClick={() => {
                            closeModal();
                          }}
                          className="ml-1 flex h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-violet-700 bg-violet-200 text-violet-700"
                        >
                          <ion-icon name="close"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 ">
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
                    <div className="font-bold text-[#3E1600]">
                      Inscription ID
                    </div>
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
        </div>

        {/* Mobile */}
        <div className="fixed inset-0 block scale-95 overflow-y-hidden md:hidden">
          <div className="relative flex h-[100vh] w-full transform flex-col items-center justify-center gap-3 overflow-auto rounded p-3 text-left align-middle transition-all md:hidden">
            <Image
              src="/images/scroll.webp"
              className="absolute h-full w-full rounded-t-md md:h-full md:w-full"
              height={1000}
              width={1000}
              alt="moonbird Background"
              onLoad={() => {
                console.log("loaded");
                // toast.success('loaded')
              }}
              loading="eager"
              priority
            />

            <div className="z-2 absolute top-6 flex w-4/5 items-center justify-between px-3">
              <div className="mt-0 text-xl font-semibold text-[#3E1600]">
                Moonbird #{index}
              </div>
              <div className="flex items-center gap-5">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${router.basePath}/moonbirds/${moonbird.id}`,
                    );
                    toast.success("Copied link to clipboard");
                  }}
                  className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                >
                  <ion-icon name="share-social"></ion-icon>
                </div>
                <div
                  onClick={() => {
                    closeModal();
                  }}
                  className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                >
                  <ion-icon name="close"></ion-icon>
                </div>
              </div>
            </div>

            <div className="absolute z-[2] h-[70vh] w-[75vw] overflow-auto">
              {/* moonbird */}
              <div className="flex flex-col items-center">
                <div className="relative flex h-[50vw] w-[50vw] items-center justify-center">
                  <img
                    src={`/images/moonbirds/tokens/${index}.png`}
                    className="h-[45vw] w-[45vw] rounded"
                  />
                  <img
                    src="/images/frame.webp"
                    className="absolute top-0 rounded"
                  />
                </div>
                <div className="mb-5 mt-10 flex flex-col items-center gap-5 md:flex md:gap-4">
                  <div
                    onClick={() => {
                      download(`/images/moonbirds/tokens/${index}.png`);
                    }}
                    className="w-fit cursor-pointer"
                  >
                    <img
                      src="/images/buttons/download_pfp.webp"
                      className="w-36"
                    />
                  </div>
                  <div
                    className="w-fit cursor-pointer"
                    onClick={() => {
                      router.push(`${moonbird.id}/generated`);
                    }}
                  >
                    <img
                      src="/images/buttons/generate-btn.webp"
                      className="w-44"
                    />
                  </div>
                </div>
              </div>

              {/* Traits */}
              <div className="mt-5 flex flex-col gap-2 px-5 ">
                <div className="z-[2] mb-3 flex h-fit items-center justify-between gap-3 text-[#3E1600]">
                  <div className="flex w-full items-center justify-between">
                    <span className="font-bold ">Traits</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
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
              </div>

              {/* Inscription ID */}
              <div className="mt-5 hidden px-5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold ">Inscription ID</span>
                  <div className="flex gap-3">
                    <img
                      onClick={() => {
                        window.open(
                          `https://proof.xyz/moonbirds/${moonbird.id}`,
                          "_blank",
                        );
                      }}
                      className="-mr-2 h-8 w-8 cursor-pointer rounded-md"
                      src="/images/proof-xyz-logo.webp"
                    />
                    <img
                      onClick={() => {
                        window.open(
                          `https://proof.xyz/moonbirds/${moonbird.id}`,
                          "_blank",
                        );
                      }}
                      className="h-8 w-8 cursor-pointer rounded-md"
                      src="/images/melogo.webp"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
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
                  <div className="block text-xs font-semibold uppercase  md:hidden">{`#${moonbird.id.slice(
                    0,
                    15,
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
    </>
  );
}
