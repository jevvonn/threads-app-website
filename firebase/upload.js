import { storage } from ".";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export async function SingleUpload(file, name, bucket) {
  if (!file) {
    throw new Error("Not file included");
  }

  const storageRef = ref(storage, `/${bucket}/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const result = await uploadTask;
  const url = await getDownloadURL(result.ref);

  return url;
}
