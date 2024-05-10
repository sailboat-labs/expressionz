import JSZip from "jszip";

import { arrayBufferToBase64, gifArrayBufferToBase64 } from "./misc.lib";

export async function download(path: string, index: number) {
  const response = await fetch(path);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wizard_${index}.webp`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadPfp(path: string, index: number) {
  const response = await fetch(path);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `moonbird_${index}.webp`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadImagesAsZip(files: any[], token: number) {
  const zip = new JSZip();

  // Loop over the array of image URLs
  for (let i = 0; i < files.length; i++) {
    const image = files[i];

    if (image.type === "gif") {
      const gif = image.image.data;
      const response = await fetch(gifArrayBufferToBase64(gif));
      const blob = await response.blob();
      zip.file(`${image.emoji_type}.gif`, blob, { binary: true });
    } else {
      const _image = image.image.data;
      const response = await fetch(arrayBufferToBase64(_image));
      const blob = await response.blob();
      zip.file(`${image.emoji_type}.png`, blob, { binary: true });
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Wizard of Ord #${token}`;
  link.click();
  URL.revokeObjectURL(url);
}
