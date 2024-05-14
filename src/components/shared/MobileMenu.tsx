import React from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

interface MenuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileMenu({ show, setShow }: MenuProps) {
  return (
    <nav
      className={`${
        show ? "fixed flex" : "hidden"
      } z-9999 h-screen w-screen bg-darkPurple`}
      style={{ zIndex: 99999 }}
    >
      <button
        className="fixed right-0 top-0 mr-5 mt-5 h-10 w-10 lg:hidden"
        onClick={() => setShow(false)}
      >
        <FaXmark className="h-full w-full text-[#FF65DD]" />
      </button>
      <div className="flex w-full flex-col items-center justify-center space-y-10 font-presstart text-white">
        <Link
          href="/collections"
          onClick={() => setShow(false)}
          className="hover:text-yellow active:text-yellow"
        >
          Collections
        </Link>
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
