import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { IoCopyOutline } from "react-icons/io5";

import { GALLERY } from "@/data/gallery";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/misc.lib";
import ScrollTokenFrame from "@/components/shared/ScrollTokenFrame";

export default function GalleryImage({
  wizard,
  index,
}: {
  wizard: (typeof GALLERY)[0];
  index: number;
}) {
  const router = useRouter();

  async function download(path: string) {
    const response = await fetch(path);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wizard_${index}.webp`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function goToPreviousPage() {
    router.replace(`/collections/wizards/`);
  }

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.replace("/collections/wizards");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="z-[2] mt-1 flex h-[calc(100vh-64px)] w-screen items-center justify-center font-pixelify-r  text-black">
      {/* Desktop */}
      <div className=" inset-0 hidden scale-90 items-center justify-center overflow-y-auto lg:flex">
        <div className=" hidden h-screen w-[80rem] transform flex-col-reverse items-center justify-center gap-3 overflow-hidden rounded p-3 text-left align-middle transition-all md:flex">
          <Image
            src="/images/collections/wizards/desktop-bg.webp"
            className="absolute h-[40vw] w-[40vw] rounded-t-md md:h-full md:w-full"
            height={2000}
            width={2000}
            alt="Wizard Background"
            priority
            loading="eager"
          />
          <div className="z-[2] -mt-10 flex h-[70%] w-[80%] md:-mt-20">
            <div className="mr-16 h-full w-full flex-1">
              <div className="z-[2] mr-5 flex flex-col gap-5 md:flex-row">
                <div className="flex w-full flex-col items-center justify-center gap-5">
                  <div className="flex w-full flex-col items-center justify-center gap-5 pt-5">
                    <div className="relative ml-12 flex items-center gap-4 self-stretch">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }}
                        className="absolute left-0 top-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-[#C1410B] text-[#C1410B]"
                        onClick={() => goToPreviousPage()}
                      >
                        <ArrowLeftIcon className="h-6 w-6 rounded" />
                      </motion.button>
                      <div className="flex-1 text-center font-pixelify-b md:text-xl xl:text-3xl">
                        Wizard #{index}
                      </div>
                    </div>

                    <div className="relative flex h-[18vw] w-[18vw] items-center justify-center">
                      <img
                        src={`/images/collections/wizards/tokens/${index}.webp`}
                        className=" h-[15vw] w-[15vw] rounded"
                      />
                      <img
                        src="/images/collections/wizards/token-frame.webp"
                        className="absolute top-0 rounded"
                      />
                    </div>
                    <div className="mb-5 mt-2 flex flex-col items-center gap-5 md:flex md:gap-4">
                      <button
                        onClick={() => {
                          download(
                            `/images/collection/wizards/tokens/${index}.webp`,
                          );
                        }}
                        className="w-fit cursor-pointer"
                      >
                        <img src="/images/download_pfp.webp" className="w-48" />
                      </button>
                      <button
                        className="w-fit cursor-pointer"
                        onClick={() => {
                          router.push(
                            `/collections/wizards/${wizard.id}/generated`,
                          );
                        }}
                      >
                        <img
                          src="/images/buttons/generate-btn.webp"
                          className="w-48"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" -ml-4 h-full w-full flex-1">
              <div className="mt-10 flex flex-col gap-2 pr-5 lg:mt-6">
                <div className="z-[2] mb-3 flex h-fit items-center justify-between">
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-pixelify-b font-bold  text-[#3E1600]  md:text-lg xl:text-2xl">
                      Traits
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          window.open(
                            `https://ordinals.com/inscription/${wizard.id}`,
                            "_blank",
                          );
                        }}
                        className="-mr-2 cursor-pointer rounded-full border-2 border-black p-1"
                      >
                        <div className="h-5 w-5 rounded-full bg-black"></div>
                      </button>
                      <button
                        className="h-fit w-fit"
                        onClick={() => {
                          window.open(
                            `https://magiceden.io/ordinals/item-details/${wizard.id}`,
                            "_blank",
                          );
                        }}
                      >
                        <img
                          className="h-8 w-8 cursor-pointer rounded-md"
                          src="/images/melogo.webp"
                        />
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://twoo.expressionz.xyz/?id=${wizard.id}`,
                          );
                          toast.success("Copied link to clipboard");
                        }}
                        className="flex h-5 w-5 scale-150 cursor-pointer items-center justify-center rounded border border-orange-700 bg-orange-200 text-orange-700"
                      >
                        <ion-icon name="share-social"></ion-icon>
                      </button>
                      <button
                        onClick={() => goToPreviousPage()}
                        className="ml-1 flex h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {wizard.meta.attributes.map((attribute, index) => (
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
                        <div className={cn("font-pixelify-b font-bold")}>
                          {attribute.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <div className="font-pixelify-b font-bold text-[#3E1600]">
                    Inscription ID
                  </div>

                  <div className="mt-3">
                    <motion.button
                      onClick={() => {
                        navigator.clipboard.writeText(wizard.id);
                        toast.success("Copied to clipboard");
                      }}
                      className={cn(
                        "w-full cursor-pointer rounded-md  text-base transition-all focus:text-orange-800 active:text-orange-800",
                        "mt-3 flex flex-nowrap items-center gap-2",
                      )}
                      whileTap={{
                        scale: 0.8,
                      }}
                    >
                      <IoCopyOutline className="h-5 w-5" />
                      <p className="block  flex-1 truncate uppercase sm:max-w-xs">
                        #{wizard.id}
                      </p>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollTokenFrame
        renderHeaderContent={() => (
          <div className=" flex items-center justify-between px-2">
            <div className="mt-0 text-xl font-semibold">Wizard #{index}</div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/collections/wizards/${wizard.id}`,
                  );
                  toast.success("Copied link to clipboard");
                }}
                className=" flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
              >
                <ion-icon name="share-social"></ion-icon>
              </button>
              <button
                onClick={() => goToPreviousPage()}
                className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
              >
                <ion-icon name="close"></ion-icon>
              </button>
            </div>
          </div>
        )}
        wrapperClass="!h-[calc(100vh-64px)] w-screen lg:hidden"
      >
        <div className="">
          <div className="flex flex-col items-center">
            <div className="relative flex h-[50vw] w-[50vw] items-center justify-center">
              <img
                src={`/images/collections/wizards/tokens/${index}.webp`}
                className="h-[45vw] w-[45vw] rounded"
              />
              <img
                src="/images/collections/wizards/token-frame.webp"
                className="absolute top-0 rounded"
              />
            </div>
            <div className="mb-5 mt-10 flex flex-col items-center gap-5 md:flex md:gap-4">
              <button
                onClick={() => {
                  download(`/images/collections/wizards/tokens/${index}.webp`);
                }}
                className="w-fit cursor-pointer"
              >
                <img src="/images/download_pfp.webp" className="w-44" />
              </button>
              <button
                className="w-fit cursor-pointer"
                onClick={() => {
                  router.push(`${wizard.id}/generated`);
                }}
              >
                <img
                  src="/images/collections/wizards/generate-btn.webp"
                  className="w-44"
                />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <div className="z-[2] mb-3 flex h-fit items-center justify-between gap-3">
              <div className="flex w-full items-center justify-between">
                <span className="text-xl font-bold text-[#3E1600]">Traits</span>
              </div>
            </div>
            <div className="grid  gap-2">
              {wizard.meta.attributes.map((attribute, index) => (
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
                    <div className={cn("")}>{attribute.trait_type}</div>
                    <div className=" font-bold">{attribute.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Inscription ID</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    window.open(
                      `https://ordinals.com/inscription/${wizard.id}`,
                      "_blank",
                    );
                  }}
                  className="cursor-pointer rounded-full border-2 border-black p-1"
                >
                  <div className="h-5 w-5 rounded-full bg-black"></div>
                </button>
                <button
                  className="h-fit w-fit"
                  onClick={() => {
                    window.open(
                      `https://magiceden.io/ordinals/item-details/${wizard.id}`,
                      "_blank",
                    );
                  }}
                >
                  <img
                    className="h-8 w-8 cursor-pointer rounded-md"
                    src="/images/melogo.webp"
                  />
                </button>
              </div>
            </div>
            <div className="mt-3">
              <motion.button
                onClick={() => {
                  navigator.clipboard.writeText(wizard.id);
                  toast.success("Copied to clipboard");
                }}
                className={cn(
                  "w-full cursor-pointer rounded-md  text-base transition-all active:text-orange-800",
                  "mt-3 flex flex-nowrap items-center gap-2",
                )}
                whileTap={{
                  scale: 0.8,
                }}
              >
                <IoCopyOutline className="h-5 w-5" />
                <p className="block  flex-1 truncate uppercase sm:max-w-lg">
                  #{wizard.id}
                </p>
              </motion.button>
            </div>
          </div>
        </div>
      </ScrollTokenFrame>
    </div>
  );
}
