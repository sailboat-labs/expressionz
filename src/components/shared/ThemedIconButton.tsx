import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

type TThemedIconButtonProps = {
  icon: React.ReactNode;
  theme?: TIconButtonTheme;
  variant?: "violet" | "gold" | "custom";
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

type TIconButtonTheme = {
  bgClass: string;
  textClass: string;
  borderClass: string;
};

const ThemedIconButton = ({
  icon,
  className,
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
      className="h-fit w-fit"
    >
      <button
        className={clsx(
          "flex h-8 w-8 scale-90 items-center justify-center rounded",
          variant === "custom" && theme,
          variant === "violet" && [
            "border-2 border-[#BDBCFF] bg-[#6765A7] text-white",
          ],
          variant === "gold" && [],
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
