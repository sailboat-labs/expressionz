import { EPlatform } from "./misc.type";

export type TWizardGeneratorAPIPayload = {
  tokenId: string | number;
  platform: "telegram" | "discord" | "";
  emojis: {
    type: "png" | "gif";
    name: string;
  }[];
};

export type TWizardGeneratorAPIResponse = {
  status: "success" | "failed";
  message?: string;
  colored: TGeneratedWizard[];
  transparent: TGeneratedWizard[];
};

export type TGeneratedWizard = {
  image: any;
  emoji_type: string;
  type: string;
};

export type TWizardShareButton = {
  name: string;
  active: string;
  inactive: string;
  platform: EPlatform;
};
