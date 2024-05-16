export type EmojiIcons =
  | "raised_eyebrow"
  | "heart_eyes"
  | "nerd_face"
  | "face_with_sunglasses"
  | "enraged_face"
  | "teary_face"
  | "hushed_face"
  | "unamused_face"
  | "rolling_eyes_face"
  | "pensive_face"
  | "blow_kiss_face"
  | "halo_face"
  | "tears_of_joy"
  | "artist"
  | "programmer"
  | "tea_cup"
  | "crying"
  | "beer"
  | "love"
  | "french_fries"
  | "gaming"
  | "thumb_up"
  | "sleeping"
  | "waving"
  | "face_in_palm";

export interface InputSticker {
  sticker: string;
  emoji_list: string[];
  name?: string;
}

export type EmojiTypes =
  | "heart_eyes"
  | "sleeping"
  | "smiley_face"
  | "tea_cup"
  | "tears_of_joy"
  | "umbrella"
  | "lfg"
  | "sigh"
  | "side_eye"
  | "crying"
  | "enraged_face"
  | "salute";

export interface InputSticker {
  sticker: string;
  emoji_list: string[];
  name?: string;
}

export type TEmojiPackGeneratorPayload = {
  collection: "wizards" | "moonbirds";
  tokenId: number;
  selected: any[];
  hasBackground: boolean;
};
