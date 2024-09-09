// import React, { useState } from 'react';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../../configuration/firebaseConfig'; // Go up one directory level to import firebase.js


// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [url, setUrl] = useState('');
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please select a file first");
//       return;
//     }

//     const storageRef = ref(storage, `images/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(progress);
//       },
//       (error) => {
//         console.error("Upload failed: ", error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//         });
//       }
//     );
//   };

//   return (
//     <div>
//       <h2>Upload a File</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>Progress: {progress}%</p>
//       {url && (
//         <div>
//           <p>File available at:</p>
//           <a href={url} target="_blank" rel="noreferrer">{url}</a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// src/utils/fileUploadUtils.js
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
