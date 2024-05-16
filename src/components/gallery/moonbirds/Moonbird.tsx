import Image from "next/image";
import { useRouter } from "next/router";

export interface IMoonbird {
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

type TMoonbirdProps = {
  moonbird: IMoonbird;
  index: number;
};

export default function Moonbird({
  moonbird,
  index,
}: Readonly<TMoonbirdProps>) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/collections/moonbirds/${moonbird.id}`);
      }}
      className="flex w-full cursor-pointer flex-col items-center p-2 md:ml-0 md:w-[11rem] "
    >
      <Image
        height={2000}
        width={2000}
        alt="moonbird image"
        loading="lazy"
        src={`/images/moonbirds/tokens/${index}.png`}
        className="w-[40vw] rounded-md object-contain md:h-[10rem] md:w-[12rem]"
      />
      {/* <div className="flex w-[40vw] items-center justify-between rounded-b-md bg-orange-100 p-2 md:w-full">
          <div className="text-black">#{index}</div>
          <div className="flex h-fit items-center gap-1">
            <img
              onClick={() => {
                window.open(
                  `https://proof.xyz/moonbirds/${moonbird.id}`,
                  "_blank",
                );
              }}
              className="h-8 w-8 cursor-pointer rounded-md"
              src="/images/proof-xyz-logo.webp"
            />
            <img
              onClick={() => {
                window.open(
                  `https://magiceden.io/item-details/ethereum/0x23581767a106ae21c074b2276D25e5C3e136a68b/${moonbird.id}`,
                  "_blank",
                );
              }}
              className="h-8 w-8 cursor-pointer rounded-md"
              src="/images/melogo.webp"
            />
          </div>
        </div> */}
    </button>
  );
}
