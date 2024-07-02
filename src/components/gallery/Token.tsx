import { useRouter } from "next/router";
import { motion } from "framer-motion";

export interface IToken {
  id: string;
  meta: {
    name: string;
    attributes: Attribute[];
  };
}

export interface Attribute {
  trait_type: string;
  value: string;
}

type TTokenProps = {
  token: IToken;
  index: number;
  collection: string;
  imageType: "png" | "webp";
  showOrdinals: boolean;
  showMagicEden: boolean;
  showTokenNumber: boolean;
  theme: string;
};

export default function Token({
  token,
  imageType,
  collection,
  index,
  showMagicEden,
  showOrdinals,
  showTokenNumber,
  theme,
}: Readonly<TTokenProps>) {
  const router = useRouter();

  return (
    <>
      <motion.button
        onClick={() => {
          router.push(`/collections/${collection}/${token.id}`);
        }}
        whileTap={{ scale: 0.9 }}
        className="flex w-full cursor-pointer flex-col items-center p-2  md:ml-0 md:w-[11rem] "
      >
        <div className="bg-black bg-opacity-40 backdrop-blur-md">
          <img
            height={2000}
            width={2000}
            alt="token image"
            loading="lazy"
            src={`/images/collections/${collection}/tokens/${index}.${imageType}`}
            className="w-[40vw] rounded-t-md  object-contain md:h-[10rem] md:w-[12rem]"
          />
        </div>
        <div
          className={`flex w-[40vw] justify-between rounded-b-md p-2 md:w-full ${theme == "violet" && " bg-violet-200"} ${theme == "orange" && " bg-orange-100"}`}
        >
          {showTokenNumber && (
            <div className="text-black">
              #{collection == "wizards" ? index : index + 1}
            </div>
          )}
          <div className="flex h-fit items-center gap-3">
            {showOrdinals && (
              <a
                href={`https://ordinals.com/inscription/${token.id}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block cursor-pointer rounded-full border-2 border-black p-1"
              >
                <div className="h-2 w-2 rounded-full bg-black"></div>
              </a>
            )}
            {showMagicEden && (
              <a
                href={`https://magiceden.io/ordinals/item-details/${token.id}`}
                target="_blank"
                className="inline-block cursor-pointer "
                rel="noreferrer noopener"
              >
                <img
                  className="h-5 w-5 cursor-pointer rounded-md"
                  src="/images/melogo.webp"
                  alt="ME logo"
                />
              </a>
            )}
          </div>
        </div>
      </motion.button>
    </>
  );
}
