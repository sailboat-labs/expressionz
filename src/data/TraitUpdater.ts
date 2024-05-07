import { TEmoji, TTraitAttribute } from "@/lib/interfaces";
import { METADATA } from "./metadata";
import { GALLERY } from "./gallery";

const moonBirdTraits: string[] = [
  "Body",
  "Eyes",
  "Eyecolor",
  "Eyewear",
  "Beak",
  "Outwear",
  "Headwear",
  "Feathers",
  "Background",
];

const wizardTraits: string[] = [
  "Type",
  "Head",
  "Clothes",
  "Eyes",
  "Weapon",
  "Hair Color",
  "Facial Hair",
];

class TraitUpdater {
  private traits;
  private metadata;
  private collection: "moonbirds" | "wizards";

  constructor(collection: "moonbirds" | "wizards") {
    this.traits = collection === "moonbirds" ? moonBirdTraits : wizardTraits;
    this.metadata = collection === "moonbirds" ? METADATA : GALLERY;
    this.collection = collection;
  }

  private getTraitAttribute(
    traitType: string,
    attributes: TTraitAttribute[],
  ): string {
    let foundTrait = attributes.find(
      (attribute) => attribute.trait_type === traitType,
    );

    return foundTrait == undefined ? "None" : foundTrait.value;
  }

  private getAttributes(emoji: TEmoji): TTraitAttribute[] {
    return this.traits.map((traitType) => ({
      trait_type: traitType,
      value: this.getTraitAttribute(traitType, emoji.meta.attributes),
    }));
  }

  update() {
    const update = [];
    for (let i = 0; i < this.metadata.length; i++) {
      let emoji: TEmoji = this.metadata[i];
      update.push({
        id: emoji.id,
        meta: {
          name: emoji.meta.name,
          attributes: this.getAttributes(emoji),
        },
      });
    }
    console.log(update);
  }
}

export default TraitUpdater;
