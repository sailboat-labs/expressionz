import { cn } from "@/lib/misc.lib";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

type IconButtonVariants = VariantProps<typeof buttonClasses>;
type IconButtonProps = IconButtonVariants &
  ComponentPropsWithoutRef<"button"> & {};

const buttonClasses = cva(
  [
    "p-3 rounded-md border-2 border-transparent",
    "flex items-center justify-center",
    "hover:scale-110 transition-transform duration-150",
  ],
  {
    variants: {
      theme: {
        brown: ["bg-lightBrown text-darkBrown border-darkBrown"],
        violet: ["bg-darkViolet text-white border-lightViolet"],
      },
    },
    //   compoundVariants: {},
    defaultVariants: {},
  },
);

const IconButton = ({
  theme = "brown",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button className={cn(buttonClasses({ theme }), className)} {...props} />
  );
};

export default IconButton;
