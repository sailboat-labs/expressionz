import React from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { cn } from "@/lib/misc.lib";

interface MenuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileMenu({ show, setShow }: MenuProps) {
  return (
    <nav
      className={cn(
        `z-9999 h-screen w-screen bg-darkPurple`,
        "transition-all duration-500",
        "fixed top-0 flex lg:hidden",
      )}
      style={{
        clipPath: show
          ? "circle(200% at top right)"
          : "circle(0px at 100% 20px)",
      }}
    >
      <button
        className="fixed right-5 top-0 mt-5 h-8 w-8 lg:hidden"
        onClick={() => setShow(false)}
      >
        <FaXmark className="h-full w-full text-[#FF65DD]" />
      </button>

      <div
        className={cn(
          "flex  flex-col items-center justify-center space-y-10 ",
          "w-full font-presstart text-white",
        )}
      >
        {/* <Link
          href="/collections"
          onClick={() => setShow(false)}
          className="hover:text-yellow active:text-yellow"
        >
          Collections
        </Link> */}
        <Link
          href="/collections/moonbirds"
          onClick={() => setShow(false)}
          className="hover:text-yellow active:text-yellow"
        >
          Moonbirds
        </Link>
        <Link
          href="/collections/wizards"
          onClick={() => setShow(false)}
          className="hover:text-yellow active:text-yellow"
        >
          Wizards
        </Link>

        <Link
          href="/about-us"
          onClick={() => setShow(false)}
          className="hover:text-yellow active:text-yellow"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
}

export default MobileMenu;
