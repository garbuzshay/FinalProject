
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import FormConfirmButton from "../common/FormConfirmButton";
// import GoBackButton from "../common/GoBackButton";
// import { useForm } from "react-hook-form";
// import geminiApi from "../../api/GeminiApi";
// import { uploadFile } from "../common/FileUpload"; // Import file upload logic

// const CuratorEditExhibition = () => {
//   const { id } = useParams(); // Get exhibition ID from the URL
//   const navigate = useNavigate();
//   const { exhibitions, updateExhibition } = useMuseumContext();

//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");

//   // Memoize the exhibition data based on the ID
//   const exhibition = useMemo(
//     () => exhibitions.find((exhibit) => exhibit._id === id),
//     [id, exhibitions]
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset, // reset form values
//     watch,
//   } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//       imageUrl: "",
//     },
//   });

//   // Use effect to reset form when exhibition data is available
//   useEffect(() => {
//     if (exhibition) {
//       reset({
//         name: exhibition.name || "",
//         description: exhibition.description || "",
//         imageUrl: exhibition.imageUrl || "",
//       });
//       setUploadedImageUrl(exhibition.imageUrl || ""); // Set existing image URL
//     }
//   }, [exhibition, reset]); // Dependencies include exhibition and reset

//   const onSubmit = async (data) => {
//     try {
//       // Include the uploaded image URL in the form data
//       const finalData = {
//         ...data,
//         imageUrl: uploadedImageUrl || data.imageUrl,
//       };
//       await updateExhibition(id, finalData);
//       alert("Exhibition updated successfully");
//       navigate(-1); // Navigate back after updating
//     } catch (error) {
//       console.error("Error updating exhibition:", error);
//     }
//   };

//   const handleGenerateExhibitDescription = async () => {
//     const title = watch("name");
//     const description = watch("description");

//     if (title) {
//       try {
//         const generatedDescription = await geminiApi.generateExhibitDescription(
//           {
//             title,
//             description,
//           }
//         );
//         setValue("description", generatedDescription);
//       } catch (error) {
//         console.error("Error generating description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert(
//         "Please enter the exhibition name before generating a description."
//       );
//     }
//   };

//   // Handle file change and upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploading(true);
//       uploadFile(
//         file,
//         (progress) => setProgress(progress), // onProgress callback
//         (url) => {
//           setUploadedImageUrl(url); // Set uploaded image URL
//           setUploading(false);
//         },
//         (error) => {
//           console.error("Error uploading file:", error);
//           setUploading(false);
//         }
//       );
//     }
//   };

//   if (!exhibition) {
//     return <p>Loading...</p>; // Show a loading message while exhibition is fetched
//   }
//   return (
//     <div className="mt-10 border rounded-lg shadow-md p-4 lg:p-8">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 gap-4 shadow p-6 sm:p-8 lg:p-12 w-full"
//       >
//         {/* Exhibition Name */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold mb-4">Edit Exhibition</h2>
//           <label className="block text-gray-700 font-bold mb-2">
//             Exhibition Name:
//           </label>
//           <input
//             type="text"
//             {...register("name", { required: "Exhibition name is required" })}
//             className={`mt-1 block w-full rounded-md ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             } shadow-sm focus:border-indigo-500`}
//           />
//           {errors.name && (
//             <span className="text-red-500">{errors.name.message}</span>
//           )}
//         </div>
  
//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">
//             Description:
//           </label>
//           <textarea
//             {...register("description", {
//               required: "Description is required",
//             })}
//             className={`mt-1 block w-full rounded-md ${
//               errors.description ? "border-red-500" : "border-gray-300"
//             } shadow-sm focus:border-indigo-500`}
//           />
//           {errors.description && (
//             <span className="text-red-500">{errors.description.message}</span>
//           )}
//         </div>
  
//         {/* Generate AI Description Button */}
//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={handleGenerateExhibitDescription}
//             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
//           >
//             Generate AI Exhibit Description
//           </button>
//         </div>
  
//         {/* Image Upload */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">
//             Upload Exhibition Image:
//           </label>
//           <input type="file" onChange={handleFileChange} className="w-full" />
//           {uploading && <p>Progress: {progress}%</p>}
//           {uploadedImageUrl && (
//             <div className="mt-2 text-center">
//               <p>Uploaded Image:</p>
//               <img
//                 src={uploadedImageUrl}
//                 alt="Uploaded"
//                 className="w-48 h-48 mx-auto rounded-lg"
//               />
//               <a
//                 href={uploadedImageUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-500"
//               >
//                 View Image
//               </a>
//             </div>
//           )}
//         </div>
  
//         {/* Save Changes Button */}
//         <FormConfirmButton
//           onSubmit={handleSubmit(onSubmit)}
//           buttonText="Save Changes"
//           dialogMessage="Are you sure you want to save these changes?"
//         />
//       </form>
  
//       <div className="mt-4">
//         <GoBackButton />
//       </div>
//     </div>
//   );
// };

// export default CuratorEditExhibition;

// src/components/museumOwner/CuratorEditExhibition.js

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import FormConfirmButton from "../common/FormConfirmButton";
import GoBackButton from "../common/GoBackButton";
import { useForm } from "react-hook-form";
import geminiApi from "../../api/GeminiApi";
import { uploadFile } from "../common/FileUpload"; // Import file upload logic
import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context

const CuratorEditExhibition = () => {
  const { id } = useParams(); // Get exhibition ID from the URL
  const navigate = useNavigate();
  const { exhibitions, updateExhibition } = useMuseumContext();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState(null);

  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

  // Memoize the exhibition data based on the ID
  const exhibition = useMemo(
    () => exhibitions.find((exhibit) => exhibit._id === id),
    [id, exhibitions]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // reset form values
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  // Use effect to reset form when exhibition data is available
  useEffect(() => {
    if (exhibition) {
      reset({
        name: exhibition.name || "",
        description: exhibition.description || "",
        imageUrl: exhibition.imageUrl || "",
      });
      setUploadedImageUrl(exhibition.imageUrl || ""); // Set existing image URL
    }
  }, [exhibition, reset]); // Dependencies include exhibition and reset

  const onSubmit = async (data) => {
    try {
      // Include the uploaded image URL in the form data
      const finalData = {
        ...data,
        imageUrl: uploadedImageUrl || data.imageUrl,
      };
      await updateExhibition(id, finalData);
      alert("Exhibition updated successfully");
      navigate(-1); // Navigate back after updating
    } catch (error) {
      console.error("Error updating exhibition:", error);
      setError(error);
    }
  };

  const handleGenerateExhibitDescription = async () => {
    const title = watch("name");
    const description = watch("description");

    if (title) {
      try {
        const generatedDescription = await geminiApi.generateExhibitDescription({
          title,
          description,
        });
        setValue("description", generatedDescription);
      } catch (error) {
        console.error("Error generating description:", error);
        alert("Failed to generate AI description.");
      }
    } else {
      alert(
        "Please enter the exhibition name before generating a description."
      );
    }
  };

  // Handle file change and upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      uploadFile(
        file,
        (progress) => setProgress(progress), // onProgress callback
        (url) => {
          setUploadedImageUrl(url); // Set uploaded image URL
          setUploading(false);
        },
        (error) => {
          console.error("Error uploading file:", error);
          setUploading(false);
          alert("Failed to upload the image. Please try again.");
        }
      );
    }
  };

  // const imageUrl = watch("imageUrl"); // Watch the current value of the image URL

  if (!exhibition) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition-colors duration-300`}
      >
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`grid grid-cols-1 gap-4 shadow p-6 sm:p-8 lg:p-12 space-y-6 rounded-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } transition-colors duration-300`}
      >
        {/* Exhibition Name */}
        <div className="mb-4">
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Edit Exhibition
          </h2>
          <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Exhibition Name:
            <input
              type="text"
              {...register("name", { required: "Exhibition name is required" })}
              className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.name
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Description:
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.description
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
              }`}
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </label>
        </div>

        {/* Generate AI Description Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGenerateExhibitDescription}
            className={`w-full md:w-auto bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md ${
              isDarkMode ? "bg-purple-600 hover:bg-purple-800" : ""
            } transition-colors duration-300`}
          >
            Generate AI Exhibit Description
          </button>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Upload Exhibition Image:
            <input
              type="file"
              onChange={handleFileChange}
              className={`mt-2 w-full ${
                isDarkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-900"
              }`}
            />
            {uploading && (
              <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Progress: {progress}%
              </p>
            )}
            {uploadedImageUrl && (
              <div className="mt-2 text-center">
                <p className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Uploaded Image:
                </p>
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="h-40 w-40 mx-auto object-cover rounded-lg shadow-lg"
                />
                <a
                  href={uploadedImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 mt-2 inline-block"
                >
                  View Image
                </a>
              </div>
            )}
          </label>

          {errors.imageUrl && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.imageUrl.message}
            </span>
          )}
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-between">
          <FormConfirmButton
            onSubmit={handleSubmit(onSubmit)}
            buttonText="Save Changes"
            dialogMessage="Are you sure you want to save these changes?"
            className={`w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
            } transition-colors duration-300`}
          />
        </div>

        {/* Display Error Message */}
        {error && (
          <div className="mt-4">
            <p className="text-red-500 text-center">
              {error.response?.data?.message || error.message}
            </p>
          </div>
        )}

        {/* Close Exhibition Button */}
        <div className="mt-4">
          <FormConfirmButton
           onSubmit={handleSubmit(onSubmit)}
            buttonText="Close Exhibition"
            dialogMessage="Are you sure you want to close this exhibition?"
            className={`w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
            } transition-colors duration-300`}
          />
        </div>
      </form>

      {/* Go Back Button */}
      <div className="mt-4">
        <GoBackButton />
      </div>
    </div>
  );
};

export default CuratorEditExhibition;
