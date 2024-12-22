// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import FormConfirmButton from "../common/FormConfirmButton";
// import geminiApi from "../../api/GeminiApi";
// import SpeechToText from "./SpeechToText";
// import { uploadFile } from "./FileUpload";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import { useLang } from "../../contexts/LangContext"; // Import useLang
// import { FaMagic } from "react-icons/fa";
// import AudioRecorder from "./AudioRecorder";

// const ArtworkForm = ({
//   onSubmit,
//   onDelete,
//   initialData = {},
//   formType,
//   onSuccess,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     watch,
//   } = useForm({ defaultValues: initialData });
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
//   const { language } = useLang(); // Destructure language from LangContext

//   // Translation object
//   const translations = {
//     en: {
//       title: "Title",
//       artistName: "Artist Name",
//       createdDate: "Created Date by Artist",
//       imageUpload: "Image Upload",
//       description: "Description",
//       useSpeechToText: "Use Speech to Text",
//       hideSpeechToText: "Hide Speech to Text",
//       generateAIDescription: "Generate AI Description",
//       recordDescription: "Record Description",
//       createArtwork: "Create Artwork",
//       updateArtwork: "Update Artwork",
//       deleteArtwork: "Delete Artwork",
//       createButton: "Create Artwork",
//       updateButton: "Update Artwork",
//       deleteButton: "Delete Artwork",
//       dialogCreate: "Are you sure you want to create this artwork?",
//       dialogUpdate: "Are you sure you want to update this artwork?",
//       dialogDelete: "Are you sure you want to delete this artwork?",
//       pleaseEnterTitle: "Please enter a title.",
//       pleaseEnterArtistName: "Please enter the artist name.",
//       pleaseEnterCreatedDate: "Please enter the created date by the artist.",
//       pleaseEnterDescription: "Please enter a description.",
//       pleaseUploadImage:
//         "Please upload the image before generating the description.",
//       progress: "Progress",
//       existingImage: "Existing Image:",
//       uploadedImage: "Uploaded Image:",
//       viewImage: "View Image",
//     },
//     he: {
//       title: ":כותרת",
//       artistName: ":שם האמן",
//       createdDate: ":תאריך יצירה על ידי האמן",
//       imageUpload: "העלאת תמונה",
//       description: ":תיאור",
//       useSpeechToText: "השתמש בדיבור לטקסט",
//       hideSpeechToText: "הסתר דיבור לטקסט",
//       generateAIDescription: "צור תיאור באמצעות AI",
//       recordDescription: "הקלט תיאור",
//       createArtwork: "צור יצירה",
//       updateArtwork: "עדכן יצירה",
//       deleteArtwork: "מחק יצירה",
//       createButton: "צור יצירה",
//       updateButton: "עדכן יצירה",
//       deleteButton: "מחק יצירה",
//       dialogCreate: "האם אתה בטוח שברצונך ליצור יצירה זו?",
//       dialogUpdate: "האם אתה בטוח שברצונך לעדכן יצירה זו?",
//       dialogDelete: "האם אתה בטוח שברצונך למחוק יצירה זו?",
//       pleaseEnterTitle: "אנא הכנס כותרת.",
//       pleaseEnterArtistName: "אנא הכנס את שם האמן.",
//       pleaseEnterCreatedDate: "אנא הכנס תאריך יצירה.",
//       pleaseEnterDescription: "אנא הכנס תיאור.",
//       pleaseUploadImage: "אנא העלה את התמונה לפני יצירת התיאור.",
//       progress: "התקדמות",
//       existingImage: "תמונה קיימת:",
//       uploadedImage: "תמונה שהועלתה:",
//       viewImage: "הצג תמונה",
//     },
//   };

//   const t = translations[language]; // Get the current translations based on selected language

//   const title = watch("title");
//   const artist = watch("artist");
//   const createdDateByArtist = watch("createdDateByArtist");
//   const description = watch("description"); // Watch the description field

//   // State to toggle SpeechToText visibility
//   const [showSpeechToText, setShowSpeechToText] = useState(false);

//   // State for file upload
//   const [file, setFile] = useState(null);
//   const [url, setUrl] = useState(initialData.imageUrl || ""); // Use initialData imageUrl if in edit mode
//   const [progress, setProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       Object.keys(initialData).forEach((key) => {
//         if (key === "createdDateByArtist" && initialData[key]) {
//           setValue(key, initialData[key].split("T")[0]); // Set the date correctly
//         } else {
//           setValue(key, initialData[key]);
//         }
//       });
//     }
//   }, [initialData, setValue]);

//   const handleGenerateDescription = async () => {
//     if (!url) {
//       alert(t.pleaseUploadImage);
//       return;
//     }

//     if (title && artist && createdDateByArtist) {
//       try {
//         const generatedDescription = await geminiApi.generateArtworkDescription(
//           {
//             title,
//             artist,
//             createdDateByArtist,
//             imageUrl: url, // Use `url` instead of `imageUrl` to ensure the uploaded URL is passed
//             description,
//           }
//         );
//         setValue("description", generatedDescription); // Fill in the Description field
//       } catch (error) {
//         console.error("Error generating AI description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert(
//         t.pleaseEnterTitle +
//           ", " +
//           t.pleaseEnterArtistName +
//           ", " +
//           t.pleaseEnterCreatedDate
//       );
//     }
//   };

//   const handleFormSubmit = async (data) => {
//     try {
//       await onSubmit({ ...data, imageUrl: url }); // Include image URL in submission data
//       if (formType === "create") {
//         reset(); // Reset the form after a successful creation
//       }
//       if (onSuccess) {
//         onSuccess(); // Call onSuccess callback if provided
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error);
//       alert("Failed to submit the form. Please try again.");
//     }
//   };

//   const handleDeleteArtwork = async () => {
//     try {
//       await onDelete();
//     } catch (error) {
//       console.error("There was an error deleting the artwork!", error);
//       alert("Failed to delete the artwork. Please try again.");
//     }
//   };

//   // Handle file input change and upload file automatically
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setUrl(""); // Reset the URL if a new file is selected

//     if (selectedFile) {
//       // Upload the file immediately
//       setUploading(true);
//       uploadFile(
//         selectedFile,
//         (progress) => setProgress(progress), // Update progress
//         (url) => {
//           setUrl(url); // Set the file URL on successful upload
//           setValue("imageUrl", url); // Set the value of imageUrl in the form
//           setUploading(false); // End the upload state
//         },
//         (error) => {
//           console.error("Upload failed: ", error); // Log the error
//           setUploading(false); // End the upload state
//           alert("Failed to upload the image. Please try again.");
//         }
//       );
//     }
//   };

//   return (
//     <div className={`container mx-auto `}>
//       <div
//         className={`shadow  rounded-lg space-y-6 p-6 ${
//           isDarkMode ? "bg-gray-800" : "bg-gray-200"
//         }`}
//       >
//         <h2
//           className={`text-xl font-bold mb-4 ${
//             isDarkMode ? "text-white" : "text-gray-900"
//           }`}
//         >
//           {formType === "edit" ? t.updateArtwork : t.createArtwork}
//         </h2>
       
//         <form
//           onSubmit={handleSubmit(handleFormSubmit)}
//           className={`space-y-4  mx-8`}
//         >
//           {/* Title */}
//           <div className="w-full">
//             <label
//               className={`block text-sm font-bold mb-2 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//               htmlFor="title"
//             >
//               {t.title}
//             </label>
//             <input
//               className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
//                 errors.title
//                   ? "border-red-500"
//                   : isDarkMode
//                   ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
//                   : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
//               }`}
//               id="title"
//               type="text"
//               {...register("title", { required: true })}
//             />
//             {errors.title && (
//               <p className="text-red-500 text-xs italic">
//                 {t.pleaseEnterTitle}
//               </p>
//             )}
//           </div>
 
//           {/* Artist Name */}
//           <div className="w-full">
//             <label
//               className={`block text-sm font-bold mb-2 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//               htmlFor="artist"
//             >
//               {t.artistName}
//             </label>
//             <input
//               className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
//                 errors.artist
//                   ? "border-red-500"
//                   : isDarkMode
//                   ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
//                   : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
//               }`}
//               id="artist"
//               type="text"
//               {...register("artist", { required: true })}
//             />
//             {errors.artist && (
//               <p className="text-red-500 text-xs italic">
//                 {t.pleaseEnterArtistName}
//               </p>
//             )}
//           </div>

//           {/* Created Date by Artist */}
//           <div className="w-full">
//             <label
//               className={`block text-sm font-bold mb-2 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//               htmlFor="createdDateByArtist"
//             >
//               {t.createdDate}
//             </label>
//             <input
//               className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
//                 errors.createdDateByArtist
//                   ? "border-red-500"
//                   : isDarkMode
//                   ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
//                   : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
//               }`}
//               id="createdDateByArtist"
//               type="date"
//               {...register("createdDateByArtist", { required: true })}
//             />
//             {errors.createdDateByArtist && (
//               <p className="text-red-500 text-xs italic">
//                 {t.pleaseEnterCreatedDate}
//               </p>
//             )}
//           </div>

//           {/* Image Upload Section */}
//           <div className="w-full">
//             <label
//               className={`block text-sm font-bold mb-2 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//               htmlFor="imageUrl"
//             >
//               {t.imageUpload}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="block w-full"
//             />
//             {uploading && (
//               <p
//                 className={`mt-2 ${
//                   isDarkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 {t.progress}: {progress}%
//               </p>
//             )}
//             {url && (
//               <div className="mt-4 flex flex-col items-center">
//                 <p
//                   className={`${
//                     isDarkMode ? "text-gray-300" : "text-gray-700"
//                   }`}
//                 >
//                   {formType === "edit" && !file
//                     ? t.existingImage
//                     : t.uploadedImage}
//                 </p>
//                 <img
//                   src={url}
//                   alt="Uploaded"
//                   className="w-48 h-48 mt-2 rounded-lg object-cover"
//                 />
//                 <a
//                   href={url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-500 mt-2"
//                 >
//                   {t.viewImage}
//                 </a>
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div className="w-full">
//             <label
//               className={`block text-sm font-bold mb-2 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//               htmlFor="description"
//             >
//               {t.description}
//             </label>
//             <textarea
//               className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
//                 errors.description
//                   ? "border-red-500"
//                   : isDarkMode
//                   ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
//                   : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
//               }`}
//               id="description"
//               {...register("description", { required: true })}
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-xs italic">
//                 {t.pleaseEnterDescription}
//               </p>
//             )}
//           </div>

//           {/* Toggle Speech-to-Text */}
//           <div className="w-full flex justify-center ">
//             <button
//               type="button"
//               onClick={() => setShowSpeechToText(!showSpeechToText)}
//               className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2
//                   transition-all duration-300 ease-in-out
//                   hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400
//                   focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
//             >
//               {showSpeechToText ? t.hideSpeechToText : t.useSpeechToText}
//             </button>
//           </div>

//           {/* Conditionally render SpeechToText */}
//           {showSpeechToText && (
//             <div className="w-full">
//               <SpeechToText
//                 finalTranscript={description}
//                 setFinalTranscript={(value) => setValue("description", value)}
//               />
//             </div>
//           )}

//           {/* Generate AI Description Button */}
//           <div className="mb-2 flex justify-center">
//             <button
//               type="button"
//               onClick={handleGenerateDescription}
//               className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2
//                 transition-all duration-300 ease-in-out
//                 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400
//                 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
//             >
//               <FaMagic className="text-gray-500 dark:text-gray-300" />{" "}
//               {t.generateAIDescription}
//             </button>
//           </div>

         
//           {/* Submit and Delete Buttons */}
//           <div className="w-full flex flex-col items-center space-y-4">
//             {/* Save/Update Button */}
//             <div className="flex justify-center">
//               <FormConfirmButton
//                 onSubmit={handleSubmit(handleFormSubmit)}
//                 buttonText={
//                   formType === "edit" ? t.updateButton : t.createButton
//                 }
//                 dialogMessage={
//                   formType === "edit" ? t.dialogUpdate : t.dialogCreate
//                 }
//                 className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                   isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
//                 } transition-colors duration-300`}
//               />
//             </div>
         
//             {/* Delete Button (only in edit mode) */}
//             {formType === "edit" && (
//               <div className="flex justify-center">
//                 <FormConfirmButton
//                   onSubmit={handleSubmit(handleDeleteArtwork)}
//                   buttonText={t.deleteButton}
//                   dialogMessage={t.dialogDelete}
//                   className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                     isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
//                   } transition-colors duration-300`}
//                 />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ArtworkForm;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormConfirmButton from "../common/FormConfirmButton";
import geminiApi from "../../api/GeminiApi";
import SpeechToText from "./SpeechToText";
import { uploadFile } from "./FileUpload";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext"; // Import useLang
import { FaMagic } from "react-icons/fa";
import AudioRecorder from "./AudioRecorder";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../configuration/firebaseConfig";


const ArtworkForm = ({
  onSubmit,
  onDelete,
  initialData = {},
  formType,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({ defaultValues: initialData });
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
  const { language } = useLang(); // Destructure language from LangContext

  // Translation object
  const translations = {
    en: {
      title: "Title",
      artistName: "Artist Name",
      createdDate: "Created Date by Artist",
      imageUpload: "Image Upload",
      description: "Description",
      useSpeechToText: "Use Speech to Text",
      hideSpeechToText: "Hide Speech to Text",
      generateAIDescription: "Generate AI Description",
      recordDescription: "Record Description",
      createArtwork: "Create Artwork",
      updateArtwork: "Update Artwork",
      deleteArtwork: "Delete Artwork",
      createButton: "Create Artwork",
      updateButton: "Update Artwork",
      deleteButton: "Delete Artwork",
      dialogCreate: "Are you sure you want to create this artwork?",
      dialogUpdate: "Are you sure you want to update this artwork?",
      dialogDelete: "Are you sure you want to delete this artwork?",
      pleaseEnterTitle: "Please enter a title.",
      pleaseEnterArtistName: "Please enter the artist name.",
      pleaseEnterCreatedDate: "Please enter the created date by the artist.",
      pleaseEnterDescription: "Please enter a description.",
      pleaseUploadImage:
        "Please upload the image before generating the description.",
      progress: "Progress",
      existingImage: "Existing Image:",
      uploadedImage: "Uploaded Image:",
      viewImage: "View Image",
    },
    he: {
      title: ":כותרת",
      artistName: ":שם האמן",
      createdDate: ":תאריך יצירה על ידי האמן",
      imageUpload: "העלאת תמונה",
      description: ":תיאור",
      useSpeechToText: "השתמש בדיבור לטקסט",
      hideSpeechToText: "הסתר דיבור לטקסט",
      generateAIDescription: "צור תיאור באמצעות AI",
      recordDescription: "הקלט תיאור",
      createArtwork: "צור יצירה",
      updateArtwork: "עדכן יצירה",
      deleteArtwork: "מחק יצירה",
      createButton: "צור יצירה",
      updateButton: "עדכן יצירה",
      deleteButton: "מחק יצירה",
      dialogCreate: "האם אתה בטוח שברצונך ליצור יצירה זו?",
      dialogUpdate: "האם אתה בטוח שברצונך לעדכן יצירה זו?",
      dialogDelete: "האם אתה בטוח שברצונך למחוק יצירה זו?",
      pleaseEnterTitle: "אנא הכנס כותרת.",
      pleaseEnterArtistName: "אנא הכנס את שם האמן.",
      pleaseEnterCreatedDate: "אנא הכנס תאריך יצירה.",
      pleaseEnterDescription: "אנא הכנס תיאור.",
      pleaseUploadImage: "אנא העלה את התמונה לפני יצירת התיאור.",
      progress: "התקדמות",
      existingImage: "תמונה קיימת:",
      uploadedImage: "תמונה שהועלתה:",
      viewImage: "הצג תמונה",
    },
  };

  const t = translations[language]; // Get the current translations based on selected language

  const title = watch("title");
  const artist = watch("artist");
  const createdDateByArtist = watch("createdDateByArtist");
  const description = watch("description"); // Watch the description field

  // State to toggle SpeechToText visibility
  const [showSpeechToText, setShowSpeechToText] = useState(false);


  const [audioBlob, setAudioBlob] = useState(null);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  const [existingRecordUrl] = useState(
    initialData.recordUrl || ""
  );


  // State for file upload
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(initialData.imageUrl || ""); // Use initialData imageUrl if in edit mode
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);



  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        if (key === "createdDateByArtist" && initialData[key]) {
          setValue(key, initialData[key].split("T")[0]); // Set the date correctly
        } else {
          setValue(key, initialData[key]);
        }
      });
    }
  }, [initialData, setValue]);

  const handleGenerateDescription = async () => {
    if (!url) {
      alert(t.pleaseUploadImage);
      return;
    }

    if (title && artist && createdDateByArtist) {
      try {
        const generatedDescription = await geminiApi.generateArtworkDescription(
          {
            title,
            artist,
            createdDateByArtist,
            imageUrl: url, // Use `url` instead of `imageUrl` to ensure the uploaded URL is passed
            description,
          }
        );
        setValue("description", generatedDescription); // Fill in the Description field
      } catch (error) {
        console.error("Error generating AI description:", error);
        alert("Failed to generate AI description.");
      }
    } else {
      alert(
        t.pleaseEnterTitle +
          ", " +
          t.pleaseEnterArtistName +
          ", " +
          t.pleaseEnterCreatedDate
      );
    }
  };

const handleFormSubmit = async (data) => {
  let finalAudioUrl = existingRecordUrl;

    // 1. If we have an audioBlob, upload it to Firebase here.
    if (audioBlob) {
      try {
        const audioStorageRef = ref(
          storage,
          `audio/${Date.now()}-recording.webm`
        );
        const uploadTask = uploadBytesResumable(audioStorageRef, audioBlob);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => reject(error),
            async () => {
              finalAudioUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Audio download URL:", finalAudioUrl);
              resolve();
            }
          );
        });
      } catch (error) {
        console.error("Error uploading audio:", error);
        alert("Failed to upload audio. Please try again.");
      }
    }

    // 2. Submit the rest of the data (with imageUrl and finalAudioUrl)
    try {
      await onSubmit({
        ...data,
        imageUrl: url,                   // The uploaded image URL
        recordUrl: finalAudioUrl , // If we have a new one or fallback
      });
      if (formType === "create") {
        reset();
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const handleDeleteArtwork = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error("There was an error deleting the artwork!", error);
      alert("Failed to delete the artwork. Please try again.");
    }
  };

  // Handle file input change and upload file automatically
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUrl(""); // Reset the URL if a new file is selected

    if (selectedFile) {
      // Upload the file immediately
      setUploading(true);
      uploadFile(
        selectedFile,
        (progress) => setProgress(progress), // Update progress
        (url) => {
          setUrl(url); // Set the file URL on successful upload
          setValue("imageUrl", url); // Set the value of imageUrl in the form
          setUploading(false); // End the upload state
        },
        (error) => {
          console.error("Upload failed: ", error); // Log the error
          setUploading(false); // End the upload state
          alert("Failed to upload the image. Please try again.");
        }
      );
    }
  };

  const handleAudioReady = (blob) => {
    setAudioBlob(blob);
  };

  return (
    <div className={`container mx-auto `}>
      <div
        className={`shadow  rounded-lg space-y-6 p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {formType === "edit" ? t.updateArtwork : t.createArtwork}
        </h2>
        {existingRecordUrl && !audioBlob && (
          <div className="mb-4 text-center">
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Existing Audio:
            </p>
            <audio
              controls
              src={existingRecordUrl}
              className="mt-2"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {audioBlob && (
          <div className="mb-4 text-center">
            <p className="text-green-600">
              New audio recorded! (Will overwrite old audio on submit)
            </p>
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className={`space-y-4  mx-8`}
        >
          {/* Title */}
          <div className="w-full">
            <label
              className={`block text-sm font-bold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="title"
            >
              {t.title}
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.title
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              id="title"
              type="text"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">
                {t.pleaseEnterTitle}
              </p>
            )}
          </div>
 
          {/* Artist Name */}
          <div className="w-full">
            <label
              className={`block text-sm font-bold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="artist"
            >
              {t.artistName}
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.artist
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              id="artist"
              type="text"
              {...register("artist", { required: true })}
            />
            {errors.artist && (
              <p className="text-red-500 text-xs italic">
                {t.pleaseEnterArtistName}
              </p>
            )}
          </div>

          {/* Created Date by Artist */}
          <div className="w-full">
            <label
              className={`block text-sm font-bold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="createdDateByArtist"
            >
              {t.createdDate}
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.createdDateByArtist
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              id="createdDateByArtist"
              type="date"
              {...register("createdDateByArtist", { required: true })}
            />
            {errors.createdDateByArtist && (
              <p className="text-red-500 text-xs italic">
                {t.pleaseEnterCreatedDate}
              </p>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="w-full">
            <label
              className={`block text-sm font-bold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="imageUrl"
            >
              {t.imageUpload}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full"
            />
            {uploading && (
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t.progress}: {progress}%
              </p>
            )}
            {url && (
              <div className="mt-4 flex flex-col items-center">
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {formType === "edit" && !file
                    ? t.existingImage
                    : t.uploadedImage}
                </p>
                <img
                  src={url}
                  alt="Uploaded"
                  className="w-48 h-48 mt-2 rounded-lg object-cover"
                />
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 mt-2"
                >
                  {t.viewImage}
                </a>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="w-full">
            <label
              className={`block text-sm font-bold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="description"
            >
              {t.description}
            </label>
            <textarea
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.description
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              id="description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {t.pleaseEnterDescription}
              </p>
            )}
          </div>

          {/* Toggle Speech-to-Text */}
          <div className="w-full flex justify-center ">
            <button
              type="button"
              onClick={() => setShowSpeechToText(!showSpeechToText)}
              className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2
                  transition-all duration-300 ease-in-out
                  hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400
                  focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
            >
              {showSpeechToText ? t.hideSpeechToText : t.useSpeechToText}
            </button>
          </div>

          {/* Conditionally render SpeechToText */}
          {showSpeechToText && (
            <div className="w-full">
              <SpeechToText
                finalTranscript={description}
                setFinalTranscript={(value) => setValue("description", value)}
              />
            </div>
          )}

          {/* Generate AI Description Button */}
          <div className="mb-2 flex justify-center">
            <button
              type="button"
              onClick={handleGenerateDescription}
              className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2
                transition-all duration-300 ease-in-out
                hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400
                focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
            >
              <FaMagic className="text-gray-500 dark:text-gray-300" />{" "}
              {t.generateAIDescription}
            </button>
          </div>

          <div className="mb-2 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAudioRecorder(!showAudioRecorder)}
              className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2
                transition-all duration-300 ease-in-out
                hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400
                focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
              `}
            >
              {t.recordDescription}
            </button>
          </div>
          
          {/* Submit and Delete Buttons */}
          <div className="w-full flex flex-col items-center space-y-4">
            {/* Save/Update Button */}
            <div className="flex justify-center">
              <FormConfirmButton
                onSubmit={handleSubmit(handleFormSubmit)}
                buttonText={
                  formType === "edit" ? t.updateButton : t.createButton
                }
                dialogMessage={
                  formType === "edit" ? t.dialogUpdate : t.dialogCreate
                }
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
                } transition-colors duration-300`}
              />
            </div>
         
            {/* Delete Button (only in edit mode) */}
            {formType === "edit" && (
              <div className="flex justify-center">
                <FormConfirmButton
                  onSubmit={handleSubmit(handleDeleteArtwork)}
                  buttonText={t.deleteButton}
                  dialogMessage={t.dialogDelete}
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
                  } transition-colors duration-300`}
                />
              </div>
            )}
          </div>
        </form>
        {showAudioRecorder && (
          <AudioRecorder onAudioReady={handleAudioReady} />
        )}
      </div>
    </div>
  );
};

export default ArtworkForm;
