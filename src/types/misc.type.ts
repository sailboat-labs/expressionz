type TTrait = {
  [key: string]: number;
};

type TFilterTrait = {
  [key: string]: TTrait;
};

export enum EPlatform {
  NONE = "",
  TELEGRAM = "telegram",
  DISCORD = "discord",
}
