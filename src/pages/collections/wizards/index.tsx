import Drawer from "@/components/gallery/Drawer";

import WizardsFilterTraits from "@/components/gallery/wizards/WizardsFilterTraits";
import WizardsGallery from "@/components/gallery/wizards/WizardsGallery";
import BaseLayout from "@/components/shared/BaseLayout";
import Seo from "@/components/shared/Seo";
import { cn } from "@/lib/misc.lib";
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
              className="h-10 w-10 rounded-full md:h-12 md:w-12 "
              alt="moon bird logo"
            />
            Wizards
          </Link>
        }
      >
        <div className="relative z-[2] flex w-full font-pixelify-r">
          <div className="z-[2] w-full gap-5 md:flex md:flex-row lg:gap-10">
            <div className="flex h-fit flex-col gap-5 overflow-hidden md:h-[calc(100vh-64px)] md:px-5 md:pb-5">
              <div
                className={cn(
                  "w-full rounded-lg p-4 md:w-72 lg:w-96",
                  "flex items-center gap-4 md:flex-col md:items-start",
                  "md:mt-3",
                )}
              >
                <Drawer
                  text="Wizards"
                  logo="/images/logos/twoo-logo.png"
                  filterBox={<WizardsFilterTraits />}
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
                <WizardsFilterTraits />
              </div>
            </div>

            <WizardsGallery />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
