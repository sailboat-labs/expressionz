import { TWizardGeneratorAPIPayload } from "@/types/wizard.type";
import axios from "axios";

export async function generateWizards(
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

    console.log("Wizards API Response", response);

    return {
      colored: response.data.colored ?? [],
      transparent: response.data.transparent ?? [],
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
