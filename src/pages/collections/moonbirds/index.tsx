import Drawer from "@/components/gallery/Drawer";
import MoonBirdsFilterTraits from "@/components/gallery/moonbirds/MoonBirdsFilterTraits";
import Gallery from "@/components/gallery/moonbirds/gallery";
import Seo from "@/components/shared/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Seo title="Moonbirds Collection" />
      {/* <img
        src="/images/background.webp"
        className="fixed z-[1] h-screen w-screen object-cover"
        alt="pixilated night time image"
      /> */}
      <div className="font-pixelify flex w-full">
        <div className="z-[2] w-full gap-10 md:flex md:flex-row">
          <div className="flex h-fit flex-col gap-5 overflow-hidden px-5 pb-5 md:h-screen">
            <div className="mt-3 flex items-center gap-2 text-white">
              <Drawer text="Moonbirds" />
              <Link
                href="/collections"
                className="flex items-center gap-2 font-semibold md:text-2xl"
              >
                <img
                  src="/images/moonbirds-logo.webp"
                  className="ml-2 h-12 w-12 rounded-full md:h-20 md:w-20"
                  alt="moon bird logo"
                />
                Moonbirds
              </Link>
            </div>
            <div className="h-full w-full rounded-lg p-4 md:w-96">
              <input
                value={router.query.search as string}
                placeholder="Search for index..."
                className="w-full rounded-md border border-gray-200 px-5 text-black"
                onChange={(e) => {
                  const search = e.target.value;
                  const urlParams = new URLSearchParams(window.location.search);
                  if (search) {
                    urlParams.set("search", search);
                  } else {
                    urlParams.delete("search");
                  }

                  router.replace({ search: urlParams.toString() }, undefined, {
                    scroll: false,
                  });
                }}
              />
              <div className="mt-5 hidden md:block">
                <MoonBirdsFilterTraits />
              </div>
            </div>
          </div>

          <Gallery />
        </div>
      </div>
    </>
  );
}
