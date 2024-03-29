/* eslint-disable no-async-promise-executor */
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { firebaseStorage } from './config';

export async function uploadStickerToFirebase(
  tokenId: string,
  base64Data: string,
  platform: 'telegram' | 'discord',
  type: 'png' | 'gif'
) {
  const metadata = {
    contentType: `image/${type}`,
  };

  const upload: string = await new Promise(async (resolve, reject) => {
    const currentDate = new Date(Date.now()).toISOString();
    const base64Response = await fetch(base64Data);
    const blob = await base64Response.blob();

    const storageRef = ref(
      firebaseStorage,
      `Wizards/${platform}/${tokenId}/${currentDate}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Uploading - ${percent} %`);
      },
      (error) => {
        console.log('Firebase storage upload error', { error });
        return reject(undefined);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Done. Sticker available at', downloadURL);
          return resolve(downloadURL);
        });
      }
    );
  });

  return upload;
}
