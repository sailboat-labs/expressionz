import { EmojiTypes, InputSticker } from "@/lib/interface";

import { saveStickerPackData } from "@/firebase/stickers";
import { uploadStickerToFirebase } from "@/firebase/uploadStickerToFirebase";
import {
  arrayBufferToBase64,
  gifArrayBufferToBase64,
  randomId,
} from "@/lib/utils";
import { emojiIconsMap, emojis } from "@/lib/data";
import { generateGifs } from "@/lib/createGif";
import { generateEmojis } from "@/lib/generateEmojis";

export async function createDiscordEmojiPack(
  tokenId: number,
  selected: number[],
  hasBackground: boolean,
) {
  const id = randomId();

  const generated = await generateDiscordEmojis(
    tokenId,
    selected,
    hasBackground,
  );
  console.log("Generated stickers:", generated);

  // Upload stickers to firebase
  const packData = await saveStickerToFirebase(tokenId, generated, "discord");

  // Save pack data to firebase
  await saveStickerPackData(id, tokenId, packData);

  return id;
}

async function generateDiscordEmojis(
  tokenId: number,
  selected: number[],
  hasBackground: boolean,
) {
  const generated = [];

  const selectedEmojis = emojis.filter((_, index) => selected.includes(index));
  try {
    for await (const emoji of selectedEmojis) {
      if (emoji.type == "gif") {
        const response = await generateGifs(
          tokenId,
          emoji.emoji_type as EmojiTypes,
          "discord",
        );

        if (response) {
          const base64 = gifArrayBufferToBase64(
            hasBackground ? response.colored.data : response.transparent.data,
          );

          generated.push({
            data: base64,
            type: "gif",
            emoji_type: emoji.emoji_type,
          });
        }
      } else if (emoji.type == "png") {
        const response = await generateEmojis(
          tokenId,
          emoji.emoji_type as EmojiTypes,
          "discord",
        );

        if (response) {
          const base64 = arrayBufferToBase64(
            hasBackground ? response.colored.data : response.transparent.data,
          );
          generated.push({
            data: base64,
            type: "png",
            emoji_type: emoji.emoji_type,
          });
        }
      }
    }

    return generated;
  } catch (error) {
    console.log("Error generating discord emojis", error);
    return [];
  } finally {
    console.log("Discord emojis generated");
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
      emoji_list: [emojiIconsMap[emoji_type]],
      name: emoji_type,
      sticker: url,
    };

    packData.push(sticker);
  }

  return packData;
}
