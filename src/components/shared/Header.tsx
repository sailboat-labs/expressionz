/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

function Header({ showBack = false }: { showBack?: boolean }) {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <MobileMenu show={showMenu} setShow={setShowMenu} />
      <nav className="font-presstart z-9999 sticky top-0 h-16 bg-darkGrey py-[10px] text-xs text-white">
        <div className="m-auto flex h-full w-11/12 items-center justify-between lg:w-4/5">
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

          <div className="font-presstart hidden lg:flex">
            <Link href="/about-us" className="">
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
