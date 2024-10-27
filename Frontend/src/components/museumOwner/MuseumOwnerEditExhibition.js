// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import FormConfirmButton from "../common/FormConfirmButton";
// import { useFieldArray, useForm } from "react-hook-form";
// import { TiUserDelete } from "react-icons/ti";
// import CuratorSelect from "./CuratorSelect";
// import GoBackButton from "../common/GoBackButton";
// import geminiApi from "../../api/GeminiApi"; // Import geminiApi
// import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context

// const MuseumOwnerEditExhibition = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const {
//     museum,
//     exhibitions,
//     updateExhibition,
//     closeExhibition,
//   } = useMuseumContext();
//   const [loading, setLoading] = useState(false);
//   const [showCuratorSelect, setShowCuratorSelect] = useState(false);
//   const [error, setError] = useState(null);
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//     watch,
//     setError: setFormError,
//     setValue, // Add this line
//   } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//       maxArtworks: "",
//       imageUrl: "",
//       curators: [],
//       newCurators: [],
//     },
//   });

//   const { fields: curators, remove: removeCurator } = useFieldArray({
//     control,
//     name: "curators",
//   });

//   const {
//     fields: newCurators,
//     append: appendNewCurator,
//     remove: removeNewCurator,
//   } = useFieldArray({
//     control,
//     name: "newCurators",
//   });

//   const handleCloseExhibition = async () => {
//     setLoading(true);
//     try {
//       await closeExhibition(id);
//       navigate(`/owner/exhibitions`);
//     } catch (err) {
//       console.error("Error closing exhibition:", err);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExhibition = useCallback(() => {
//     setLoading(true);
//     const exhibition = exhibitions.find((exhibit) => exhibit._id === id);
//     if (exhibition) {
//       reset({
//         name: exhibition.name,
//         description: exhibition.description,
//         maxArtworks: exhibition.maxArtworks,
//         imageUrl: exhibition.imageUrl,
//         curators: exhibition.curators.map((curator) => ({
//           id: curator._id,
//           name: curator.name,
//           lastName: curator.lastName,
//           email: curator.email,
//           phoneNumber: curator.phoneNumber,
//           isEditable: false,
//         })),
//         newCurators: [],
//       });
//     }
//     setLoading(false);
//   }, [exhibitions, id, reset]);

//   useEffect(() => {
//     if (museum) {
//       fetchExhibition();
//     }

//     return () => setError(null);
//   }, [id, museum, fetchExhibition]);

//   const onSubmit = async (data) => {
//     const { curators, newCurators, ...rest } = data;
//     const updatedData = {
//       ...rest,
//       curators: curators.map((curator) => curator.id),
//       newCurators: newCurators.filter(
//         (curator) => curator.name && curator.email
//       ),
//     };

//     const currentExhibition = exhibitions.find((exhibit) => exhibit._id === id);
//     const currentArtworkCount = currentExhibition?.artworks.length || 0;

//     if (updatedData.maxArtworks < currentArtworkCount) {
//       setFormError("maxArtworks", {
//         type: "manual",
//         message: `The maximum number of artworks cannot be less than the current number of artworks (${currentArtworkCount}).`,
//       });
//       return;
//     }

//     try {
//       await updateExhibition(id, updatedData);
//       navigate(-1);
//     } catch (error) {
//       setError(error);
//       console.error("Error updating exhibition:", error);
//     }
//   };

//   const handleCuratorsSelect = (selectedCurators) => {
//     selectedCurators.forEach((curator) => {
//       if (!curators.find((field) => field.email === curator.email)) {
//         appendNewCurator({ ...curator, isEditable: false });
//       }
//     });
//     setShowCuratorSelect(false);
//   };

//   const imageUrl = watch("imageUrl");

//   // Function to generate AI-based exhibit description
//   const handleGenerateExhibitDescription = async () => {
//     const name = watch("name");
//     const maxArtworks = watch("maxArtworks");
//     const imageUrl = watch("imageUrl");
//     const description = watch("description");

//     if (name && imageUrl && maxArtworks) {
//       try {
//         const generatedDescription = await geminiApi.generateExhibitDescription(
//           {
//             title: name,
//             description,
//             imageUrl,
//           }
//         );
//         setValue("description", generatedDescription); // Fill in the Description field
//       } catch (error) {
//         console.error("Error generating exhibit description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert(
//         "Please enter the exhibition name, maximum artworks, and image URL before generating a description."
//       );
//     }
//   };

//   return (
//     <div className={`container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-900'} min-h-screen transition-colors duration-300`}>
//       {loading ? (
//         <p className={`text-center text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading...</p>
//       ) : (
//         <form
//           id="exhibitionForm"
//           onSubmit={handleSubmit(onSubmit)}
//           className={`grid grid-cols-1 gap-4 shadow p-6 sm:p-8 lg:p-12 space-y-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors duration-300`}
//         >
//           {/* Exhibition Name */}
//           <div className="mb-4">
//             <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//               Exhibition Name:
//               <input
//                 type="text"
//                 {...register("name", {
//                   required: "Exhibition name is required",
//                 })}
//                 className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
//                   isDarkMode
//                     ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                     : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                 }`}
//               />
//               {errors.name && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.name.message}
//                 </span>
//               )}
//             </label>
//           </div>

//           {/* Maximum Number of Artworks */}
//           <div className="mb-4">
//             <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//               Maximum Number of Artworks:
//               <input
//                 type="number"
//                 {...register("maxArtworks", {
//                   required: "Maximum number of artworks is required",
//                 })}
//                 className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
//                   isDarkMode
//                     ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                     : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                 }`}
//               />
//               {errors.maxArtworks && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.maxArtworks.message}
//                 </span>
//               )}
//             </label>
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//               Description:
//               <textarea
//                 {...register("description", {
//                   required: "Description is required",
//                 })}
//                 className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
//                   isDarkMode
//                     ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                     : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                 }`}
//               />
//               {errors.description && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.description.message}
//                 </span>
//               )}
//             </label>
//           </div>

//           {/* Generate AI Description Button */}
//           <div className="mb-4">
//             <button
//               type="button"
//               onClick={handleGenerateExhibitDescription}
//               className={`w-full md:w-auto bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md ${
//                 isDarkMode ? "bg-purple-600 hover:bg-purple-800" : ""
//               } transition-colors duration-300`}
//             >
//               Generate AI Exhibit Description
//             </button>
//           </div>

//           {/* Image URL */}
//           <div className="mb-4">
//             <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//               Image URL:
//               <input
//                 type="text"
//                 {...register("imageUrl", { required: "Image URL is required" })}
//                 className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
//                   isDarkMode
//                     ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                     : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                 }`}
//               />
//               {imageUrl && (
//                 <div className="mt-2 ml-4 flex justify-center">
//                   <img
//                     src={imageUrl}
//                     alt="Exhibition"
//                     className="h-40 w-40 object-cover rounded-md shadow-lg"
//                   />
//                 </div>
//               )}
//             </label>

//             {errors.imageUrl && (
//               <span className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</span>
//             )}
//           </div>

//           {/* Curators */}
//           <h2 className={`text-xl font-bold text-center my-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//             Curators:
//           </h2>

//           <div className="space-y-4">
//             {curators.map((curator, index) => (
//               <div
//                 key={curator.id}
//                 className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm ${
//                   isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-50 border-gray-200"
//                 } transition-colors duration-300`}
//               >
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Name
//                   </label>
//                   <span>{curator.name}</span>
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Surname
//                   </label>
//                   <span>{curator.lastName}</span>
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Email
//                   </label>
//                   <span>{curator.email}</span>
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Phone
//                   </label>
//                   <span>{curator.phoneNumber}</span>
//                 </div>
//                 <div className="flex justify-end sm:justify-center items-center">
//                   <button
//                     type="button"
//                     onClick={() => removeCurator(index)}
//                     className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
//                       isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
//                     } transition-colors duration-300`}
//                   >
//                     <TiUserDelete size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Add New Curators */}
//           <h2 className={`text-xl md:text-2xl font-bold text-center my-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//             Add New Curators:
//           </h2>
//           <div className="flex flex-col sm:flex-row justify-end mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
//             <button
//               type="button"
//               onClick={() =>
//                 appendNewCurator({
//                   name: "",
//                   lastName: "",
//                   email: "",
//                   phoneNumber: "",
//                   isEditable: true,
//                 })
//               }
//               className={`w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md ${
//                 isDarkMode ? "bg-green-600 hover:bg-green-800" : ""
//               } transition-colors duration-300`}
//             >
//               + Add Curator
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowCuratorSelect(true)}
//               className={`w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md ${
//                 isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
//               } transition-colors duration-300`}
//             >
//               Select from Curator's list
//             </button>
//           </div>

//           {showCuratorSelect && (
//             <CuratorSelect onCuratorsSelect={handleCuratorsSelect} isDarkMode={isDarkMode} />
//           )}

//           <div className="space-y-4">
//             {newCurators.map((field, index) => (
//               <div
//                 key={field.id}
//                 className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm ${
//                   isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
//                 } transition-colors duration-300`}
//               >
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Name
//                   </label>
//                   {field.isEditable ? (
//                     <input
//                       type="text"
//                       {...register(`newCurators.${index}.name`, {
//                         required: "Curator name is required",
//                       })}
//                       className={`mt-1 block w-full rounded-md border ${
//                         isDarkMode
//                           ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                           : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                       } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.name ? "border-red-500" : ""
//                       }`}
//                     />
//                   ) : (
//                     <span>{field.name}</span>
//                   )}
//                   {errors.newCurators?.[index]?.name && (
//                     <span className="text-red-500 text-sm mt-1">
//                       {errors.newCurators[index]?.name?.message}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Surname
//                   </label>
//                   {field.isEditable ? (
//                     <input
//                       type="text"
//                       {...register(`newCurators.${index}.lastName`, {
//                         required: "Curator last name is required",
//                       })}
//                       className={`mt-1 block w-full rounded-md border ${
//                         isDarkMode
//                           ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                           : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                       } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.lastName ? "border-red-500" : ""
//                       }`}
//                     />
//                   ) : (
//                     <span>{field.lastName}</span>
//                   )}
//                   {errors.newCurators?.[index]?.lastName && (
//                     <span className="text-red-500 text-sm mt-1">
//                       {errors.newCurators[index]?.lastName?.message}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Email
//                   </label>
//                   {field.isEditable ? (
//                     <input
//                       type="email"
//                       {...register(`newCurators.${index}.email`, {
//                         required: "Curator email is required",
//                         pattern: {
//                           value: /^\S+@\S+\.\S+$/,
//                           message: "Invalid email address",
//                         },
//                       })}
//                       className={`mt-1 block w-full rounded-md border ${
//                         isDarkMode
//                           ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                           : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                       } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.email ? "border-red-500" : ""
//                       }`}
//                     />
//                   ) : (
//                     <span>{field.email}</span>
//                   )}
//                   {errors.newCurators?.[index]?.email && (
//                     <span className="text-red-500 text-sm mt-1">
//                       {errors.newCurators[index]?.email?.message}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-bold mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     Phone
//                   </label>
//                   {field.isEditable ? (
//                     <input
//                       type="tel"
//                       {...register(`newCurators.${index}.phoneNumber`, {
//                         required: "Curator phone number is required",
//                       })}
//                       className={`mt-1 block w-full rounded-md border ${
//                         isDarkMode
//                           ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                           : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                       } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.phoneNumber ? "border-red-500" : ""
//                       }`}
//                     />
//                   ) : (
//                     <span>{field.phoneNumber}</span>
//                   )}
//                   {errors.newCurators?.[index]?.phoneNumber && (
//                     <span className="text-red-500 text-sm mt-1">
//                       {errors.newCurators[index]?.phoneNumber?.message}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex justify-end sm:justify-center items-center">
//                   <button
//                     type="button"
//                     onClick={() => removeNewCurator(index)}
//                     className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
//                       isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
//                     } transition-colors duration-300`}
//                   >
//                     <TiUserDelete size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Save Changes Button */}
//           <div>
//             <FormConfirmButton
//               onSubmit={handleSubmit(onSubmit)}
//               buttonText="Save Changes"
//               dialogMessage="Are you sure you want to save these changes?"
//               className={`w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                 isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
//               } transition-colors duration-300`}
//             />
//           </div>

//           {/* Display Error Message */}
//           <div>
//             {error && (
//               <p className="text-red-500 text-center">
//                 {error.response?.data?.message || error.message}
//               </p>
//             )}
//           </div>

//           {/* Close Exhibition Button */}
//           <div className="mt-4">
//             <FormConfirmButton
//               onSubmit={handleCloseExhibition}
//               buttonText="Would you like to close this exhibition?"
//               dialogMessage="Are you sure you want to close this exhibition?"
//               className={`w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                 isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
//               } transition-colors duration-300`}
//             />
//           </div>
//         </form>

//       )}
//       <GoBackButton />
//     </div>
//   );
// };

// export default MuseumOwnerEditExhibition;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import FormConfirmButton from "../common/FormConfirmButton";
import { useFieldArray, useForm } from "react-hook-form";
import { TiUserDelete } from "react-icons/ti";
import CuratorSelect from "./CuratorSelect";
import GoBackButton from "../common/GoBackButton";
import geminiApi from "../../api/GeminiApi"; // Import geminiApi
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
import { useLang } from "../../contexts/LangContext"; // Import Lang Context

const MuseumOwnerEditExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { museum, exhibitions, updateExhibition, closeExhibition } =
    useMuseumContext();
  const [loading, setLoading] = useState(false);
  const [showCuratorSelect, setShowCuratorSelect] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
  const { language } = useLang(); // Destructure language from LangContext
  // Translation object
  const translations = {
    en: {
      exhibitionName: "Exhibition Name",
      maxArtworks: "Maximum Number of Artworks",
      description: "Description",
      generateAIDescription: "Generate AI Description",
      imageUrl: "Image URL",
      curators: "Curators",
      addCurator: "+ Add Curator",
      selectCurator: "Select from Curator's list",
      saveChanges: "Save Changes",
      closeExhibition: "Would you like to close this exhibition?",
      closeExhibitionDialog: "Are you sure you want to close this exhibition?",
      curatorName: "Name",
      curatorSurname: "Surname",
      curatorEmail: "Email",
      curatorPhone: "Phone",
    },
    he: {
      exhibitionName: "שם התערוכה",
      maxArtworks: "מספר מקסימלי של יצירות אמנות",
      description: "תיאור",
      generateAIDescription: "צור תיאור באמצעות AI",
      imageUrl: "כתובת תמונה",
      curators: "אוצרים",
      addCurator: "+ הוסף אוצר",
      selectCurator: "בחר מרשימת האוצרים",
      saveChanges: "שמור שינויים",
      closeExhibition: "האם ברצונך לסגור תערוכה זו?",
      closeExhibitionDialog: "האם אתה בטוח שברצונך לסגור תערוכה זו?",
      curatorName: "שם",
      curatorSurname: "שם משפחה",
      curatorEmail: "דואר אלקטרוני",
      curatorPhone: "טלפון",
    },
  };

  const t = translations[language]; // Get the correct translation based on selected language

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setError: setFormError,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      maxArtworks: "",
      imageUrl: "",
      curators: [],
      newCurators: [],
    },
  });

  const { fields: curators, remove: removeCurator } = useFieldArray({
    control,
    name: "curators",
  });

  const {
    fields: newCurators,
    append: appendNewCurator,
    remove: removeNewCurator,
  } = useFieldArray({
    control,
    name: "newCurators",
  });

  const handleCloseExhibition = async () => {
    setLoading(true);
    try {
      await closeExhibition(id);
      navigate(`/owner/exhibitions`);
    } catch (err) {
      console.error("Error closing exhibition:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExhibition = useCallback(() => {
    setLoading(true);
    const exhibition = exhibitions.find((exhibit) => exhibit._id === id);
    if (exhibition) {
      reset({
        name: exhibition.name,
        description: exhibition.description,
        maxArtworks: exhibition.maxArtworks,
        imageUrl: exhibition.imageUrl,
        curators: exhibition.curators.map((curator) => ({
          id: curator._id,
          name: curator.name,
          lastName: curator.lastName,
          email: curator.email,
          phoneNumber: curator.phoneNumber,
          isEditable: false,
        })),
        newCurators: [],
      });
    }
    setLoading(false);
  }, [exhibitions, id, reset]);

  useEffect(() => {
    if (museum) {
      fetchExhibition();
    }
    return () => setError(null);
  }, [id, museum, fetchExhibition]);

  const onSubmit = async (data) => {
    const { curators, newCurators, ...rest } = data;
    const updatedData = {
      ...rest,
      curators: curators.map((curator) => curator.id),
      newCurators: newCurators.filter(
        (curator) => curator.name && curator.email
      ),
    };

    const currentExhibition = exhibitions.find((exhibit) => exhibit._id === id);
    const currentArtworkCount = currentExhibition?.artworks.length || 0;

    if (updatedData.maxArtworks < currentArtworkCount) {
      setFormError("maxArtworks", {
        type: "manual",
        message: `The maximum number of artworks cannot be less than the current number of artworks (${currentArtworkCount}).`,
      });
      return;
    }

    try {
      await updateExhibition(id, updatedData);
      navigate(-1);
    } catch (error) {
      setError(error);
      console.error("Error updating exhibition:", error);
    }
  };

  const handleCuratorsSelect = (selectedCurators) => {
    selectedCurators.forEach((curator) => {
      if (!curators.find((field) => field.email === curator.email)) {
        appendNewCurator({ ...curator, isEditable: false });
      }
    });
    setShowCuratorSelect(false);
  };

  const imageUrl = watch("imageUrl");

  const handleGenerateExhibitDescription = async () => {
    const name = watch("name");
    const maxArtworks = watch("maxArtworks");
    const imageUrl = watch("imageUrl");
    const description = watch("description");

    if (name && imageUrl && maxArtworks) {
      try {
        const generatedDescription = await geminiApi.generateExhibitDescription(
          {
            title: name,
            description,
            imageUrl,
          }
        );
        setValue("description", generatedDescription); // Fill in the Description field
      } catch (error) {
        console.error("Error generating exhibit description:", error);
        alert("Failed to generate AI description.");
      }
    } else {
      alert(t.exhibitionName + ", " + t.maxArtworks + ", " + t.imageUrl);
    }
  };

  return (
    <div
      className={`container mx-auto  rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-200 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      {loading ? (
        <p
          className={`text-center text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Loading...
        </p>
      ) : (
        <form
          id="exhibitionForm"
          onSubmit={handleSubmit(onSubmit)}
          className={`grid grid-cols-1 gap-4 shadow p-6 sm:p-8 lg:p-12 space-y-6 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          } transition-colors duration-300`}
        >
          <div dir={language ==='he' ? "rtl" : "ltr"}>
            {/* Exhibition Name */}
            <div className="mb-4">
              <label
                className={`block text-sm font-bold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t.exhibitionName}:
                <input
                  type="text"
                  {...register("name", { required: t.exhibitionName })}
                  className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
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

            {/* Maximum Number of Artworks */}
            <div className="mb-4">
              <label
                className={`block text-sm font-bold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t.maxArtworks}:
                <input
                  type="number"
                  {...register("maxArtworks", { required: t.maxArtworks })}
                  className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                      : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                  }`}
                />
                {errors.maxArtworks && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.maxArtworks.message}
                  </span>
                )}
              </label>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                className={`block text-sm font-bold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t.description}:
                <textarea
                  {...register("description", { required: t.description })}
                  className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
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
                {t.generateAIDescription}
              </button>
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label
                className={`block text-sm font-bold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t.imageUrl}:
                <input
                  type="text"
                  {...register("imageUrl", { required: t.imageUrl })}
                  className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                      : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                  }`}
                />
                {imageUrl && (
                  <div className="mt-2 ml-4 flex justify-center">
                    <img
                      src={imageUrl}
                      alt="Exhibition"
                      className="h-40 w-40 object-cover rounded-md shadow-lg"
                    />
                  </div>
                )}
                {errors.imageUrl && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.imageUrl.message}
                  </span>
                )}
              </label>
            </div>

            {/* Curators */}
            <h2
              className={`text-xl font-bold text-center my-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.curators}:
            </h2>

            <div className="space-y-4">
              {curators.map((curator, index) => (
                <div
                  key={curator.id}
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  } transition-colors duration-300`}
                >
                  <div>
                    <label
                      className={`block text-sm font-bold mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {t.curatorName}
                    </label>
                    <span>{curator.name}</span>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-bold mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {t.curatorSurname}
                    </label>
                    <span>{curator.lastName}</span>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-bold mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {t.curatorEmail}
                    </label>
                    <span>{curator.email}</span>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-bold mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {t.curatorPhone}
                    </label>
                    <span>{curator.phoneNumber}</span>
                  </div>
                  <div className="flex justify-end sm:justify-center items-center">
                    <button
                      type="button"
                      onClick={() => removeCurator(index)}
                      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
                        isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
                      } transition-colors duration-300`}
                    >
                      <TiUserDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Curators */}
            <h2
              className={`text-xl md:text-2xl font-bold text-center my-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.addCurator}:
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-end mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={() =>
                appendNewCurator({
                  name: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  isEditable: true,
                })
              }
              className={`w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md ${
                isDarkMode ? "bg-green-600 hover:bg-green-800" : ""
              } transition-colors duration-300`}
            >
              {t.addCurator}
            </button>
            <button
              type="button"
              onClick={() => setShowCuratorSelect(true)}
              className={`w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md ${
                isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
              } transition-colors duration-300`}
            >
              {t.selectCurator}
            </button>
          </div>

          {showCuratorSelect && (
            <CuratorSelect
              onCuratorsSelect={handleCuratorsSelect}
              isDarkMode={isDarkMode}
            />
          )}

          <div className="space-y-4">
            {newCurators.map((field, index) => (
              <div
                key={field.id}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                } transition-colors duration-300`}
              >
                <div>
                  <label
                    className={`block text-sm font-bold mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.curatorName}
                  </label>
                  {field.isEditable ? (
                    <input
                      type="text"
                      {...register(`newCurators.${index}.name`, {
                        required: t.curatorName,
                      })}
                      className={`mt-1 block w-full rounded-md border ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                          : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                      } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                        errors.newCurators?.[index]?.name
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  ) : (
                    <span>{field.name}</span>
                  )}
                  {errors.newCurators?.[index]?.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.newCurators[index]?.name?.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className={`block text-sm font-bold mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.curatorSurname}
                  </label>
                  {field.isEditable ? (
                    <input
                      type="text"
                      {...register(`newCurators.${index}.lastName`, {
                        required: t.curatorSurname,
                      })}
                      className={`mt-1 block w-full rounded-md border ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                          : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                      } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                        errors.newCurators?.[index]?.lastName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  ) : (
                    <span>{field.lastName}</span>
                  )}
                  {errors.newCurators?.[index]?.lastName && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.newCurators[index]?.lastName?.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className={`block text-sm font-bold mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.curatorEmail}
                  </label>
                  {field.isEditable ? (
                    <input
                      type="email"
                      {...register(`newCurators.${index}.email`, {
                        required: t.curatorEmail,
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className={`mt-1 block w-full rounded-md border ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                          : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                      } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                        errors.newCurators?.[index]?.email
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  ) : (
                    <span>{field.email}</span>
                  )}
                  {errors.newCurators?.[index]?.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.newCurators[index]?.email?.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className={`block text-sm font-bold mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.curatorPhone}
                  </label>
                  {field.isEditable ? (
                    <input
                      type="tel"
                      {...register(`newCurators.${index}.phoneNumber`, {
                        required: t.curatorPhone,
                      })}
                      className={`mt-1 block w-full rounded-md border ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                          : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                      } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                        errors.newCurators?.[index]?.phoneNumber
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  ) : (
                    <span>{field.phoneNumber}</span>
                  )}
                  {errors.newCurators?.[index]?.phoneNumber && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.newCurators[index]?.phoneNumber?.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-end sm:justify-center items-center">
                  <button
                    type="button"
                    onClick={() => removeNewCurator(index)}
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
                      isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
                    } transition-colors duration-300`}
                  >
                    <TiUserDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Save Changes Button */}
          <div>
            <FormConfirmButton
              onSubmit={handleSubmit(onSubmit)}
              buttonText={t.saveChanges}
              dialogMessage="Are you sure you want to save these changes?"
              className={`w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
              } transition-colors duration-300`}
            />
          </div>

          {/* Display Error Message */}
          <div>
            {error && (
              <p className="text-red-500 text-center">
                {error.response?.data?.message || error.message}
              </p>
            )}
          </div>

          {/* Close Exhibition Button */}
          <div className="mt-4">
            <FormConfirmButton
              onSubmit={handleCloseExhibition}
              buttonText={t.closeExhibition}
              dialogMessage={t.closeExhibitionDialog}
              className={`w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
              } transition-colors duration-300`}
            />
          </div>
        </form>
      )}
      <GoBackButton />
    </div>
  );
};

export default MuseumOwnerEditExhibition;
