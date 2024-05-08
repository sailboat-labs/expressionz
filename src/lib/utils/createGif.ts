export async function generateGifs(
  tokenId: number,
  emoji_type: string,
  platform?: 'telegram' | 'discord'
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WIZARDS_GENERATOR_URL}/api/v1/gifs/generate?tokenId=${tokenId}&emoji_type=${emoji_type}&platform=${platform}`,
    );

    const data = await response.json();

    // console.log('Gif API response:', data);

    const colored = data.colored;
    const transparent = data.transparent;

    return { colored, transparent };
  } catch (error) {
    console.error('Error fetching gif data:', error);
    return false;
  }
}
