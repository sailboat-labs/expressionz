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
