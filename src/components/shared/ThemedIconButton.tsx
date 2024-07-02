import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/misc.lib";

type TThemedIconButtonProps = {
  icon: React.ReactNode;
  theme?: TIconButtonTheme;
  wrapperClass?: string;
  variant?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

type TIconButtonTheme = {
  bgClass: string;
  textClass: string;
  borderClass: string;
};

const ThemedIconButton = ({
  icon,
  className,
  wrapperClass,
  variant = "custom",
  theme = {
    bgClass: "transparent",
    textClass: "text-black",
    borderClass: "border-transparent",
  },
  ...rest
}: TThemedIconButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn("h-8 w-8", wrapperClass)}
    >
      <button
        className={clsx(
          "flex h-full w-full items-center justify-center rounded",
          variant === "custom" && theme,
          variant === "violet" && [
            "border-2 border-[#BDBCFF] bg-[#6765A7] text-white",
          ],
          variant === "gold" && [
            "border-2 border-orange-700 bg-orange-200 text-orange-700",
          ],
          variant === "orange" && [
            "border-2 border-orange-700 bg-orange-200 text-orange-700",
          ],
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    </motion.div>
  );
};

export default ThemedIconButton;
