export type TMoonBirdGenerationRequestPayload = {
  platform: "telegram" | "discord" | string;
  tokenId: number | string;
  emojiTypes: string[];
};
