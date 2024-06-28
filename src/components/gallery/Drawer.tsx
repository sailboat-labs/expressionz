import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/misc.lib";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

type TDrawerProps = {
  text: string;
  logo?: string;
  theme?: string;
  filterBox: React.ReactNode;
};

export default function Drawer({
  text,
  logo = "/images/moonbirds-logo.webp",
  theme = "brown",
  filterBox,
}: TDrawerProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <span
            className={cn(
              "mt-1 flex h-5 w-5 scale-150 cursor-pointer items-center justify-center rounded border  md:hidden",
              {
                "border-orange-700 bg-orange-200 text-orange-700":
                  theme == "brown",
                "border-violet-700 !bg-violet-200 text-violet-700":
                  theme == "purple",
              },
            )}
          >
            <HamburgerMenuIcon className="h-3 w-3" />
          </span>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className={cn(` !z-9999 font-pixelify-r`, {
            "border-orange-400 bg-orange-800 ": theme == "brown",
            "border-dark bg-dark ": theme == "purple",
          })}
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
            <SheetDescription asChild className="flex w-full">
              {filterBox}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
