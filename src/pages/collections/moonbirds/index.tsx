import Drawer from "@/components/gallery/Drawer";
import MoonBirdsFilterTraits from "@/components/gallery/moonbirds/MoonBirdsFilterTraits";
import MoonbirdsGallery from "@/components/gallery/moonbirds/MoonbirdsGallery";
import BaseLayout from "@/components/shared/BaseLayout";

import Seo from "@/components/shared/Seo";
import { cn } from "@/lib/misc.lib";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Seo title="Moonbirds Collection" />
      <BaseLayout
        hideFooter
        variant="flexed-minimized"
        childrenClass="max-h-[calc(100vh-64px)] overflow-y-auto"
        wrapperClass=" bg-dark"
        logo={
          <Link
            href="/collections"
            className="flex items-center gap-2 text-base font-semibold"
          >
            <img
              src="/images/moonbirds-logo.webp"
              className="ml-2 h-12 w-12 rounded-full "
              alt="moon bird logo"
            />
            Moonbirds
          </Link>
        }
      >
        {/* <img
        src="/images/background.webp"
        className="fixed z-[1] h-screen w-screen object-cover"
        alt="pixilated night time image"
      /> */}

        <div className="relative z-[2] flex w-full font-pixelify-r">
          <div className="z-[2] w-full gap-10 md:flex md:flex-row">
            <div className="flex h-fit flex-col gap-5 overflow-hidden md:h-[calc(100vh-64px)] md:px-5 md:pb-5">
              <div
                className={cn(
                  "w-full rounded-lg p-4 md:w-96",
                  "flex items-center gap-4 md:flex-col md:items-start",
                  "sticky top-0 md:mt-3",
                )}
              >
                <Drawer
                  text="Moonbirds"
                  theme="purple"
                  filterBox={<MoonBirdsFilterTraits />}
                />
                <input
                  value={router.query.search as string}
                  placeholder="Search for index..."
                  className="w-full rounded-md border border-gray-200 px-5"
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
                <MoonBirdsFilterTraits />
              </div>
            </div>

            <MoonbirdsGallery />
          </div>
        </div>
        {/* <div className="flex w-full font-pixelify-r">
          <div className=" w-full gap-10 md:flex md:flex-row">
            <div className="pb-5 md:h-[calc(100vh-64px)] md:overflow-hidden md:px-5">
              <div className="h-full w-full rounded-lg p-4 md:w-96">
                <div className="sticky top-0 flex items-center gap-4 text-white md:mt-5">
                  <Drawer
                    text="Moonbirds"
                    filterBox={<MoonBirdsFilterTraits />}
                    theme="purple"
                  />
                  <input
                    value={router.query.search as string}
                    placeholder="Search for index..."
                    className="flex-1 rounded-md border border-gray-200 px-5 text-black"
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

                <div className="mt-5 hidden flex-1 px-4 md:block">
                  <MoonBirdsFilterTraits />
                </div>
              </div>
            </div>

            <MoonbirdsGallery />
          </div>
        </div> */}
      </BaseLayout>
    </>
  );
}
