import { MOONBIRD_FILTER_TRAITS } from "@/components/gallery/filterTraits";
import { MOONBIRDS } from "./moonbirds";
import { WIZARDS } from "./wizards";
import { WIZARDS_FILTER_TRAITS } from "../wizards-filter-traits";

export function getCollectionInfo(collection: string) {
  switch (collection) {
    case "moonbirds":
      return {
        collectionId: collection,
        title: "Moonbirds",
        collectionName: "Moonbirds",
        logo: "/images/moonbirds-logo.webp",
        theme: "violet",
        background: "",
        imageType: "png",
        gallery: MOONBIRDS,
        filterTraits: MOONBIRD_FILTER_TRAITS,
        showMagicEden: true,
        showOrdinals: true,
        showTokenNumber: true,
      };

    default:
      return {
        collectionId: collection,
        title: "TWOO",
        theme: "orange",
        collectionName: "Wizards",
        logo: "/images/logos/twoo-logo.png",
        background: "/images/background.webp",
        imageType: "webp",
        gallery: WIZARDS,
        filterTraits: WIZARDS_FILTER_TRAITS,
        showMagicEden: true,
        showOrdinals: true,
        showTokenNumber: true,
      };
  }
}
