import { EmojiTypes } from "@/types/emoji.type";

export async function generateEmoji(
  tokenId: number,
  emoji_type: EmojiTypes,
  platform?: "telegram" | "discord",
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WIZARDS_GENERATOR_URL}/api/v1/emojis/generate?tokenId=${tokenId}&emoji_type=${emoji_type}${platform === undefined ? "" : `&platform=${platform}`}`,
    );

    const data = await response.json();
    console.log("Moonbirds API response:", data);

    const colored = data.colored;
    const transparent = data.transparent;

    // console.log({ images });

    return { colored, transparent };
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}
