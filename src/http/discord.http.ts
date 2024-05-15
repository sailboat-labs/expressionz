import { saveStickerPackData } from "@/firebase/stickers";
import { uploadStickerToFirebase } from "@/firebase/uploadStickerToFirebase";

import { arrayBufferToBase64, randomId } from "@/lib/misc.lib";
import { emojiMap } from "@/data/emoji.data";
import {
  EmojiTypes,
  InputSticker,
  TEmojiPackGeneratorPayload,
} from "@/types/emoji.type";

import { TMoonBirdGeneratorAPIPayload } from "@/types/moonbird.type";
import { TWizardGeneratorAPIPayload } from "@/types/wizard.type";
import { generateWizardEmojis } from "./wizard.http";
import { generateMoonBirdEmojis } from "./moonbird.http";

export async function createDiscordEmojiPack({
  tokenId,
  collection,
  selected,
  hasBackground,
}: TEmojiPackGeneratorPayload) {
  const id = (collection === "wizards" ? "W_" : "M_") + randomId();

  console.log({ selected });

  const generated = await generateDiscordEmojis({
    tokenId,
    collection,
    selected,
    hasBackground,
  });

  // Upload stickers to firebase
  const packData = await saveStickerToFirebase(
    tokenId as number,
    generated,
    "discord",
  );

  // Save pack data to firebase
  await saveStickerPackData(collection, id, tokenId as number, packData);

  return id;
}

async function generateDiscordEmojis({
  tokenId,
  collection,
  selected,
  hasBackground,
}: TEmojiPackGeneratorPayload) {
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
    platform: "discord",
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
    const generated: any = [];

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
// export async function createDiscordEmojiPack(
//   collection: "wizards" | "moonbirds",
//   tokenId: number,
//   selected: number[],
//   hasBackground: boolean,
// ) {
//   const id = (collection === "wizards" ? "W_" : "M_") + randomId();

//    console.log({selected});

//   const generated = await generateDiscordEmojis(
//     collection,
//     tokenId,
//     selected,
//     hasBackground,
//   );

//   // Upload stickers to firebase
//   const packData = await saveStickerToFirebase(tokenId, generated, "discord");

//   // Save pack data to firebase
//   await saveStickerPackData(collection, id, tokenId, packData);

//   return id;
// }

// async function generateDiscordEmojis(
//   collection: "wizards" | "moonbirds",
//   tokenId: number,
//   selected: number[],
//   hasBackground: boolean,
// ) {
//   const generated: any = [];

//   const EMOJIS = collection == "moonbirds" ? moonbirdEmojis : wizardEmojis;
//   const selectedEmojis = EMOJIS.filter((_, index) => selected.includes(index));

//   const emojis: any[] = [];
//   const emojiTypes: string[] = [];

//   for (let i = 0; i < selectedEmojis.length; i++) {
//     const selectedEmoji = selectedEmojis[i];

//     if (collection === "moonbirds") {
//       emojiTypes.push(selectedEmoji.emoji_type);
//     } else {
//       emojis.push({
//         name: selectedEmoji.emoji_type,
//         type: selectedEmoji.type,
//       });
//     }
//   }

//   const payload: TMoonBirdGeneratorAPIPayload & TWizardGeneratorAPIPayload = {
//     tokenId,
//     emojis,
//     platform: "discord",
//     emojiTypes,
//   };

//   let generateCollection;
//   if (collection === "moonbirds") {
//     generateCollection = generateMoonBirdEmojis;
//   } else {
//     generateCollection = generateWizardsEmojis;
//   }

//   try {
//     const response = await generateCollection(payload, () => {});
//     if (response) {
//       const imagesToIncludeInExport = hasBackground
//         ? response.colored
//         : response.transparent;

//       imagesToIncludeInExport.forEach((emoji) => {
//         const base64 = arrayBufferToBase64(emoji.image.data);
//         generated.push({
//           data: base64,
//           type: emoji.type,
//           emoji_type: emoji.emoji_type,
//         });
//       });
//     }

//     return generated;
//   } catch (error) {
//     console.log("Error generating discord emojis", error);
//     throw error;
//   }
// }

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
