// Generate emojis
export async function generateEmojis(tokenId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/emojis/generate?tokenId=${tokenId}`,
    );

    // const response = await fetch(
    //   `http://localhost:3001/api/v1/emojis/generate?tokenId=${tokenId}`
    // );

    const data = await response.json();
    console.log("API response:", data);

    const images = data.images;

    console.log({ images });

    return { images };
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  } finally {
  }
}
