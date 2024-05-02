import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bufferToImageSource(
  bufferData: number[],
  type: 'png' | 'webp'
) {
  // Convert the Buffer data (Uint8Array) to a base64-encoded string
  const base64String = btoa(String.fromCharCode.apply(null, bufferData));

  return `data:image/${type};base64,${base64String}`;
}

export function randomId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  let result = '';

  // Ensure that the first character is a letter
  result += characters.charAt(Math.floor(Math.random() * 52));

  for (let i = 1; i < 10; i++) {
    // Avoid consecutive underscores
    let nextCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    while (nextCharacter === '_' && result.charAt(i - 1) === '_') {
      nextCharacter = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    result += nextCharacter;
  }

  return result;
}

export function arrayBufferToBase64(buffer: number[]) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

export function gifArrayBufferToBase64(buffer: number[]) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/gif;base64,${btoa(binary)}`;
}
