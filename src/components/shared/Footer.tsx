import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

function Footer() {
  return (
    <footer
      id="footer"
      className="bottom-0 z-0 flex h-[150px] w-full items-center bg-darkGrey"
    >
      <div className="m-auto flex h-20 w-11/12 items-center justify-center lg:m-auto lg:w-4/5 lg:flex-row lg:justify-between lg:space-y-0 3xl:h-24">
        <Link href="/">
          <motion.img
            src="/images/logos/logo.webp"
            alt="Logo"
            className="h-auto w-32 object-contain lg:w-60 3xl:w-60"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 1,
            }}
          />
        </Link>

        <motion.a
          href="https://twitter.com/Expressionz_xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden font-presstart text-sm text-white lg:flex"
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1,
          }}
        >
          <FaXTwitter className="h-8 w-8" />
        </motion.a>
      </div>
    </footer>
  );
}

export default Footer;
