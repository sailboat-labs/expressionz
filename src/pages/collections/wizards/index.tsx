import Drawer from "@/components/gallery/Drawer";

import WizardsFilterTraits from "@/components/gallery/wizards/WizardsFilterTraits";
import WizardsGallery from "@/components/gallery/wizards/WizardsGallery";
import BaseLayout from "@/components/shared/BaseLayout";
import Seo from "@/components/shared/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Seo title="TWOO" />
      <img
        src="/images/background.webp"
        className="fixed z-[1] h-screen w-screen object-cover"
      />
      <BaseLayout
        hideFooter
        variant="flexed-minimized"
        childrenClass="md:h-[calc(100vh-64px)] !font-pixelify-r"
        logo={
          <Link
            href="/collections"
            className="flex items-center gap-2 text-base font-semibold"
          >
            <img
              src="/images/logos/twoo-logo.png"
              className="ml-2 h-12 w-12 rounded-full "
              alt="moon bird logo"
            />
            Wizards
          </Link>
        }
      >
        <div className="font-pixelify relative z-[2] flex w-full">
          <div className="z-[2] w-full gap-10 md:flex md:flex-row">
            <div className="flex h-fit flex-col gap-5 overflow-hidden px-5 pb-5 md:h-[calc(100vh-64px)]">
              <div className="mt-3 flex items-center  text-white">
                <Drawer text="" />

                {/* <Link
                href="/collections"
                className="flex h-full items-center gap-2 font-semibold md:text-2xl"
              >
                <img
                  src="/images/logos/twoo-logo.png"
                  className="ml-2 h-12 w-12 rounded-full md:h-20 md:w-20"
                  alt="wizards logo"
                />
                The Wizards of Ord
              </Link> */}
              </div>
              <div className="h-full w-full rounded-lg p-4 md:w-96">
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
                <div className="mt-5 hidden md:block">
                  <WizardsFilterTraits />
                </div>
              </div>
            </div>

            <WizardsGallery />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
