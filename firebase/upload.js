import { storage } from ".";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export async function SingleUpload(file, name, bucket) {
  if (!file) {
    throw new Error("Not file included");
  }

  const storageRef = ref(storage, `/${bucket}/${name}`);

  try {
    const result = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(result.ref);

    return url;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
