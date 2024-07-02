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
        theme: "violet",
        background: "",
        imageType: "png",
        gallery: MOONBIRDS,
        filterTraits: MOONBIRD_FILTER_TRAITS,
        showMagicEden: false,
        showOrdinals: false,
        showTokenNumber: true,
        renderScroll: false,
        showInscription: false,
      };

    default:
      return {
        collectionId: collection,
        title: "TWOO",
        theme: "orange",
        collectionName: "Wizards",
        background: "/images/collections/wizards/background.webp",
        imageType: "webp",
        gallery: WIZARDS,
        filterTraits: WIZARDS_FILTER_TRAITS,
        showMagicEden: true,
        showOrdinals: true,
        showTokenNumber: true,
        renderScroll: true,
        showInscription: true,
      };
  }
}
