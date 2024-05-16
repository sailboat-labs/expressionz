import Drawer from "@/components/gallery/Drawer";
import MoonBirdsFilterTraits from "@/components/gallery/moonbirds/MoonBirdsFilterTraits";
import MoonbirdsGallery from "@/components/gallery/moonbirds/MoonbirdsGallery";
import BaseLayout from "@/components/shared/BaseLayout";

import Seo from "@/components/shared/Seo";
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
        childrenClass="md:h-[calc(100vh-64px)]"
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
        <div className=" bg-dark">
          {/* <img
        src="/images/background.webp"
        className="fixed z-[1] h-screen w-screen object-cover"
        alt="pixilated night time image"
      /> */}
          <div className="flex w-full font-pixelify-r">
            <div className=" w-full gap-10 md:flex md:flex-row">
              <div className="pb-5 md:h-[calc(100vh-64px)] md:overflow-hidden md:px-5">
                <div className="h-full w-full rounded-lg p-4 md:w-96">
                  <div className="flex items-center gap-4 text-white md:mt-5">
                    <Drawer text="Moonbirds" />
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

                  <div className="mt-5 hidden md:block">
                    <MoonBirdsFilterTraits />
                  </div>
                </div>
              </div>

              <MoonbirdsGallery />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
