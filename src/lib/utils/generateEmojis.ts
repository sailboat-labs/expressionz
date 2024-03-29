export async function generateMoonbirdEmojis(
  tokenId: number,
  emoji_type: string,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOONBIRDS_GENERATOR_URL}/api/v1/emojis/generateV2?tokenId=${tokenId}&emoji_type=${emoji_type}`,
    );

    const data = await response.json();
    console.log("API response:", data);

    const colored = data.colored;
    const transparent = data.transparent;

    return { colored, transparent };
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  } finally {
  }
}

export async function generateWizardsEmojis(
  tokenId: number,
  emoji_type: string,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WIZARDS_GENERATOR_URL}/api/v1/emojis/generateV2?tokenId=${tokenId}&emoji_type=${emoji_type}`,
    );

    const data = await response.json();
    console.log("API response:", data);

    const colored = data.colored;
    const transparent = data.transparent;

    return { colored, transparent };
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  } finally {
  }
}
