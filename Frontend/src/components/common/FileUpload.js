
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configuration/firebaseConfig'; // Ensure the correct path to your Firebase config

// Function to handle file upload
export const uploadFile = (file, onProgress, onSuccess, onError) => {
  if (!file) {
    alert("Please select a file first");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (onProgress) onProgress(progress); // Call the onProgress callback with the progress value
    },
    (error) => {
      if (onError) onError(error); // Handle error
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (onSuccess) onSuccess(downloadURL); // Provide the URL after upload
      });
    }
  );
};
