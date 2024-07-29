import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './init'; // Ensure this path is correct

export async function uploadProfilePicture(file: File, userId: string): Promise<string> {
  const storageRef = ref(storage, `profile_pictures/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
