import { useRouter } from "next/router";
import { METADATA } from "@/data/metadata";
import Seo from "@/components/shared/Seo";
import MoonbirdDetailsFrame from "@/components/gallery/moonbirds/MoonbirdDetailsFrame";
import { toast } from "sonner";
import React, { useMemo } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import ThemedIconButton from "@/components/shared/ThemedIconButton";
import Link from "next/link";
import BaseLayout from "@/components/shared/BaseLayout";
import { cn } from "@/lib/misc.lib";

export default function MoonbirdPage() {
  const router = useRouter();

  const { tokenId } = router.query;
  const moonbird = useMemo(
    () => METADATA.find((m) => m.id === tokenId),
    [tokenId],
  );

  async function download(path: string) {
    const response = await fetch(path);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `moonbird_${index + 1}.webp`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const index = Number(moonbird?.meta?.name?.split("#")[1]);

  if (!moonbird) return null;

  return (
    <>
      <Seo title={`Moonbird ${index}`} />
      <BaseLayout
        hideFooter
        variant="flexed-minimized"
        childrenClass="md:h-[calc(100vh-64px)]"
        wrapperClass="bg-dark"
        logo={
          <Link
            href={`/collections/moonbirds`}
            className="flex items-center gap-2 text-base font-semibold"
          >
            <img
              src="/images/collections/moonbirds/logo.webp"
              className="ml-2 h-12 w-12 rounded-full "
              alt="moon bird logo"
            />
            Moonbirds
          </Link>
        }
      >
        <MoonbirdDetailsFrame>
          {[
            <React.Fragment key="left-item">
              {/* LEFT CONTENT */}
              <div className="flex w-full flex-col items-center justify-center gap-5 lg:pt-5">
                <div className="flex w-full flex-1 items-center justify-between ">
                  <ThemedIconButton
                    className="text-2xl font-semibold"
                    onClick={() => router.replace(`/collections/moonbirds`)}
                    variant="violet"
                    icon={<ArrowLeftIcon className="h-6 w-6 rounded" />}
                  />
                  <h1 className="flex-1 text-center font-pixelify-b text-white md:text-xl xl:text-3xl">
                    Moonbird #{index + 1}
                  </h1>

                  <div className="flex items-center gap-2 lg:hidden">
                    <ThemedIconButton
                      className="text-2xl font-semibold"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/collections/moonbirds/${moonbird.id}`,
                        );
                        toast.success("Copied link to clipboard");
                      }}
                      variant="violet"
                      icon={<ion-icon name="share-social"></ion-icon>}
                    />
                    <ThemedIconButton
                      className="text-2xl font-semibold"
                      onClick={() => router.replace("/collections/moonbirds")}
                      variant="violet"
                      icon={<ion-icon name="close"></ion-icon>}
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    " relative mt-4 flex items-center justify-center",
                    "h-[320px] max-h-[450px] w-[320px] max-w-[450px]  lg:h-[21vw] lg:w-[21vw]",
                  )}
                >
                  <img
                    src={`/images/collections/moonbirds/tokens/${index}.png`}
                    className="absolute inset-0 h-full w-full scale-90"
                  />
                  <img
                    src="/images/collections/moonbirds/token-frame.webp"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="mb-5 mt-2 flex flex-col items-center gap-5 md:flex md:gap-4">
                  <button
                    onClick={() => {
                      download(`/images/moonbirds/tokens/${index}.png`);
                    }}
                    className="w-fit cursor-pointer"
                  >
                    <img
                      src="/images/buttons/download_pfp.webp"
                      className="w-48"
                    />
                  </button>
                  <button
                    className="w-fit cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/collections/moonbirds/${moonbird?.id}/generated`,
                      );
                    }}
                  >
                    <img
                      src="/images/buttons/expressionz_active.webp"
                      // src="/images/generate-btn.webp"
                      className="w-48"
                    />
                  </button>
                </div>
              </div>
            </React.Fragment>,
            <React.Fragment key="right-item">
              {/* RIGHT CONTENT */}
              <div className="mt-5  flex flex-col gap-2 font-pixelify-r sm:pr-5">
                <div className="z-[2] mb-3 flex h-fit items-center justify-between">
                  <div className="flex w-full items-center justify-between">
                    <span className="font-pixelify-b  text-white  md:text-lg xl:text-2xl">
                      Traits
                    </span>
                    <div className="mt-4 hidden items-center gap-1.5 lg:flex">
                      <ThemedIconButton
                        className="text-2xl font-semibold"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/collections/moonbirds/${moonbird.id}`,
                          );
                          toast.success("Copied link to clipboard");
                        }}
                        variant="violet"
                        icon={<ion-icon name="share-social"></ion-icon>}
                      />
                      <ThemedIconButton
                        className="text-2xl font-semibold"
                        onClick={() => router.replace("/collections/moonbirds")}
                        variant="violet"
                        icon={<ion-icon name="close"></ion-icon>}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 ">
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

                      <div className="flex-1 text-white">
                        <div>{attribute.trait_type}</div>
                        <div className="font-bold">{attribute.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 hidden">
                  <div className="font-bold text-white">Inscription ID</div>
                  <div className="mt-1 flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(moonbird.id);
                        toast.success("Copied to clipboard");
                      }}
                      className="w-fit cursor-pointer rounded-md px-2 text-xs text-orange-500 transition-all"
                    >
                      {/* Copy */}
                      <img src="/images/copy.webp" className="h-6 w-6" />
                    </button>
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
            </React.Fragment>,
          ]}
        </MoonbirdDetailsFrame>
      </BaseLayout>
      {/* <main className="min-h-screen bg-dark"></main> */}
    </>
  );
}
