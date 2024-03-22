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
      } bg-darkPurple z-9999 h-screen w-screen`}
      style={{ zIndex: 99999 }}
    >
      <button
        className="fixed right-0 top-0 mr-5 mt-5 h-10 w-10 lg:hidden"
        onClick={() => setShow(false)}
      >
        <FaXmark className="h-full w-full text-[#FF65DD]" />
      </button>
      <div className="font-presstart flex w-full flex-col items-center justify-center space-y-10 text-white">
        <Link href="/#" onClick={() => setShow(false)}>
          About Us
        </Link>
      </div>
    </nav>
  );
}

export default MobileMenu;
