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
  variant?: "base" | "flexed-minimized";
  showBack?: boolean;
  logo?: React.ReactNode;
};

function BaseLogo({ showBack = false }) {
  const router = useRouter();

  return (
    <ul className="flex list-none items-center">
      <li className="flex flex-row items-center">
        {showBack ? (
          <a
            onClick={() => router.back()}
            className="w-8"
            style={{ cursor: "pointer" }}
          >
            <FaArrowLeft className="h-5 w-5" />
          </a>
        ) : (
          <div className="w-8" />
        )}
      </li>
      <Link href={"/"}>Expressionz.xyz</Link>
    </ul>
  );
}

function Header({ showBack = false, variant = "base", logo }: THeaderProps) {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <MobileMenu show={showMenu} setShow={setShowMenu} />
      <nav
        className={cn(
          "sticky top-0 !z-[100] h-16 bg-darkGrey font-presstart",
          "py-[10px] text-xs text-white  3xl:text-sm",
          {
            "3xl:h-20": variant === "base",
          },
        )}
      >
        <div
          className={cn("m-auto flex h-full  items-center justify-between", {
            "w-11/12 lg:w-4/5": variant === "base",
            "px-4": variant === "flexed-minimized",
          })}
        >
          {logo ? logo : <BaseLogo showBack={showBack} />}

          <div className="hidden font-presstart lg:flex lg:space-x-8">
            <Collections />
            <Link
              href="/about-us"
              className="hover:text-yellow active:text-yellow"
            >
              About Us
            </Link>
          </div>
          <div className="flex lg:hidden">
            <IoMenu
              className="h-8 w-8"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
