import Image from "next/image";
import { useEffect, useState } from "react";
import {
  gifArrayBufferToBase64,
  arrayBufferToBase64,
} from "@/lib/utils/bufferToBase64";

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
  useEffect(() => {
    getSource();
  }, [item]);

  const [src, setSrc] = useState("");

  const getSource = () => {
    if (item.type === "gif") {
      const src = gifArrayBufferToBase64(item.image.data);
      setSrc(src);
    } else {
      const src = arrayBufferToBase64(item.image.data);
      setSrc(src);
    }
  };

  return (
    <div className="p-0 pt-10 text-white lg:p-5 xl:p-3">
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
            ${selectEnabled ? "block " : "hidden "}
            absolute left-0 top-0 z-50 -ml-2 -mt-2
          `}
        >
          <input
            type="checkbox"
            name="selected"
            id="selected"
            className="h-5 w-5"
            checked={selected}
            onChange={() => onSelect()}
          />
        </div>
        <Image
          src={src}
          alt="Generated emoji"
          className="h-full w-full rounded-md object-cover"
          width={176}
          height={176}
        />

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
    </div>
  );
}
