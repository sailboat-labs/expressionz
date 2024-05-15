import { uploadStickerToFirebase } from "@/firebase/uploadStickerToFirebase";

import {
  generateMoonBirdEmojis,
  generateWizardsEmojis,
} from "../lib/generateEmojis";
import { arrayBufferToBase64, randomId } from "@/lib/misc.lib";
import { EmojiTypes, InputSticker } from "@/types/emoji.type";
import { emojiMap, moonbirdEmojis, wizardEmojis } from "@/data/emoji.data";
import { TMoonBirdGeneratorAPIPayload } from "@/types/moonbird.type";
import { TWizardGeneratorAPIPayload } from "@/types/wizard.type";
import { saveStickerPackData } from "@/firebase/stickers";

export async function createTelegramStickerPack(
  collection: "wizards" | "moonbirds",
  tokenId: number,
  selected: number[],
  hasBackground: boolean,
) {
  try {
    const id = (collection === "wizards" ? "W_" : "M_") + randomId();

    const generated = await generateTelegramStickers(
      collection,
      tokenId,
      selected,
      hasBackground,
    );

    // console.log("Generated stickers:", generated);

    // Upload stickers to firebase
    const packData = await saveStickerToFirebase(
      tokenId,
      generated,
      "telegram",
    );

    // Save pack data to firebase
    await saveStickerPackData(collection, id, tokenId, packData);
    return id;
  } catch (error) {
    console.error("Error generating telegram stickers", error);
    throw error;
  }
}

async function generateTelegramStickers(
  collection: "wizards" | "moonbirds",
  tokenId: number,
  selected: number[],
  hasBackground: boolean,
) {
  const generated: any = [];

  const EMOJIS = collection == "moonbirds" ? moonbirdEmojis : wizardEmojis;
  const selectedEmojis = EMOJIS.filter((_, index) => selected.includes(index));

  const emojis: any[] = [];
  const emojiTypes: string[] = [];

  for (let i = 0; i < selectedEmojis.length; i++) {
    const selectedEmoji = selectedEmojis[i];

    if (collection === "moonbirds") {
      emojiTypes.push(selectedEmoji.emoji_type);
    } else {
      emojis.push({
        name: selectedEmoji.emoji_type,
        type: selectedEmoji.type,
      });
    }
  }

  const payload: TMoonBirdGeneratorAPIPayload & TWizardGeneratorAPIPayload = {
    tokenId,
    emojis,
    platform: "telegram",
    emojiTypes,
  };

  let generateCollection;
  if (collection === "moonbirds") {
    generateCollection = generateMoonBirdEmojis;
  } else {
    generateCollection = generateWizardsEmojis;
  }

  try {
    const response = await generateCollection(payload, () => {});

    if (response) {
      const imagesToIncludeInExport = hasBackground
        ? response.colored
        : response.transparent;

      imagesToIncludeInExport.forEach((emoji) => {
        const base64 = arrayBufferToBase64(emoji.image.data);
        generated.push({
          data: base64,
          type: emoji.type,
          emoji_type: emoji.emoji_type,
        });
      });
    }

    return generated;
  } catch (error) {
    console.log("Error generating discord emojis", error);
    throw error;
  }
}

async function saveStickerToFirebase(
  tokenId: number,
  data: any[],
  platform: "telegram" | "discord",
) {
  const packData: InputSticker[] = [];

  // Upload images to firebase & create Input Sticker Array
  for await (const image of data) {
    const url = await uploadStickerToFirebase(
      tokenId.toString(),
      image.data,
      platform,
      image.type == "png" ? "png" : "gif",
    );

    const emoji_type = image.emoji_type as EmojiTypes;

    const sticker: InputSticker = {
      emoji_list: [emojiMap[emoji_type]],
      name: emoji_type,
      sticker: url,
    };

    packData.push(sticker);
  }

  return packData;
}
