// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import FormConfirmButton from "../common/FormConfirmButton";
// import geminiApi from "../../api/GeminiApi"; // Ensure the correct path
// import SpeechToText from "./SpeechToText"; // Import SpeechToText component

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

//   const title = watch("title");
//   const artist = watch("artist");
//   const createdDateByArtist = watch("createdDateByArtist");
//   const imageUrl = watch("imageUrl");
//   const description = watch("description"); // Watch the description field

//   // State to toggle SpeechToText visibility
//   const [showSpeechToText, setShowSpeechToText] = useState(false);

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
//     if (title && artist && createdDateByArtist) {
//       try {
//         const generatedDescription = await geminiApi.generateArtworkDescription(
//           { title, artist, createdDateByArtist, imageUrl, description }
//         );
//         setValue("description", generatedDescription); // Fill in the Description field
//       } catch (error) {
//         console.error("Error generating AI description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert(
//         "Please enter the title, artist, and created date before generating an AI description."
//       );
//     }
//   };

//   const handleFormSubmit = async (data) => {
//     try {
//       await onSubmit(data);
//       if (formType === "create") {
//         reset(); // Reset the form after a successful creation
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error);
//     }
//   };

//   const handleDeleteArtwork = async () => {
//     try {
//       await onDelete();
//     } catch (error) {
//       console.error("There was an error deleting the artwork!", error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">
//         {formType === "edit" ? "Edit Artwork" : "Create New Artwork"}
//       </h2>
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.title ? "border-red-500" : ""
//             }`}
//             id="title"
//             type="text"
//             {...register("title", { required: true })}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-xs italic">Please enter a title.</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="artist"
//           >
//             Artist Name
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.artist ? "border-red-500" : ""
//             }`}
//             id="artist"
//             type="text"
//             {...register("artist", { required: true })}
//           />
//           {errors.artist && (
//             <p className="text-red-500 text-xs italic">
//               Please enter the artist name.
//             </p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="createdDateByArtist"
//           >
//             Created Date by Artist
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.createdDateByArtist ? "border-red-500" : ""
//             }`}
//             id="createdDateByArtist"
//             type="date"
//             {...register("createdDateByArtist", { required: true })}
//           />
//           {errors.createdDateByArtist && (
//             <p className="text-red-500 text-xs italic">
//               Please enter the created date by the artist.
//             </p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="imageUrl"
//           >
//             Image URL
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.imageUrl ? "border-red-500" : ""
//             }`}
//             id="imageUrl"
//             type="text"
//             {...register("imageUrl", { required: true })}
//           />
//           {errors.imageUrl && (
//             <p className="text-red-500 text-xs italic">
//               Please enter the image URL.
//             </p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.description ? "border-red-500" : ""
//             }`}
//             id="description"
//             {...register("description", { required: true })}
//           ></textarea>
//           {errors.description && (
//             <p className="text-red-500 text-xs italic">
//               Please enter a description.
//             </p>
//           )}
//         </div>

//         {/* Toggle Speech-to-Text */}
//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={() => setShowSpeechToText(!showSpeechToText)} // Toggle visibility
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             {showSpeechToText ? "Hide Speech to Text" : "Use Speech to Text"}
//           </button>
//         </div>

//         {/* Conditionally render SpeechToText */}
//         {showSpeechToText && (
//           <div className="mb-4">
//             <SpeechToText
//               finalTranscript={description}
//               setFinalTranscript={(value) => setValue("description", value)}
//             />
//           </div>
//         )}

//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={handleGenerateDescription}
//             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Generate AI Description
//           </button>
//         </div>

//         <div
//           className={`flex ${
//             formType === "edit"
//               ? "items-center justify-between"
//               : "justify-center"
//           }`}
//         >
//           <FormConfirmButton
//             onSubmit={handleSubmit(handleFormSubmit)}
//             buttonText={
//               formType === "edit" ? "Update Artwork" : "Create Artwork"
//             }
//             dialogMessage={`Are you sure you want to ${
//               formType === "edit" ? "update" : "create"
//             } this artwork?`}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           />
//           {formType === "edit" && (
//             <FormConfirmButton
//               onSubmit={handleSubmit(handleDeleteArtwork)}
//               buttonText="Delete Artwork"
//               dialogMessage="Are you sure you want to delete this artwork?"
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             />
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ArtworkForm;

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import FormConfirmButton from "../common/FormConfirmButton";
// import geminiApi from "../../api/GeminiApi"; // Ensure the correct path
// import SpeechToText from "./SpeechToText"; // Import SpeechToText component
// import { uploadFile } from "./FileUpload";

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

//   const title = watch("title");
//   const artist = watch("artist");
//   const createdDateByArtist = watch("createdDateByArtist");
//   const imageUrl = watch("imageUrl");
//   const description = watch("description"); // Watch the description field

//   // State to toggle SpeechToText visibility
//   const [showSpeechToText, setShowSpeechToText] = useState(false);

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
//       alert("Please upload the image before generating the description.");
//       return;
//     }

//     if (title && artist && createdDateByArtist) {
//       try {
//         const generatedDescription = await geminiApi.generateArtworkDescription({
//           title,
//           artist,
//           createdDateByArtist,
//           imageUrl: url,  // Use `url` instead of `imageUrl` to ensure the uploaded URL is passed
//           description,
//         });
//         setValue("description", generatedDescription); // Fill in the Description field
//       } catch (error) {
//         console.error("Error generating AI description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert(
//         "Please enter the title, artist, created date, and upload an image before generating an AI description."
//       );
//     }
//   };

//   const handleFormSubmit = async (data) => {
//     try {
//       await onSubmit({ ...data, imageUrl: url }); // Include image URL in submission data
//       if (formType === "create") {
//         reset(); // Reset the form after a successful creation
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error);
//     }
//   };

//   const handleDeleteArtwork = async () => {
//     try {
//       await onDelete();
//     } catch (error) {
//       console.error("There was an error deleting the artwork!", error);
//     }
//   };

//   // State for file upload
//   const [file, setFile] = useState(null);
//   const [url, setUrl] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUrl(""); // Reset the URL if a new file is selected
//   };

//   // Handle file upload when clicking the upload button
//   const handleUpload = () => {
//     if (!file) {
//       alert("Please select a file first");
//       return;
//     }

//     setUploading(true); // Start uploading
//     uploadFile(
//       file,
//       (progress) => setProgress(progress), // Update progress
//       (url) => {
//         setUrl(url); // Set the file URL on successful upload
//         setValue("imageUrl", url); // Set the value of imageUrl in the form
//         setUploading(false); // End the upload state
//       },
//       (error) => {
//         console.error("Upload failed: ", error); // Log the error
//         setUploading(false); // End the upload state
//       }
//     );
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">
//         {formType === "edit" ? "Edit Artwork" : "Create New Artwork"}
//       </h2>
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.title ? "border-red-500" : ""
//             }`}
//             id="title"
//             type="text"
//             {...register("title", { required: true })}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-xs italic">Please enter a title.</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="artist"
//           >
//             Artist Name
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.artist ? "border-red-500" : ""
//             }`}
//             id="artist"
//             type="text"
//             {...register("artist", { required: true })}
//           />
//           {errors.artist && (
//             <p className="text-red-500 text-xs italic">
//               Please enter the artist name.
//             </p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="createdDateByArtist"
//           >
//             Created Date by Artist
//           </label>
//           <input
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.createdDateByArtist ? "border-red-500" : ""
//             }`}
//             id="createdDateByArtist"
//             type="date"
//             {...register("createdDateByArtist", { required: true })}
//           />
//           {errors.createdDateByArtist && (
//             <p className="text-red-500 text-xs italic">
//               Please enter the created date by the artist.
//             </p>
//           )}
//         </div>

//         {/* Image Upload Section */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="imageUrl"
//           >
//             Image Upload
//           </label>
//           <input type="file" onChange={handleFileChange} />
//           <button
//             onClick={handleUpload}
//             type="button"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             disabled={uploading || !file}
//           >
//             {uploading ? "Uploading..." : "Upload"}
//           </button>
//           {uploading && <p>Progress: {progress}%</p>}
//           {url && (
//             <div className="mt-2">
//               <p>Uploaded Image:</p>
//               <img src={url} alt="Uploaded" className="w-20 h-20 object-cover" />
//               <a href={url} target="_blank" rel="noreferrer" className="text-blue-500">
//                 View Image
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.description ? "border-red-500" : ""
//             }`}
//             id="description"
//             {...register("description", { required: true })}
//           ></textarea>
//           {errors.description && (
//             <p className="text-red-500 text-xs italic">
//               Please enter a description.
//             </p>
//           )}
//         </div>

//         {/* Toggle Speech-to-Text */}
//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={() => setShowSpeechToText(!showSpeechToText)} // Toggle visibility
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             {showSpeechToText ? "Hide Speech to Text" : "Use Speech to Text"}
//           </button>
//         </div>

//         {/* Conditionally render SpeechToText */}
//         {showSpeechToText && (
//           <div className="mb-4">
//             <SpeechToText
//               finalTranscript={description}
//               setFinalTranscript={(value) => setValue("description", value)}
//             />
//           </div>
//         )}

//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={handleGenerateDescription}
//             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Generate AI Description
//           </button>
//         </div>

//         <div
//           className={`flex ${
//             formType === "edit"
//               ? "items-center justify-between"
//               : "justify-center"
//           }`}
//         >
//           <FormConfirmButton
//             onSubmit={handleSubmit(handleFormSubmit)}
//             buttonText={
//               formType === "edit" ? "Update Artwork" : "Create Artwork"
//             }
//             dialogMessage={`Are you sure you want to ${
//               formType === "edit" ? "update" : "create"
//             } this artwork?`}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           />
//           {formType === "edit" && (
//             <FormConfirmButton
//               onSubmit={handleSubmit(handleDeleteArtwork)}
//               buttonText="Delete Artwork"
//               dialogMessage="Are you sure you want to delete this artwork?"
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             />
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ArtworkForm;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormConfirmButton from "../common/FormConfirmButton";
import geminiApi from "../../api/GeminiApi"; // Ensure the correct path
import SpeechToText from "./SpeechToText"; // Import SpeechToText component
import { uploadFile } from "./FileUpload";

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

  const title = watch("title");
  const artist = watch("artist");
  const createdDateByArtist = watch("createdDateByArtist");
  const description = watch("description"); // Watch the description field

  // State to toggle SpeechToText visibility
  const [showSpeechToText, setShowSpeechToText] = useState(false);

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
      alert("Please upload the image before generating the description.");
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
        "Please enter the title, artist, created date, and upload an image before generating an AI description."
      );
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({ ...data, imageUrl: url }); // Include image URL in submission data
      if (formType === "create") {
        reset(); // Reset the form after a successful creation
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleDeleteArtwork = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error("There was an error deleting the artwork!", error);
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
        }
      );
    }
  };

  return (
    <div className=" mx-auto  mt-10 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold m-4">
        {formType === "edit" ? "Edit Artwork" : "Create New Artwork"}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? "border-red-500" : ""
            }`}
            id="title"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="artist"
          >
            Artist Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.artist ? "border-red-500" : ""
            }`}
            id="artist"
            type="text"
            {...register("artist", { required: true })}
          />
          {errors.artist && (
            <p className="text-red-500 text-xs italic">
              Please enter the artist name.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="createdDateByArtist"
          >
            Created Date by Artist
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.createdDateByArtist ? "border-red-500" : ""
            }`}
            id="createdDateByArtist"
            type="date"
            {...register("createdDateByArtist", { required: true })}
          />
          {errors.createdDateByArtist && (
            <p className="text-red-500 text-xs italic">
              Please enter the created date by the artist.
            </p>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image Upload
          </label>
          <input type="file" onChange={handleFileChange} />
          {uploading && <p>Progress: {progress}%</p>}
          {url && (
            <div className="mt-2 text-center">
              <p>
                {formType === "edit" && !file
                  ? "Existing Image:"
                  : "Uploaded Image:"}
              </p>
              <img
                src={url}
                alt="Uploaded"
                className="w-48 h-48 mx-auto rounded-lg" // Bigger size, centered, and rounded
              />
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Image
              </a>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description ? "border-red-500" : ""
            }`}
            id="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              Please enter a description.
            </p>
          )}
        </div>

        {/* Toggle Speech-to-Text */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowSpeechToText(!showSpeechToText)} // Toggle visibility
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showSpeechToText ? "Hide Speech to Text" : "Use Speech to Text"}
          </button>
        </div>

        {/* Conditionally render SpeechToText */}
        {showSpeechToText && (
          <div className="mb-4">
            <SpeechToText
              finalTranscript={description}
              setFinalTranscript={(value) => setValue("description", value)}
            />
          </div>
        )}

        <div className="mb-4">
          <button
            type="button"
            onClick={handleGenerateDescription}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate AI Description
          </button>
        </div>

        <div
          className={`flex ${
            formType === "edit"
              ? "items-center justify-between"
              : "justify-center"
          }`}
        >
          <FormConfirmButton
            onSubmit={handleSubmit(handleFormSubmit)}
            buttonText={
              formType === "edit" ? "Update Artwork" : "Create Artwork"
            }
            dialogMessage={`Are you sure you want to ${
              formType === "edit" ? "update" : "create"
            } this artwork?`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
          {formType === "edit" && (
            <FormConfirmButton
              onSubmit={handleSubmit(handleDeleteArtwork)}
              buttonText="Delete Artwork"
              dialogMessage="Are you sure you want to delete this artwork?"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ArtworkForm;
