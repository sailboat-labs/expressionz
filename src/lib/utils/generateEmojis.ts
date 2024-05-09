import { TMoonBirdGenerationRequestPayload } from "@/types/moonbird.type";
import axios from "axios";

// export async function generateMoonbirdEmojis(
//   tokenId: number,
//   emoji_type: string,
// ) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_MOONBIRDS_GENERATOR_URL}/api/v1/emojis/generateV2?tokenId=${tokenId}&emoji_type=${emoji_type}`,
//     );
//     const data = await response.json();
//     console.log("API response:", data);

//     const colored = data.colored;
//     const transparent = data.transparent;

//     return { colored, transparent };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return false;
//   } finally {
//   }
// }

/**
 * Generates a set of moon bird emojis based
 * - for a given platform specified by @param payload 'platform' field
 * - token specified by @param payload 'tokenId' field
 * - emoji types specified by @param payload 'emojiTypes' field
 *
 * @param {TMoonBirdGenerationRequestPayload} payload - request payload
 * @param {Function} handleProgress - updates progress of request
 * @returns {Promise<{colored: any[];transparent: any[];}>|Error}
 */
export async function generateMoonBirdEmojis(
  payload: TMoonBirdGenerationRequestPayload,
  handleProgress: (loaded: number, total: number) => void,
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MOONBIRDS_GENERATOR_URL}/api/v1/emojis/generateV3`,
      payload,
      {
        onUploadProgress(progressEvent) {
          handleProgress(progressEvent.loaded, progressEvent.total ?? 0);
        },
      },
    );

    return {
      colored: response.data.colored ?? [],
      transparent: response.data.transparent ?? [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
    // return false;
  }
}
/**
 * generate image using using promises
 *
 * @param tokenId - id of token
 * @param emoji_type - type of emoji
 * @returns {Object} generated image
 */
export async function generateMoonBirdEmoji(
  tokenId: number,
  emoji_type: string,
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOONBIRDS_GENERATOR_URL}/api/v1/emojis/generateV2?tokenId=${tokenId}&emoji_type=${emoji_type}`,
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        colored: data.colored,
        transparent: data.transparent,
        emojiType: emoji_type,
      };
    });

  // try {
  //   const response =  await fetch(
  //     `${process.env.NEXT_PUBLIC_MOONBIRDS_GENERATOR_URL}/api/v1/emojis/generateV2?tokenId=${tokenId}&emoji_type=${emoji_type}`,
  //   );

  //   const data = await response.json();
  //   console.log("API response:", data);

  //   const colored = data.colored;
  //   const transparent = data.transparent;

  //   return { colored, transparent };
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return false;
  // } finally {
  // }
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
