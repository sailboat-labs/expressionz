import { useMemo } from "react";
import { useRouter } from "next/router";
import { LazyLoadedDiv } from "./LazyLoadedDiv";
import Token from "./Token";

export default function Gallery({
  collection,
  data,
  imageType,
  showMagicEden,
  showOrdinals,
  showTokenNumber,
  theme,
}: {
  collection: string;
  imageType: "png" | "webp";
  data: {
    id: string;
    meta: {
      name: string;
      attributes: {
        trait_type: string;
        value: string;
      }[];
    };
  }[];
  showOrdinals: boolean;
  showMagicEden: boolean;
  showTokenNumber: boolean;
  theme: string;
}) {
  const router = useRouter();

  let selectedAttributes = (router.query.attributes as string[]) || [];
  typeof selectedAttributes === "string" &&
    (selectedAttributes = [selectedAttributes]);

  //Memo to filter gallery and search
  const gallery = useMemo(() => {
    let _gallery = data;

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
      return _gallery;
    }
  }, [
    router.isReady,
    router.query.attributes,
    router.query.search,
    router.query.traits,
  ]);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex-1 overflow-x-hidden  pl-2 md:overflow-y-auto">
      <div className="p  flex">
        <div className="mb-3 mt-5 w-fit text-3xl text-white">
          Gallery ({gallery.length})
        </div>
      </div>

      {selectedAttributes.length > 0 && (
        <div className="flex w-screen flex-col justify-center gap-5 overflow-x-auto   md:justify-start">
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

      <div className="flex w-fit flex-wrap justify-center md:justify-start   lg:gap-5">
        {gallery.map((token, index) => (
          <LazyLoadedDiv key={index + 1}>
            <Token
              index={Number(token.meta.name.split("#")[1])}
              token={token}
              imageType={imageType}
              collection={collection}
              showMagicEden={showMagicEden}
              showOrdinals={showOrdinals}
              showTokenNumber={showTokenNumber}
              theme={theme}
            />
          </LazyLoadedDiv>
        ))}
      </div>
    </div>
  );
}
