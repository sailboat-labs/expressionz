import Image from "next/image";

import GrayButton from "~/images/buttons/gray-button.webp";
import PurpleButton from "~/images/buttons/purple-button.webp";
import BlueButton from "~/images/buttons/blue-button.webp";
import YellowButton from "~/images/buttons/yellow-btn.webp";
import DeepVioletButton from "~/images/buttons/deep-purple.webp";
import { cn } from "@/lib/misc.lib";

interface ButtonProps {
  text: string;
  onClick: () => any;
  classes?: string;
  textStyle?: string;
  color?: TButtonColor;
  id?: string;
  disabled?: boolean;
}

export type TButtonColor =
  | "gray"
  | "blue"
  | "purple"
  | "yellow"
  | "deep-purple";

// const buttonSizes = {
//   purple: "w-[175px] h-auto lg:w-[180px] 2xl:w-[200px]",
//   gray: "w-[175px] h-auto lg:w-[180px] 2xl:w-[200px]",
//   blue: "w-[175px] h-auto lg:w-[180px] 2xl:w-[200px]",
// };

function Button({
  classes,
  text,
  textStyle,
  onClick,
  color = "purple",
  id,
  disabled = false,
}: ButtonProps) {
  const getButton = () => {
    if (disabled) return GrayButton;

    switch (color) {
      case "blue":
        return BlueButton;
      case "gray":
        return GrayButton;
      case "purple":
        return PurpleButton;
      case "yellow":
        return YellowButton;
      default:
        return DeepVioletButton;
    }
  };
  return (
    <div
      className={`relative flex w-[250px] items-center justify-center lg:w-[250px] 2xl:w-[200px] ${classes}`}
      id={id}
    >
      <button onClick={onClick} className="relative" disabled={disabled}>
        <p
          className={`absolute flex h-full w-full items-center justify-center font-presstart text-xs text-white lg:text-xs ${textStyle}`}
        >
          {text}
        </p>
        <Image
          // src={`/images/buttons/${color}-button.webp`}
          src={getButton()}
          alt={text}
          className={cn("h-auto w-[175px] lg:w-[180px] 2xl:w-[200px]")}
        />
      </button>
    </div>
  );
}

export default Button;
