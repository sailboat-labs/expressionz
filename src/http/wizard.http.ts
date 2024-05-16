import { TGeneratorResponse } from "@/types/misc.type";
import { TWizardGeneratorAPIPayload } from "@/types/wizard.type";
import axios from "axios";

export async function generateWizardEmojis(
  payload: TWizardGeneratorAPIPayload,
  handleProgress: (loaded: number, total: number) => void,
) {
  try {
    // console.log({ payload });
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WIZARDS_GENERATOR_URL}/api/v1/emojis/generateV3`,
      payload,
      {
        onUploadProgress(progressEvent) {
          handleProgress(progressEvent.loaded, progressEvent.total ?? 0);
        },
      },
    );
    let { colored, transparent } = response.data as TGeneratorResponse;

    return {
      colored,
      transparent,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



// export async function generateWizardsEmojis(
//   payload: TWizardGeneratorAPIPayload,
//   handleProgress: (loaded: number, total: number) => void,
// ) {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_WIZARDS_GENERATOR_URL}/api/v1/emojis/generateV3`,
//       payload,
//       {
//         onUploadProgress(progressEvent) {
//           handleProgress(progressEvent.loaded, progressEvent.total ?? 0);
//         },
//       },
//     );

//     return {
//       colored: response.data.colored ?? [],
//       transparent: response.data.transparent ?? [],
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// export async function generateWizardsGifs(
//   payload: TWizardGeneratorAPIPayload,
//   handleProgress: (loaded: number, total: number) => void,
// ) {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_WIZARDS_GENERATOR_URL}/api/v1/gifs/generateV3`,
//       payload,
//       {
//         onUploadProgress(progressEvent) {
//           handleProgress(progressEvent.loaded, progressEvent.total ?? 0);
//         },
//       },
//     );

//     return {
//       colored: response.data.colored ?? [],
//       transparent: response.data.transparent ?? [],
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }
