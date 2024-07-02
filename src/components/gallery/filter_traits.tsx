import { cn } from "@/lib/misc.lib";
import { TFilterTrait } from "@/types/misc.type";
import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

type TFilterTraitsProps = {
  filterTraits: TFilterTrait;
  collection: string;
  theme?: string;
};

export default function FilterTraits({
  filterTraits,
  collection,
  theme = "orange",
}: Readonly<TFilterTraitsProps>) {
  const router = useRouter();
  const selectedAttributes = (router.query.attributes as string[]) || [];

  function isAttributeIncluded(attribute: string): boolean {
    if (typeof selectedAttributes === "string") {
      return selectedAttributes === attribute;
    }
    return selectedAttributes.some(
      (selectedAttribute) => selectedAttribute === attribute,
    );
  }

  function onFilterItemSelected(key: string, value: string) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const urlParams = new URLSearchParams(window.location.search);
      if (e.target.checked) {
        urlParams.append("attributes", `${key}:${value}`);
      } else {
        urlParams.delete("attributes");

        if (typeof selectedAttributes === "string") {
          urlParams.delete("attributes");
          router.replace(`/collections/${collection}/?${urlParams.toString()}`);
          return;
        }

        selectedAttributes.forEach((attr) => {
          if (attr !== `${key}:${value}`) {
            urlParams.append("attributes", attr);
          }
        });
      }

      router.replace(
        `/collections/${collection}/?${urlParams.toString()}`,
        undefined,
        {
          scroll: false,
        },
      );
    };
  }

  return (
    <div className="h-full w-full overflow-auto">
      <div className="mx-auto flex max-h-[80vh] w-full max-w-md flex-col gap-2 overflow-auto rounded bg-purple-200 bg-opacity-20 p-2 backdrop-blur">
        {Object.keys(filterTraits).map((key) => (
          <Disclosure key={key}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={cn(
                    `flex w-full justify-between rounded  px-4 py-2 text-left`,

                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75",
                    {
                      ["bg-orange-100  text-orange-700 hover:bg-orange-200"]:
                        theme === "orange",
                      ["bg-violet-300  text-violet-800 hover:bg-violet-400"]:
                        theme === "violet",
                    },
                  )}
                >
                  <span>{key}</span>
                  Selected (
                  {
                    (typeof selectedAttributes == "string"
                      ? [selectedAttributes]
                      : selectedAttributes
                    )?.filter((attr) => attr.startsWith(key)).length
                  }
                  )
                </Disclosure.Button>
                <Disclosure.Panel
                  className={cn(
                    "flex flex-col gap-2 px-4 pb-2 pt-4  text-white",
                  )}
                >
                  {Object.keys((filterTraits as any)[key])
                    .sort(
                      (a, b) =>
                        (filterTraits as any)[key][b] -
                        (filterTraits as any)[key][a],
                    )
                    .map((valuesKey) => (
                      <label
                        key={valuesKey}
                        className="flex cursor-pointer items-center gap-2 text-start hover:text-orange-500"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={isAttributeIncluded(`${key}:${valuesKey}`)}
                          onChange={onFilterItemSelected(key, valuesKey)}
                        />
                        {valuesKey} ({(filterTraits as any)[key][valuesKey]})
                      </label>
                    ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
