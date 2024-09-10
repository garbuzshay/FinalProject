// import React, { useEffect, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import FormConfirmButton from "../common/FormConfirmButton";
// import GoBackButton from "../common/GoBackButton";
// import { useForm } from "react-hook-form";
// import geminiApi from "../../api/GeminiApi";

// const CuratorEditExhibition = () => {
//   const { id } = useParams(); // Get exhibition ID from the URL
//   const navigate = useNavigate();
//   const { exhibitions, updateExhibition } = useMuseumContext();

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
//     }
//   }, [exhibition, reset]); // Dependencies include exhibition and reset

//   const onSubmit = async (data) => {
//     try {
//       await updateExhibition(id, data);
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
//         const generatedDescription = await geminiApi.generateExhibitDescription({
//           title,
//           description,
//         });
//         setValue("description", generatedDescription);
//       } catch (error) {
//         console.error("Error generating description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert("Please enter the exhibition name before generating a description.");
//     }
//   };

//   const imageUrl = watch('imageUrl'); // Watch the current value of the image URL

//   if (!exhibition) {
//     return <p>Loading...</p>; // Show a loading message while exhibition is fetched
//   }

//   return (
//     <div className="mx-auto shadow p-6">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Exhibition Name */}
//         <div className="mb-4">
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
//             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Generate AI Exhibit Description
//           </button>
//         </div>

//         {/* Image URL */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">
//             Exhibition Image URL:
//           </label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               {...register("imageUrl")}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//             />
//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt="Exhibition"
//                 className="ml-4 w-16 h-16 object-cover rounded-md shadow-sm"
//               />
//             )}
//           </div>
//         </div>



//         {/* Save Changes Button */}
//         <FormConfirmButton
//           onSubmit={handleSubmit(onSubmit)}
//           buttonText="Save Changes"
//           dialogMessage="Are you sure you want to save these changes?"
//         />
//       </form>

//       {/* Go Back Button */}
//       <GoBackButton />
//     </div>
//   );
// };

// export default CuratorEditExhibition;

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import FormConfirmButton from "../common/FormConfirmButton";
import GoBackButton from "../common/GoBackButton";
import { useForm } from "react-hook-form";
import geminiApi from "../../api/GeminiApi";
import { uploadFile } from "../common/FileUpload"; // Import file upload logic

const CuratorEditExhibition = () => {
  const { id } = useParams(); // Get exhibition ID from the URL
  const navigate = useNavigate();
  const { exhibitions, updateExhibition } = useMuseumContext();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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
      const finalData = { ...data, imageUrl: uploadedImageUrl || data.imageUrl };
      await updateExhibition(id, finalData);
      alert("Exhibition updated successfully");
      navigate(-1); // Navigate back after updating
    } catch (error) {
      console.error("Error updating exhibition:", error);
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
      alert("Please enter the exhibition name before generating a description.");
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
        }
      );
    }
  };

  const imageUrl = watch('imageUrl'); // Watch the current value of the image URL

  if (!exhibition) {
    return <p>Loading...</p>; // Show a loading message while exhibition is fetched
  }

  return (
    <div className="container mx-auto grid grid-cols gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="grid grid-cols gap-4  shadow p-6 sm:p-8 lg:p-12 space-y-6">
        {/* Exhibition Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Exhibition Name:
          </label>
          <input
            type="text"
            {...register("name", { required: "Exhibition name is required" })}
            className={`mt-1 block w-full rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500`}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description:
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`mt-1 block w-full rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500`}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        {/* Generate AI Description Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGenerateExhibitDescription}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate AI Exhibit Description
          </button>
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Upload Exhibition Image:
          </label>
          <input type="file" onChange={handleFileChange} />
          {uploading && <p>Progress: {progress}%</p>}
          {uploadedImageUrl && (
            <div className="mt-2 text-center">
              <p>Uploaded Image:</p>
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="w-48 h-48 mx-auto rounded-lg"
              />
              <a
                href={uploadedImageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Image
              </a>
            </div>
          )}
        </div>



        {/* Save Changes Button */}
        <FormConfirmButton
          onSubmit={handleSubmit(onSubmit)}
          buttonText="Save Changes"
          dialogMessage="Are you sure you want to save these changes?"
        />
      </form>

      {/* Go Back Button */}
      <GoBackButton />
    </div>
  );
};

export default CuratorEditExhibition;
