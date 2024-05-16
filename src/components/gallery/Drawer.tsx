import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Pixelify_Sans } from "next/font/google";
import MoonBirdsFilterTraits from "./moonbirds/MoonBirdsFilterTraits";

const PixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  display: "swap",
});

type TDrawerProps = { text: string; logo?: string };

export default function Drawer({
  text,
  logo = "/images/moonbirds-logo.webp",
}: TDrawerProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <div className=" mt-1 flex h-5 w-5 scale-150 cursor-pointer items-center justify-center rounded border border-orange-700 bg-orange-200 text-orange-700 md:hidden">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className={` !z-9999 border-r border-orange-400 bg-orange-800 ${PixelifySans.className}`}
        >
          <SheetHeader>
            <SheetTitle className="mb-5">
              <div className="mb-2 mt-5 flex items-center gap-2 text-white">
                <img
                  src={logo}
                  className="h-10 w-10 rounded-full md:h-20 md:w-20"
                />
                <div>
                  <div className="flex h-full items-center font-semibold text-orange-50 md:text-xl">
                    {text}
                  </div>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription className="flex w-full">
              <MoonBirdsFilterTraits />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
