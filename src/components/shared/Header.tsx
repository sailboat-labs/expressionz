/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Collections from "./CollectionsDropdown";
import { cn } from "@/lib/misc.lib";

export type THeaderProps = {
  variant?: string;
  showBack?: boolean;
  logo?: React.ReactNode;
  transparentBackground?: boolean;
};

const COLLECTION_SUBMENU_VISIBLE_ON_PAGES = [
  "/",
  "/collections/moonbirds",
  "/about-us",
];

function BaseLogo({ showBack = false }) {
  const router = useRouter();

  return (
    <div className="flex list-none items-center">
      <div className="flex flex-row items-center">
        {showBack && (
          <a
            onClick={() => router.back()}
            className="w-8"
            style={{ cursor: "pointer" }}
          >
            <FaArrowLeft className="h-5 w-5" />
          </a>
        )}
      </div>
      <Link href={"/"}>Expressionz.xyz</Link>
    </div>
  );
}

function Header({
  showBack = false,
  variant = "base",
  logo,
  transparentBackground = false,
}: THeaderProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {!router.asPath.startsWith("/collections/wizards") && (
        <MobileMenu show={showMenu} setShow={setShowMenu} />
      )}
      <nav
        className={cn(
          "sticky top-0 !z-[100] h-16  font-presstart",
          "py-[10px] text-xs text-white  3xl:text-sm",
          {
            "3xl:h-20": variant === "base",
            "bg-darkGrey": !transparentBackground,
          },
        )}
      >
        <div
          className={cn(
            "m-auto flex h-full items-center  justify-between px-4",
            {
              "px-4": variant === "base",
              "": variant === "flexed-minimized",
            },
          )}
        >
          {logo ? logo : <BaseLogo showBack={showBack} />}

          {variant != "logo" && (
            <div className="hidden font-presstart lg:flex lg:space-x-8">
              {COLLECTION_SUBMENU_VISIBLE_ON_PAGES.includes(router.asPath) && (
                <Collections />
              )}
              <Link
                href="/about-us"
                className="hover:text-yellow active:text-yellow"
              >
                About Us
              </Link>
            </div>
          )}

          {!router.asPath.startsWith("/collections/wizards") && (
            <div className="flex lg:hidden">
              <IoMenu
                className="h-8 w-8"
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
