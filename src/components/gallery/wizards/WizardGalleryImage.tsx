import { useEffect, useState } from "react";

import { GALLERY } from "@/data/gallery";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Image from "next/image";

export default function GalleryImage({
  wizard,
  index,
}: {
  wizard: (typeof GALLERY)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function openModal() {
    setIsOpen(true);
  }

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
    <div className="z-[2] flex h-screen w-screen items-center justify-center">
      {/* Desktop */}
      <div className="fixed inset-0 hidden scale-90 items-center justify-center overflow-y-auto md:flex">
        <div className=" hidden h-screen w-[80rem] transform flex-col-reverse items-center justify-center gap-3 overflow-hidden rounded p-3 text-left align-middle transition-all md:flex">
          <Image
            src={`/images/desktop_wizard_background.webp`}
            className="absolute h-[40vw] w-[40vw] rounded-t-md md:h-full md:w-full"
            height={2000}
            width={2000}
            alt="Wizard Background"
            priority
          />
          <div className="z-[2] -mt-10 flex h-[70%] w-[80%] md:-mt-20">
            <div className="h-full w-full flex-1">
              <div className="z-[2] flex flex-col gap-5 md:flex-row">
                <div className="flex w-full flex-col items-center justify-center gap-5">
                  <div className="flex w-full flex-col items-center justify-center gap-5 pt-5">
                    <div className="font-semibold md:text-xl xl:text-3xl">
                      Wizard #{index}
                    </div>
                    <img
                      src={`/images/gallery/${index}.webp`}
                      className="h-[20vw]  w-[20vw] rounded"
                    />
                    <div className="mt-5 md:mt-0">
                      <div>Inscription ID</div>
                      <div className="flex gap-2">
                        <div className="hidden text-xs font-bold uppercase md:block">{`#${wizard.id.slice(
                          0,
                          20,
                        )}...${wizard.id.slice(
                          wizard.id.length - 5,
                          wizard.id.length,
                        )}`}</div>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(wizard.id);
                          }}
                          className="w-fit cursor-pointer rounded-md border border-orange-200 bg-orange-100 px-2 text-xs text-orange-500 transition-all hover:bg-blue-200"
                        >
                          Copy
                        </div>
                      </div>
                    </div>

                    <div className="mb-5 mt-0 flex flex-col gap-5 md:flex md:gap-2 lg:flex-row">
                      <div
                        onClick={() => {
                          download(`/images/gallery/${index}.webp`);
                        }}
                        className="w-fit cursor-pointer rounded-md border border-blue-200 bg-blue-100 px-2 py-1 text-blue-500 transition-all hover:bg-blue-200"
                      >
                        Download PFP
                      </div>
                      <div
                        onClick={() => {
                          alert("Coming soon");
                        }}
                        className="w-fit cursor-pointer rounded-md border border-blue-200 bg-blue-100 px-2 py-1 text-blue-500 transition-all hover:bg-blue-200"
                      >
                        Expressionz
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-full w-full flex-1">
              <div className="mt-5 flex flex-col gap-2 px-10">
                <div className="z-[2] mb-3 flex h-fit items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => {
                        window.open(
                          `https://ordinals.com/inscription/${wizard.id}`,
                          "_blank",
                        );
                      }}
                      className="cursor-pointer rounded-full border-2 border-black p-1"
                    >
                      <div className="h-5 w-5 rounded-full bg-black"></div>
                    </div>
                    <img
                      onClick={() => {
                        window.open(
                          `https://magiceden.io/ordinals/item-details/${wizard.id}`,
                          "_blank",
                        );
                      }}
                      className="h-8 w-8 cursor-pointer rounded-md"
                      src="/images/MELOGO.png"
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://twoo.expressionz.xyz/${wizard.id}`,
                        );
                        toast.success("Copied link to clipboard");
                      }}
                      className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                    >
                      <ion-icon name="share-social"></ion-icon>
                    </div>
                    <div
                      onClick={() => {
                        router.replace("/");
                      }}
                      className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                    >
                      <ion-icon name="close"></ion-icon>
                    </div>
                  </div>
                </div>
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
                      <div className="font-bold">{attribute.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="fixed inset-0 block scale-95 overflow-y-hidden md:hidden">
        <div className="flex h-[100vh] w-full transform flex-col items-center justify-center gap-3 overflow-auto rounded p-3 text-left align-middle transition-all md:hidden">
          <Image
            src={`/images/mobile_wizard_background.webp`}
            className="absolute h-full w-full rounded-t-md md:h-full md:w-full"
            height={2000}
            width={2000}
            alt="Wizard Background"
            priority
          />

          <div className="z-[2] h-[75%] w-[75vw] overflow-auto">
            <div className="z-[2] mt-5 flex h-fit items-center justify-between gap-3 px-10">
              <div className="flex gap-3">
                <div
                  onClick={() => {
                    window.open(
                      `https://ordinals.com/inscription/${wizard.id}`,
                      "_blank",
                    );
                  }}
                  className="cursor-pointer rounded-full border-2 border-black p-1"
                >
                  <div className="h-5 w-5 rounded-full bg-black"></div>
                </div>
                <img
                  onClick={() => {
                    window.open(
                      `https://magiceden.io/ordinals/item-details/${wizard.id}`,
                      "_blank",
                    );
                  }}
                  className="h-8 w-8 cursor-pointer rounded-md"
                  src="/images/MELOGO.png"
                />
              </div>

              <div className="flex items-center gap-5">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://twoo.expressionz.xyz/${wizard.id}`,
                    );
                    toast.success("Copied link to clipboard");
                  }}
                  className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                >
                  <ion-icon name="share-social"></ion-icon>
                </div>
                <div
                  onClick={() => {
                    router.replace("/");
                  }}
                  className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
                >
                  <ion-icon name="close"></ion-icon>
                </div>
              </div>
            </div>
            <div className="z-[2] mt-4  flex flex-col">
              <div className="flex h-full w-full flex-col items-center justify-center  gap-5">
                <div className="flex h-full w-full flex-col items-center  gap-5">
                  <div className="mt-0 text-xl font-semibold">
                    Wizard #{index}
                  </div>
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <img
                      src={`/images/gallery/${index}.webp`}
                      className="h-[40vw] w-[40vw] rounded"
                    />
                    <div className=" md:mt-0">
                      <div>Inscription ID</div>
                      <div className="flex items-center gap-2">
                        <div className=" text-xs font-bold uppercase md:block">{`#${wizard.id.slice(
                          0,
                          10,
                        )}...${wizard.id.slice(
                          wizard.id.length - 5,
                          wizard.id.length,
                        )}`}</div>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(wizard.id);
                          }}
                          className="w-fit cursor-pointer rounded-md border border-orange-200 bg-orange-100 px-2 text-xs text-orange-500 transition-all hover:bg-blue-200"
                        >
                          Copy
                        </div>
                      </div>
                    </div>

                    <div className=" mt-0 flex gap-5 ">
                      <div
                        onClick={() => {
                          download(`/images/gallery/${index}.webp`);
                        }}
                        className="w-fit cursor-pointer rounded-md border border-blue-200 bg-blue-100 px-2 py-1 text-blue-500 transition-all hover:bg-blue-200"
                      >
                        Download PFP
                      </div>
                      <div
                        onClick={() => {
                          alert("Coming soon");
                        }}
                        className="w-fit cursor-pointer rounded-md border border-blue-200 bg-blue-100 px-2 py-1 text-blue-500 transition-all hover:bg-blue-200"
                      >
                        Expressionz
                      </div>
                    </div>
                    <div className=" h-full w-full flex-1">
                      <div className="flex flex-col gap-2 px-2">
                        {wizard.meta.attributes.map((attribute, index) => (
                          <div
                            key={attribute.trait_type}
                            className="flex gap-2 rounded-md bg-white bg-opacity-40 p-2"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                              <img
                                src={`/images/attribute-icons/${attribute.trait_type}.webp`}
                                className="h-6 w-6 object-contain"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="text-xs">
                                {attribute.trait_type}
                              </div>
                              <div className="text-sm font-semibold">
                                {attribute.value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
