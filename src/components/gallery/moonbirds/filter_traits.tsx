import { MOONBIRD_FILTER_TRAITS } from "./filterTraits";
import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";

export default function FilterTraits() {
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

  return (
    <div className="h-full w-full overflow-auto">
      <div className="mx-auto flex max-h-[70vh] w-full max-w-md flex-col gap-2 overflow-auto rounded bg-purple-200 bg-opacity-20 p-2 backdrop-blur">
        {Object.keys(MOONBIRD_FILTER_TRAITS).map((key) => (
          <Disclosure key={key}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded bg-orange-100 px-4 py-2 text-left text-sm font-medium text-orange-700 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
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
                <Disclosure.Panel className="flex flex-col gap-2 px-4 pb-2 pt-4 text-sm text-white">
                  {Object.keys((MOONBIRD_FILTER_TRAITS as any)[key])
                    .sort(
                      (a, b) =>
                        (MOONBIRD_FILTER_TRAITS as any)[key][b] -
                        (MOONBIRD_FILTER_TRAITS as any)[key][a],
                    )
                    .map((valuesKey) => (
                      <div
                        key={valuesKey}
                        className="flex cursor-pointer items-center gap-2 text-start hover:text-orange-500"
                        onClick={() => {
                          const urlParams = new URLSearchParams(
                            window.location.search,
                          );
                          if (
                            selectedAttributes?.includes(`${key}:${valuesKey}`)
                          ) {
                            urlParams.delete("attributes");

                            if (typeof selectedAttributes === "string") {
                              urlParams.delete("attributes");
                              router.push(
                                `/moonbirds/?${urlParams.toString()}`,
                                undefined,
                                { scroll: false },
                              );
                              return;
                            }

                            selectedAttributes.forEach((attr) => {
                              if (attr !== `${key}:${valuesKey}`) {
                                urlParams.append("attributes", attr);
                              }
                            });
                          } else {
                            urlParams.append(
                              "attributes",
                              `${key}:${valuesKey}`,
                            );
                          }

                          router.push(`/moonbirds/?${urlParams.toString()}`, undefined, {
                            scroll: false,
                          });
                        }}
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={isAttributeIncluded(`${key}:${valuesKey}`)}
                          onChange={(e) => {
                            const urlParams = new URLSearchParams(
                              window.location.search,
                            );
                            if (e.target.checked) {
                              urlParams.append(
                                "attributes",
                                `${key}:${valuesKey}`,
                              );
                            } else {
                              urlParams.delete("attributes");

                              if (typeof selectedAttributes === "string") {
                                urlParams.delete("attributes");
                                router.push(`/moonbirds/?${urlParams.toString()}`);
                                return;
                              }

                              selectedAttributes.forEach((attr) => {
                                if (attr !== `${key}:${valuesKey}`) {
                                  urlParams.append("attributes", attr);
                                }
                              });
                            }

                            router.push(
                              `/moonbirds/?${urlParams.toString()}`,
                              undefined,
                              { scroll: false },
                            );
                          }}
                        />
                        {valuesKey} ({(MOONBIRD_FILTER_TRAITS as any)[key][valuesKey]})
                      </div>
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
