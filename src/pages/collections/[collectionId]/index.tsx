import Drawer from "@/components/gallery/Drawer";
import BaseLayout from "@/components/shared/BaseLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { cn } from "@/lib/misc.lib";
import { getCollectionInfo } from "@/data/collections/getData";
import { useEffect, useState } from "react";
import FilterTraits from "@/components/gallery/filter_traits";
import Gallery from "@/components/gallery/Gallery";

export default function GalleryPage() {
  const router = useRouter();
  const { collectionId } = router.query;

  const [collectionInfo, setCollectionInfo] = useState<any>();

  useEffect(() => {
    if (!collectionId) return;

    const _collectionInfo = getCollectionInfo(collectionId as string);
    setCollectionInfo(_collectionInfo);
  }, [collectionId]);

  if (!collectionInfo)
    return (
      <>
        <Head>
          <title>Collection</title>
        </Head>
        <div className="h-screen w-screen bg-gray-700 py-24 text-center text-white">
          Loading...
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>{collectionInfo.title}</title>
      </Head>
      <img
        src={collectionInfo.background}
        className="fixed z-[1] h-screen w-screen object-cover"
      />
      <BaseLayout
        hideFooter
        variant="logo"
        childrenClass="md:h-[calc(100vh-64px)] !font-pixelify-r"
        logo={
          <span className="flex items-center gap-2 text-base font-semibold">
            <img
              src={`/images/collections/${collectionInfo.collectionId}/logo.webp`}
              className="h-10 w-10 rounded-full md:h-12 md:w-12 "
              alt="collection logo"
            />
            {collectionInfo.collectionName}
          </span>
        }
      >
        <div className="relative z-[2] flex w-full font-pixelify-r">
          <div className="z-[2] w-full gap-5 md:flex md:flex-row lg:gap-10">
            <div className="flex h-fit flex-col gap-5 overflow-hidden md:h-[calc(100vh-64px)] md:pb-5">
              <div
                className={cn(
                  "w-full rounded-lg p-4 md:w-72 lg:w-96",
                  "flex items-center gap-4 md:flex-col md:items-start",
                  "md:mt-3",
                )}
              >
                <Drawer
                  text={collectionInfo.collectionName}
                  logo={collectionInfo.logo}
                  filterBox={
                    <FilterTraits
                      collection={collectionId as string}
                      filterTraits={collectionInfo.filterTraits}
                    />
                  }
                />
                <input
                  value={router.query.search as string}
                  placeholder="Search for index..."
                  className="w-full rounded-md border border-gray-200 px-5 text-black"
                  onChange={(e) => {
                    const search = e.target.value;
                    const urlParams = new URLSearchParams(
                      window.location.search,
                    );
                    if (search) {
                      urlParams.set("search", search);
                    } else {
                      urlParams.delete("search");
                    }

                    router.replace(
                      { search: urlParams.toString() },
                      undefined,
                      {
                        scroll: false,
                      },
                    );
                  }}
                />
              </div>
              <div className="hidden flex-1 px-4 md:block">
                <FilterTraits
                  collection={collectionId as string}
                  filterTraits={collectionInfo.filterTraits}
                  theme={collectionInfo.theme}
                />
              </div>
            </div>

            <Gallery
              collection={collectionId as string}
              imageType={collectionInfo.imageType}
              data={collectionInfo.gallery}
              theme={collectionInfo.theme}
              showMagicEden={collectionInfo.showMagicEden}
              showOrdinals={collectionInfo.showOrdinals}
              showTokenNumber={collectionInfo.showTokenNumber}
            />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
