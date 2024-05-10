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
  // useEffect(() => {
  //   getSource();
  // }, [item]);

  // const [src, setSrc] = useState("");

  // const getSource = () => {
  //   if (item.type === "gif") {
  //     const src = gifArrayBufferToBase64(item.image?.data ?? []);
  //     setSrc(src);
  //   } else {
  //     const src = arrayBufferToBase64(item.image?.data ?? []);
  //     setSrc(src);
  //   }
  // };

  const src =
    item.type === "gif"
      ? gifArrayBufferToBase64(item.image?.data ?? [])
      : arrayBufferToBase64(item.image?.data ?? []);

  return (
    <motion.div
      whileHover={{ scale: platform == "" ? 1 : 1.05 }}
      whileTap={{ scale: 1 }}
      className={cn("h-fit w-fit pt-5 text-white", {
        " cursor-pointer": platform !== "",
      })}
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
        {/* Option to select */}
        <div
          className={`
            ${selectEnabled ? "invisible " : "hidden "}
            absolute left-0 top-0 z-50 
          `}
        >
          <input
            type="checkbox"
            name="selected"
            id="selected"
            // className="h-4 w-4"
            checked={selected}
            onChange={() => onSelect()}
          />
        </div>
        <div className="relative h-fit w-fit overflow-clip rounded-md ">
          <Image
            src={src}
            alt="Generated emoji"
            className="h-full w-full  object-cover"
            width={176}
            height={176}
          />
          <div
            className={cn("absolute inset-0 bg-black bg-opacity-0", {
              "bg-opacity-50": platform !== "" && !selected,
            })}
          ></div>
        </div>

        {/* Grey overlay  */}
        {platform == "telegram" && (
          <div
            className={`absolute top-0 h-full w-full rounded-md bg-black bg-opacity-50 object-cover ${
              selectedType
                ? item.type === selectedType
                  ? "hidden"
                  : "flex"
                : "hidden"
            }`}
          ></div>
        )}
      </div>
    </motion.div>
  );
}
