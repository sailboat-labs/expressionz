import { EmojiTypes } from "./interface";

// Generate emojis
export async function generateEmojis(
  tokenId: number,
  emoji_type: EmojiTypes,
  platform?: "telegram" | "discord",
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WIZARDS_BACKEND_URL}/api/v1/emojis/generate?tokenId=${tokenId}&emoji_type=${emoji_type}&platform=${platform}`,
    );

    const data = await response.json();
    console.log("API response:", data);

    const colored = data.colored;
    const transparent = data.transparent;

    // console.log({ images });

    return { colored, transparent };
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}
