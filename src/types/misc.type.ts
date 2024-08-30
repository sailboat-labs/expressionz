type TTrait = {
  [key: string]: number;
};

export type TFilterTrait = {
  [key: string]: TTrait;
};

export enum EPlatform {
  NONE = "",
  TELEGRAM = "telegram",
  DISCORD = "discord",
}

export type TCollection = "wizards" | "moonbirds";

export type TGeneratorResponse = {
  status: string;
  colored: TGeneratorResponseImage[];
  transparent: TGeneratorResponseImage[];
};

export type TGeneratorResponseImage = {
  image: any;
  emoji_type: string;
  type: string;
};
