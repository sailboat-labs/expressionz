import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { METADATA } from "@/data/metadata";
import Moonbird from "./Moonbird";
import { LazyLoadedDiv } from "../LazyLoadedDiv";
import { cn } from "@/lib/misc.lib";

export default function MoonbirdsGallery() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  let selectedAttributes = (router.query.attributes as string[]) || [];
  typeof selectedAttributes === "string" &&
    (selectedAttributes = [selectedAttributes]);

  //Memo to filter gallery and search
  const gallery = useMemo(() => {
    let _gallery = METADATA;

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

      _gallery = _gallery.filter((moonbird) => {
        let valid = false;
        const attributes = moonbird.meta.attributes;
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

        _gallery = _gallery.filter((moonbird) => {
          const attributes = moonbird.meta.attributes;
          const attr = attributes.find((a) =>
            (listedAttributes as any)[trait_type].includes(a.value),
          );
          return attr;
        });
      });

      //Filter search
      if (router.query.search) {
        const search = router.query.search as string;
        _gallery = _gallery.filter((moonbird) =>
          moonbird.meta.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      return _gallery;
    } else if (router.query.search) {
      const search = router.query.search as string;
      _gallery = _gallery.filter((moonbird) =>
        moonbird.meta.name.toLowerCase().includes(search.toLowerCase()),
      );
      return _gallery;
    } else {
      return METADATA;
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

  return (
    <div className="w-full flex-1 overflow-x-hidden  md:h-[calc(100vh-64px)] md:overflow-y-auto">
      <h1
        className={cn(
          "mx-4 flex md:mx-2",
          "mb-3 w-fit text-3xl text-white md:mt-5",
        )}
      >
        Gallery ({gallery.length})
      </h1>

      {selectedAttributes.length > 0 && (
        <div className="flex w-screen flex-col justify-center gap-5 overflow-x-auto md:ml-5 md:justify-start">
          <div className="mb-5 flex gap-2 px-4 md:px-0">
            {selectedAttributes.map((attr, index) => (
              <div
                key={index}
                className="flex w-fit rounded-md bg-orange-100 px-2 py-1 text-orange-500"
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
                    `/collections/moonbirds?${urlParams.toString()}`,
                    undefined,
                    {
                      scroll: false,
                    },
                  );
                }}
                className="rounded-md bg-red-100 px-2 py-1 text-red-500"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex w-fit flex-wrap justify-center gap-5   md:justify-start">
        {gallery.map((moonbird, index) => (
          <LazyLoadedDiv
            key={index + 1}
            className="items-center justify-center"
          >
            <Moonbird
              index={Number(moonbird.meta.name.split("#")[1])}
              moonbird={moonbird}
            />
          </LazyLoadedDiv>
        ))}
      </div>
    </div>
  );
}
