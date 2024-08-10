
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import geminiApi from "../../api/GeminiApi"; // Ensure the correct path
// import FormConfirmButton from "../common/FormConfirmButton"; // Import your custom button

// const CuratorCreateArtwork = ({ exhibitionId }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     watch,
//   } = useForm();
//   const { createArtwork } = useMuseumContext();
//   const [aiDescription, setAiDescription] = useState("");

//   const title = watch("title");
//   const artist = watch("artist");
//   const createdDateByArtist = watch("createdDateByArtist");
//   const imageUrl = watch("imageUrl");
//   const description = watch("description");

//   const onSubmit = async (data) => {
//     try {
//       const artworkData = {
//         ...data,
//         description: aiDescription || data.description, // Use AI-generated description if available
//       };
//       const response = await createArtwork(exhibitionId, artworkData);
//       if (response) {
//         alert("Artwork created successfully");
//         reset();
//         setAiDescription(""); // Clear AI description after successful creation
//       }
//     } catch (error) {
//       console.error("There was an error creating the artwork!", error);
//     }
//   };

//   const handleGenerateDescription = async () => {
//     if (title && artist && createdDateByArtist) {
//       try {
//         const generatedDescription = await geminiApi.generateArtworkDescription(
//           { title, artist, createdDateByArtist, imageUrl, description }
//         );
//         setAiDescription(generatedDescription);
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

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Create New Artwork</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
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
//             {...register("imageUrl")}
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

//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={handleGenerateDescription}
//             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Generate AI Description
//           </button>
//         </div>

//         <div className="items-center">
//           <FormConfirmButton
//             onSubmit={handleSubmit(onSubmit)}
//             buttonText="Create Artwork"
//             dialogMessage="Are you sure you want to create this artwork?"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CuratorCreateArtwork;

// CuratorCreateArtwork.js
import React from "react";
import ArtworkForm from "../common/ArtworkForm";
import { useMuseumContext } from "../../contexts/MuseumContext";

const CuratorCreateArtwork = ({ exhibitionId }) => {
  const { createArtwork } = useMuseumContext();

  const handleCreateArtwork = async (data) => {
    try {
      const response = await createArtwork(exhibitionId, data);
      if (response) {
        alert("Artwork created successfully");
      }
    } catch (error) {
      console.error("There was an error creating the artwork!", error);
    }
  };

  return <ArtworkForm onSubmit={handleCreateArtwork} formType="create" />;
};

export default CuratorCreateArtwork;