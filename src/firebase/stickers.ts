import { doc, setDoc } from "firebase/firestore";

import { firestore } from "./config";
import { InputSticker } from "@/types/emoji.type";

export async function saveStickerPackData(
  collection: "wizards" | "moonbirds",
  id: string,
  token: number,
  data: InputSticker[],
) {
  try {
    console.log("Creating new sticker pack record!");
    const ref = doc(firestore, `Stickers/${id}`);

    await setDoc(ref, { data, pack_id: id, token });
  } catch (error) {
    console.log("Error adding sticker pack data to firebase", error);
  }
}
