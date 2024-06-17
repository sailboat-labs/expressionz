import { uploadStickerToFirebase } from "@/firebase/uploadStickerToFirebase";

import { arrayBufferToBase64, randomId } from "@/lib/misc.lib";
import {
  EmojiTypes,
  InputSticker,
  TEmojiPackGeneratorPayload,
} from "@/types/emoji.type";
import { emojiMap } from "@/data/emoji.data";
import { TMoonBirdGeneratorAPIPayload } from "@/types/moonbird.type";
import { TWizardGeneratorAPIPayload } from "@/types/wizard.type";
import { saveStickerPackData } from "@/firebase/stickers";
import { generateMoonBirdEmojis } from "./moonbird.http";
import { generateWizardEmojis } from "./wizard.http";

export async function createTelegramStickerPack({
  tokenId,
  collection,
  selected,
  hasBackground,
}: TEmojiPackGeneratorPayload) {
  try {
    const id = (collection === "wizards" ? "W_" : "M_") + randomId();

    const generated = await generateTelegramStickers({
      tokenId,
      collection,
      selected,
      hasBackground,
    });

    // console.log("Generated stickers:", generated);

    // Upload stickers to firebase
    const packData = await saveStickerToFirebase(
      tokenId as number,
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

async function generateTelegramStickers({
  tokenId,
  collection,
  selected,
  hasBackground,
}: TEmojiPackGeneratorPayload) {
  const generated: any = [];

  // const EMOJIS = collection == "moonbirds" ? moonbirdEmojis : wizardEmojis;
  // const selectedEmojis = EMOJIS.filter((_, index) => selected.includes(index));

  const emojis: any[] = [];
  const emojiTypes: string[] = [];

  for (let i = 0; i < selected.length; i++) {
    const selectedEmoji = selected[i];

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
    generateCollection = generateWizardEmojis;
  }

  try {
    const response = await generateCollection(payload, () => {});

    console.log("Generate Response", response);

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
