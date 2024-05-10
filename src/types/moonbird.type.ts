export type TMoonBirdGeneratorAPIPayload = {
  platform: "telegram" | "discord" | string;
  tokenId: number | string;
  emojiTypes: string[];
};
