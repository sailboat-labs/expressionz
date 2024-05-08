import { GALLERY } from "@/data/gallery";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { LazyLoadedDiv } from "../LazyLoadedDiv";
import Wizard from "./Wizard";

export default function Gallery() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  let selectedAttributes = (router.query.attributes as string[]) || [];
  typeof selectedAttributes === "string" &&
    (selectedAttributes = [selectedAttributes]);

  //Memo to filter gallery and search
  const gallery = useMemo(() => {
    let _gallery = GALLERY;

    if (router.query.attributes) {
      let selectedAttributes = (router.query.attributes as string[]) || [];

      if (typeof selectedAttributes === "string") {
        selectedAttributes = [selectedAttributes];
      }

      const listedAttributes: any[] = [];

      selectedAttributes.forEach((attr) => {
        const [trait_type, value] = attr.split(":");
        if ((listedAttributes as any)[trait_type]) {
          (listedAttributes as any)[trait_type].push(value);
        } else {
          (listedAttributes as any)[trait_type] = [value];
        }
      });

      _gallery = _gallery.filter((wizard) => {
        let valid = false;
        const attributes = wizard.meta.attributes;
        attributes.forEach((attribute) => {
          if (
            Object.keys(listedAttributes).includes(attribute.trait_type) &&
            (listedAttributes as any)[attribute.trait_type].includes(
              attribute.value,
            )
          ) {
            valid = true;
          }
        });
        return valid;
      });

      //Filter gallery to ensure that for every different trait, all selected traits are present
      selectedAttributes.forEach((attr) => {
        const [trait_type, value] = attr.split(":");

        _gallery = _gallery.filter((wizard) => {
          const attributes = wizard.meta.attributes;
          const attr = attributes.find((a) =>
            (listedAttributes as any)[trait_type].includes(a.value),
          );
          return attr;
        });
      });

      //Filter search
      if (router.query.search) {
        const search = router.query.search as string;
        _gallery = _gallery.filter((wizard) =>
          wizard.meta.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      return _gallery;
    } else if (router.query.search) {
      const search = router.query.search as string;
      _gallery = _gallery.filter((wizard) =>
        wizard.meta.name.toLowerCase().includes(search.toLowerCase()),
      );
      return _gallery;
    } else {
      return GALLERY;
    }
  }, [
    router.isReady,
    router.query.attributes,
    router.query.search,
    router.query.traits,
  ]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Set initial width
    handleResize();

    // Add event listener to update width when window is resized
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const item = gallery[rowIndex * columnCount + columnIndex];
    if (!item) return null;
    const index = Number(item?.meta?.name?.split("#")[1]);
    return (
      <div style={style} className=" items-center justify-center">
        <button
          onClick={() => {
            router.push(`/${item.id}`, undefined, { shallow: true });
          }}
          className="flex h-[45vw] w-full cursor-pointer flex-col items-center  p-2 md:ml-0 md:w-[11rem] "
        >
          <Image
            height={2000}
            width={2000}
            alt="wizard image"
            src={`/images/gallery/${index}.webp`}
            className="h-[40vw] w-[40vw] rounded-t-md object-contain md:h-[10rem] md:w-[12rem]"
          />
          <div className="flex w-[40vw] justify-between rounded-b-md bg-orange-100 p-2 md:w-full">
            <div>#{index}</div>
            <div className="flex h-fit items-center gap-3">
              <button
                onClick={() => {
                  window.open(
                    `https://ordinals.com/inscription/${item.id}`,
                    "_blank",
                  );
                }}
                className="cursor-pointer rounded-full border-2 border-black p-1"
              >
                <div className="h-2 w-2 rounded-full bg-black"></div>
              </button>
              <div>
                <img
                  onClick={() => {
                    window.open(
                      `https://magiceden.io/ordinals/item-details/${item.id}`,
                      "_blank",
                    );
                  }}
                  className="h-5 w-5 cursor-pointer rounded-md"
                  src="/images/MELOGO.png"
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  };
  const columnCount =
    windowWidth < 640
      ? 2
      : windowWidth < 1024
        ? 2
        : windowWidth < 1280
          ? 3
          : windowWidth < 1536
            ? 5
            : windowWidth < 1920
              ? 6
              : 7;

  return (
    <div className="h-screen w-full flex-1  overflow-x-hidden md:overflow-y-auto">
      <div className="flex justify-center px-2 md:justify-start">
        <div className="mb-3 mt-5 w-fit text-3xl text-white">
          Gallery ({gallery.length})
        </div>
      </div>

      {selectedAttributes.length > 0 && (
        <div className="flex w-screen flex-col justify-center gap-5 overflow-x-auto  px-2 md:justify-start">
          <div className="mb-5 flex gap-2  md:px-0">
            {selectedAttributes.map((attr, index) => (
              <div
                key={index}
                className="flex w-fit rounded-md bg-orange-100 px-2 py-1  text-orange-500"
              >
                <div className="truncate">{attr.split(":")[0]}</div>:
                <div>{attr.split(":")[1]}</div>
              </div>
            ))}

            {selectedAttributes.length > 0 && (
              <button
                onClick={() => {
                  const urlParams = new URLSearchParams(window.location.search);
                  urlParams.delete("attributes");
                  router.push(
                    `/collections/wizards?${urlParams.toString()}`,
                    undefined,
                    {
                      scroll: false,
                    },
                  );
                }}
                className="rounded-md bg-red-100 px-2 py-1  text-red-500"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* <AutoSizer style={{ width: windowWidth * 0.7, overflowWrap: "break-word" }}>
        {({ height, width }: any) => {
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={width / columnCount}
              height={height}
              rowCount={Math.ceil(gallery.length / columnCount)}
              rowHeight={220} // Adjust based on your needs
              width={width}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer> */}

      <div className="flex w-fit flex-wrap  gap-5">
        {gallery.map((wizard, index) => (
          <LazyLoadedDiv
            key={index + 1}
            className="items-center justify-center"
          >
            <Wizard
              index={Number(wizard.meta.name.split("#")[1])}
              wizard={wizard}
            />
          </LazyLoadedDiv>
        ))}
      </div>
    </div>
  );
}
