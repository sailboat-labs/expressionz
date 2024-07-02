import Image from "next/image";

import {
  arrayBufferToBase64,
  cn,
  gifArrayBufferToBase64,
} from "@/lib/misc.lib";
import { motion } from "framer-motion";

export default function GeneratedItem({
  item,
  selected,
  onSelect,
  selectedType,
  platform,
  selectEnabled,
}: {
  item: any;
  selected: boolean;
  onSelect: () => any;
  selectedType: string;
  platform: string;
  selectEnabled: boolean;
}) {
  const src =
    item.type === "gif"
      ? gifArrayBufferToBase64(item.image?.data ?? [])
      : arrayBufferToBase64(item.image?.data ?? []);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      className={cn(
        "h-fit w-fit pt-5 text-white ",
        `${!selectEnabled ? "opacity-60" : "opacity-100"}`,
        `${
          platform == "telegram" && selectedType && item.type !== selectedType
            ? "opacity-60"
            : ""
        }`,
        {
          " cursor-pointer": platform !== "",
        },
      )}
    >
      <div
        className="relative "
        onClick={() => {
          if (!selectEnabled) return;

          onSelect();
        }}
      >
        <div className="absolute z-50 flex w-full justify-center">
          <div className="-mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#2C2C2C]  bg-opacity-75">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/emojis/generated/${item.emoji_type}.webp`}
              alt="Generated emoji"
              className="h-6 w-6 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7"
            />
          </div>
        </div>

        <div className="relative h-full w-full overflow-clip rounded-md ">
          <Image
            src={src}
            alt="Generated emoji"
            className={`${selected ? "p-0.5" : ""} h-full w-full object-cover rounded-md`}
            width={176}
            height={176}
          />
          <Image
            src="/images/collections/wizards/token-frame.webp"
            alt="Wizard frame"
            className={cn("absolute top-0 hidden rounded ", {
              " flex": selected,
            })}
            width={180}
            height={180}
          />
        </div>
      </div>
    </motion.div>
  );
}
