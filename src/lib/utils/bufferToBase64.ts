export function bufferToImageSource(
  bufferData: number[],
  type: "png" | "webp",
) {
  // Convert the Buffer data (Uint8Array) to a base64-encoded string
  const base64String = btoa(String.fromCharCode.apply(null, bufferData));

  return `data:image/${type};base64,${base64String}`;
}

export function arrayBufferToBase64(buffer: number[]) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

export function gifArrayBufferToBase64(buffer: number[]) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/gif;base64,${btoa(binary)}`;
}
