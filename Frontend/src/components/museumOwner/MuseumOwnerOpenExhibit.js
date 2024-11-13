// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm, useFieldArray } from "react-hook-form";
// import { TiUserDelete } from "react-icons/ti";
// import useOpenExhibit from "../../hooks/useOpenExhibit";
// import FormConfirmButton from "../common/FormConfirmButton";
// import CuratorSelect from "./CuratorSelect";
// import geminiApi from "../../api/GeminiApi"; // Import the GeminiApi
// import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
// import { useLang } from "../../contexts/LangContext"; // Import Language Context
// import { FaMagic } from 'react-icons/fa'; // Import the magic wand icon from react-icons

// const MuseumOwnerOpenExhibit = () => {
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
//   const { language } = useLang(); // Get the current language from LangContext
//   const isHebrew = language === "he"; // Check if the language is Hebrew

//   const translations = {
//     en: {
//       openNewExhibition: "Open New Exhibition",
//       exhibitionsLeft: "Exhibitions Left",
//       artworksLeft: "Artworks Left",
//       exhibitionName: "Exhibition Name",
//       maxArtworks: "Maximum Number of Artworks",
//       description: "Description",
//       generateAI: "Generate AI Description",
//       imageUrl: "Image URL",
//       enterCurators: "Enter Curators",
//       addCurator: "+ Add Curator",
//       selectFromCuratorList: "Select from Curator's list",
//       confirmCreateExhibition: "Confirm & Create Exhibition",
//       noExhibitionsLeft:
//         "No exhibitions left. Please upgrade your plan to open more exhibitions.",
//       loadingMuseum: "Loading museum...",
//       errorLoadingMuseum: "Error loading museum:",
//       name: "Name",
//       surname: "Surname",
//       email: "Email",
//       phone: "Phone",
//     },
//     he: {
//       openNewExhibition: "פתח תערוכה חדשה",
//       exhibitionsLeft: "תערוכות בשימוש",
//       artworksLeft: "יצירות אמנות בשימוש",
//       exhibitionName: "שם התערוכה",
//       maxArtworks: "מספר מקסימלי של יצירות אמנות",
//       description: "תיאור",
//       generateAI: "צור תיאור באמצעות בינה מלאכותית",
//       imageUrl: "כתובת תמונה",
//       enterCurators: "הזן אוצרים",
//       addCurator: "+ הוסף אוצר",
//       selectFromCuratorList: "בחר מרשימת האוצרים",
//       confirmCreateExhibition: "אשר וצור תערוכה",
//       noExhibitionsLeft:
//         "לא נותרו תערוכות. אנא שדרג את התוכנית שלך כדי לפתוח עוד תערוכות.",
//       loadingMuseum: "טוען מוזיאון...",
//       errorLoadingMuseum: "שגיאה בטעינת המוזיאון:",
//       name: "שם",
//       surname: "שם משפחה",
//       email: "דואר אלקטרוני",
//       phone: "טלפון",
//     },
//   };

//   const t = translations[language]; // Get the correct translation based on the selected language

//   const {
//     planDetails,
//     museum,
//     isLoading,
//     error,
//     handleSubmit: handleExhibitSubmit,
//   } = useOpenExhibit();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     trigger,
//     reset,
//     setValue,
//     watch,
//   } = useForm({
//     mode: "onSubmit",
//     defaultValues: {
//       name: "",
//       description: "",
//       maxArtworks: "",
//       imageUrl: "",
//       curators: [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "curators",
//   });

//   const [showCuratorSelect, setShowCuratorSelect] = useState(false);
//   const name = watch("name");
//   const description = watch("description");
//   const navigate = useNavigate();

//   // Function to handle generating the exhibition description via API
//   const handleGenerateExhibitDescription = async () => {
//     if (name && description) {
//       try {
//         const generatedDescription = await geminiApi.generateExhibitDescription(
//           {
//             title: name,
//             description,
//           }
//         );
//         setValue("description", generatedDescription); // Fill in the Description field with the AI-generated text
//       } catch (error) {
//         console.error("Error generating AI description:", error);
//         alert("Failed to generate AI description.");
//       }
//     } else {
//       alert(t.exhibitionName);
//     }
//   };

//   const onSubmit = async (data, event) => {
//     const isValid = await trigger();
//     if (isValid) {
//       const success = await handleExhibitSubmit(data, event);
//       if (success) {
//         reset({
//           name: "",
//           description: "",
//           maxArtworks: "",
//           imageUrl: "",
//           curators: [],
//         });
//         navigate("/owner/exhibitions");
//       }
//     }
//   };

//   const handleCuratorsSelect = (selectedCurators) => {
//     selectedCurators.forEach((curator) => {
//       if (!fields.find((field) => field.email === curator.email)) {
//         append({ ...curator, isEditable: false });
//       }
//     });
//     setShowCuratorSelect(false);
//   };

//   if (isLoading) {
//     return (
//       <div
//         className={`flex justify-center items-center h-screen ${
//           isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//         }`}
//       >
//         <p className="text-xl font-semibold">{t.loadingMuseum}</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className={`flex justify-center items-center h-screen ${
//           isDarkMode ? "bg-gray-900 text-red-500" : "bg-white text-red-500"
//         }`}
//       >
//         <p className="text-xl font-semibold">
//           {t.errorLoadingMuseum} {error.message}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`container mx-auto my-8 min-h-screen transition-colors duration-300 `}
//       dir={isHebrew ? "rtl" : "ltr"}
//     >
//       <h1
//         className={`text-4xl font-poppins font-bold tracking-wide mb-6 text-center ${
//           isDarkMode ? "text-white" : "text-gray-900"
//         }`}
//       >
//         {t.openNewExhibition}
//       </h1>
//       {museum && (
//         <>
//           <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"} font-poppins font-medium`}>
//             {t.exhibitionsLeft}:{" "}
//             <span className="font-bold">
//             {planDetails.exhibitionsLeft !== null
//               ? `${planDetails.exhibitionsLeft} / ${
//                   planDetails.maxExhibitions || "unlimited"
//                 }`
//               : "unlimited"}
//             </span>
//           </p>
//           <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"} font-poppins font-medium`}>
//             {t.artworksLeft}:{" "}
//             <span className="font-bold">
//             {planDetails.artworksLeft !== null
//               ? `${planDetails.artworksLeft} / ${
//                   planDetails.maxArtWorks || "unlimited"
//                 }`
//               : "unlimited"}
//             </span>
//           </p>

//           {planDetails.exhibitionsLeft > 0 ? (
//             <form
//               id="exhibitionForm"
//               onSubmit={handleSubmit(onSubmit)}
//               className={`mx-auto shadow p-6 sm:p-8 lg:p-12 font-poppins ${
//                 isDarkMode ? "bg-gray-800" : "bg-gray-200"
//               } rounded-lg transition-colors duration-300 ${
//                 isHebrew ? "text-right" : ""
//               }`}
//             >
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="mb-4">
//                   <label
//                     className={`block text-sm font-bold mb-2 ${
//                       isDarkMode ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     {t.exhibitionName}:
//                     <input
//                       type="text"
//                       {...register("name", {
//                         required: t.exhibitionName,
//                       })}
//                       className={`mt-2 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm ${
//                         isDarkMode
//                           ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                           : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                       }`}
//                     />
//                     {errors.name && (
//                       <span className="text-red-500 text-sm mt-1">
//                         {errors.name.message}
//                       </span>
//                     )}
//                   </label>
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     className={`block text-sm font-bold mb-2 ${
//                       isDarkMode ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     {t.maxArtworks}:
//                     <input
//                       type="number"
//                       {...register("maxArtworks", {
//                         required: t.maxArtworks,
//                         min: {
//                           value: 0,
//                           message: "Number of artworks cannot be negative", // Custom error message for negative values
//                         },
//                       })}
//                       min="0" // Prevents typing negative numbers
//                       className={`mt-2 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm ${
//                         isDarkMode
//                           ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                           : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                       }`}
//                     />
//                     {errors.maxArtworks && (
//                       <span className="text-red-500 text-sm mt-1">
//                         {errors.maxArtworks.message}
//                       </span>
//                     )}
//                   </label>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label
//                   className={`block text-sm font-bold mb-2 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-700"
//                   }`}
//                 >
//                   {t.description}:
//                   <textarea
//                     {...register("description", {
//                       required: t.description,
//                     })}
//                     className={`mt-2 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm ${
//                       isDarkMode
//                         ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                         : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                     }`}
//                   />
//                   {errors.description && (
//                     <span className="text-red-500 text-sm mt-1">
//                       {errors.description.message}
//                     </span>
//                   )}
//                 </label>
//               </div>

//               {/* New Button to Generate AI Description */}
//               <div className="mb-4 flex justify-center">
//                 <button
//                   type="button"
//                   onClick={handleGenerateExhibitDescription}
//                   className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2
//                     transition-all duration-300 ease-in-out
//                     hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400
//                     focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
//                 >
//                   <FaMagic className="text-gray-500 dark:text-gray-300" /> {t.generateAI}
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <label
//                   className={`block text-sm font-bold mb-2 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-700"
//                   }`}
//                 >
//                   {t.imageUrl}:
//                   <input
//                     type="text"
//                     {...register("imageUrl", {
//                       required: t.imageUrl,
//                     })}
//                     className={`mt-2 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm ${
//                       isDarkMode
//                         ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                         : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                     }`}
//                   />
//                   {errors.imageUrl && (
//                     <span className="text-red-500 text-sm mt-1">
//                       {errors.imageUrl.message}
//                     </span>
//                   )}
//                 </label>
//               </div>

//               <h2
//                 className={`text-xl md:text-2xl font-bold text-center my-4 ${
//                   isDarkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 {t.enterCurators}
//               </h2>

//               <div className="flex flex-col sm:flex-row justify-end mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
//                 <button
//                   type="button"
//                   onClick={() =>
//                     append({
//                       name: "",
//                       lastName: "",
//                       email: "",
//                       phoneNumber: "",
//                       isEditable: true,
//                     })
//                   }
//                   className={`w-full sm:w-auto py-2 px-4 font-poppins border border-transparent hover:border-black underline transition-colors duration-300 ${
//                     isDarkMode ? "text-white hover:border-white" : "text-black"
//                   }`}
//                 >
//                   {t.addCurator}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCuratorSelect(true)}
//                   className={`w-full sm:w-auto text-black py-2 px-4 font-poppins border border-transparent hover:border-black underline ${
//                     isDarkMode ? "text-white hover:border-white": ""
//                   } transition-colors duration-300`}
//                 >
//                   {t.selectFromCuratorList}
//                 </button>
//               </div>

//               {showCuratorSelect && (
//                 <CuratorSelect
//                   onCuratorsSelect={handleCuratorsSelect}
//                   isDarkMode={isDarkMode}
//                 />
//               )}

//               {/* Curators Fields */}
//               <div className="space-y-4">
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.id}
//                     className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm ${
//                       isDarkMode
//                         ? "bg-gray-800 border-gray-700"
//                         : "bg-gray-250 border-gray-200"
//                     } transition-colors duration-300`}
//                   >
//                     <div>
//                       <label
//                         className={`block text-sm font-bold mb-1 ${
//                           isDarkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         {t.name}
//                       </label>
//                       {field.isEditable ? (
//                         <input
//                           type="text"
//                           {...register(`curators.${index}.name`, {
//                             required: t.name,
//                           })}
//                           className={`mt-1 block w-full rounded-md border ${
//                             isDarkMode
//                               ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                               : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                           } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.name
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.name}</span>
//                       )}
//                       {errors.curators?.[index]?.name && (
//                         <span className="text-red-500 text-sm mt-1">
//                           {errors.curators[index]?.name?.message}
//                         </span>
//                       )}
//                     </div>

//                     <div>
//                       <label
//                         className={`block text-sm font-bold mb-1 ${
//                           isDarkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         {t.surname}
//                       </label>
//                       {field.isEditable ? (
//                         <input
//                           type="text"
//                           {...register(`curators.${index}.lastName`, {
//                             required: t.surname,
//                           })}
//                           className={`mt-1 block w-full rounded-md border ${
//                             isDarkMode
//                               ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                               : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                           } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.lastName
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.lastName}</span>
//                       )}
//                       {errors.curators?.[index]?.lastName && (
//                         <span className="text-red-500 text-sm mt-1">
//                           {errors.curators[index]?.lastName?.message}
//                         </span>
//                       )}
//                     </div>

//                     <div>
//                       <label
//                         className={`block text-sm font-bold mb-1 ${
//                           isDarkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         {t.email}
//                       </label>
//                       {field.isEditable ? (
//                         <input
//                           type="email"
//                           {...register(`curators.${index}.email`, {
//                             required: t.email,
//                             pattern: {
//                               value: /^\S+@\S+\.\S+$/,
//                               message: "Invalid email address",
//                             },
//                           })}
//                           className={`mt-1 block w-full rounded-md border ${
//                             isDarkMode
//                               ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                               : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                           } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.email
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.email}</span>
//                       )}
//                       {errors.curators?.[index]?.email && (
//                         <span className="text-red-500 text-sm mt-1">
//                           {errors.curators[index]?.email?.message}
//                         </span>
//                       )}
//                     </div>

//                     <div>
//                       <label
//                         className={`block text-sm font-bold mb-1 ${
//                           isDarkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         {t.phone}
//                       </label>
//                       {field.isEditable ? (
//                         <input
//                           type="tel"
//                           {...register(`curators.${index}.phoneNumber`, {
//                             required: t.phone,
//                           })}
//                           className={`mt-1 block w-full rounded-md border ${
//                             isDarkMode
//                               ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
//                               : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
//                           } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.phoneNumber
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.phoneNumber}</span>
//                       )}
//                       {errors.curators?.[index]?.phoneNumber && (
//                         <span className="text-red-500 text-sm mt-1">
//                           {errors.curators[index]?.phoneNumber?.message}
//                         </span>
//                       )}
//                     </div>

//                     <div className="flex justify-end sm:justify-center items-center">
//                       <button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
//                           isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
//                         } transition-colors duration-300`}
//                       >
//                         <TiUserDelete />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <FormConfirmButton
//                 onSubmit={handleSubmit(onSubmit)}
//                 buttonText={t.confirmCreateExhibition}
//                 dialogMessage={t.confirmCreateExhibition}
//                 className={`py-2 px-4 rounded-full font-bold text-white font-poppins transition-transform transform-gpu duration-300 focus:outline-none focus:ring-4 border-2 ${
//                   isDarkMode
//                     ? "bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 border-blue-500 focus:ring-blue-600"
//                     : "bg-[#587cd9] hover:bg-blue-700 border-white focus:ring-blue-300"
//                 }`}
//               />
//             </form>
//           ) : (
//             <p
//               className={`text-center text-xl ${
//                 isDarkMode ? "text-red-500" : "text-red-500"
//               }`}
//             >
//               {t.noExhibitionsLeft}
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default MuseumOwnerOpenExhibit;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { TiUserDelete } from "react-icons/ti";
import useOpenExhibit from "../../hooks/useOpenExhibit";
import FormConfirmButton from "../common/FormConfirmButton";
import CuratorSelect from "./CuratorSelect";
import geminiApi from "../../api/GeminiApi";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext";
import { FaMagic } from "react-icons/fa";
import { uploadFile } from "../common/FileUpload";

const MuseumOwnerOpenExhibit = () => {
  const { isDarkMode } = useThemeMode();
  const { language } = useLang();
  const isHebrew = language === "he";
  const navigate = useNavigate();
  const translations = {
    en: {
      openNewExhibition: "Open New Exhibition",
      exhibitionsLeft: "Exhibitions Left",
      artworksLeft: "Artworks Left",
      exhibitionName: "Exhibition Name",
      maxArtworks: "Maximum Number of Artworks",
      description: "Description",
      generateAI: "Generate AI Description",
      imageUpload: "Image Upload",
      enterCurators: "Enter Curators",
      addCurator: "+ Add Curator",
      selectFromCuratorList: "Select from Curator's list",
      confirmCreateExhibition: "Confirm & Create Exhibition",
      noExhibitionsLeft:
        "No exhibitions left. Please upgrade your plan to open more exhibitions.",
      loadingMuseum: "Loading museum...",
      errorLoadingMuseum: "Error loading museum:",
      name: "Name",
      surname: "Surname",
      email: "Email",
      phone: "Phone",
      viewImage: "View Image",
    },
    he: {
      openNewExhibition: "פתח תערוכה חדשה",
      exhibitionsLeft: "תערוכות שנותרו",
      artworksLeft: "יצירות אמנות שנותרו",
      exhibitionName: "שם התערוכה",
      maxArtworks: "מספר מקסימלי של יצירות אמנות",
      description: "תיאור",
      generateAI: "צור תיאור באמצעות בינה מלאכותית",
      imageUpload: "העלאת תמונה",
      enterCurators: "הזן אוצרים",
      addCurator: "+ הוסף אוצר",
      selectFromCuratorList: "בחר מרשימת האוצרים",
      confirmCreateExhibition: "אשר וצור תערוכה",
      noExhibitionsLeft:
        "לא נותרו תערוכות. אנא שדרג את התוכנית שלך כדי לפתוח עוד תערוכות.",
      loadingMuseum: "טוען מוזיאון...",
      errorLoadingMuseum: "שגיאה בטעינת המוזיאון:",
      name: "שם",
      surname: "שם משפחה",
      email: "דואר אלקטרוני",
      phone: "טלפון",
      viewImage: "הצג תמונה",
    },
  };

  const t = translations[language];
  const {
    planDetails,
    museum,
    isLoading,
    error,
    handleSubmit: handleExhibitSubmit,
  } = useOpenExhibit();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      maxArtworks: "",
      imageUrl: "",
      curators: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "curators",
  });
  const [showCuratorSelect, setShowCuratorSelect] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setProgress(0);
      uploadFile(
        file,
        (progress) => setProgress(progress),
        (url) => {
          setUrl(url);
          setValue("imageUrl", url);
          setUploading(false);
        },
        (error) => {
          console.error("Error uploading file:", error);
          setUploading(false);
          alert("Image upload failed. Please try again.");
        }
      );
    }
  };

  const handleGenerateExhibitDescription = async () => {
    const name = watch("name");
    const description = watch("description");
    if (name && description) {
      try {
        const generatedDescription = await geminiApi.generateExhibitDescription(
          {
            title: name,
            description,
          }
        );
        setValue("description", generatedDescription);
      } catch (error) {
        console.error("Error generating AI description:", error);
        alert("Failed to generate AI description.");
      }
    } else {
      alert(t.exhibitionName);
    }
  };

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      const success = await handleExhibitSubmit(data);
      if (success) {
        reset({
          name: "",
          description: "",
          maxArtworks: "",
          imageUrl: "",
          curators: [],
        });
        navigate("/owner/exhibitions");
      }
    }
  };

  const handleCuratorsSelect = (selectedCurators) => {
    selectedCurators.forEach((curator) => {
      if (!fields.find((field) => field.email === curator.email)) {
        append({ ...curator, isEditable: false });
      }
    });
    setShowCuratorSelect(false);
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <p className="text-xl font-semibold">{t.loadingMuseum}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-red-500" : "bg-white text-red-500"
        }`}
      >
        <p className="text-xl font-semibold">
          {t.errorLoadingMuseum} {error.message}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto my-8  transition-colors duration-300 `}
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <h1
        className={`text-4xl font-poppins font-bold tracking-wide mb-6 text-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {t.openNewExhibition}
      </h1>
      {museum && (
        <>
          <p
            className={`mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } font-poppins font-medium`}
          >
            {t.exhibitionsLeft}:{" "}
            <span className="font-bold">
              {planDetails.exhibitionsLeft !== null
                ? `${planDetails.exhibitionsLeft} / ${
                    planDetails.maxExhibitions || "unlimited"
                  }`
                : "unlimited"}
            </span>
          </p>
          <p
            className={`mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } font-poppins font-medium`}
          >
            {t.artworksLeft}:{" "}
            <span className="font-bold">
              {planDetails.artworksLeft !== null
                ? `${planDetails.artworksLeft} / ${
                    planDetails.maxArtWorks || "unlimited"
                  }`
                : "unlimited"}
            </span>
          </p>

          {planDetails.exhibitionsLeft > 0 ? (
            <form
              id="exhibitionForm"
              onSubmit={handleSubmit(onSubmit)}
              className={`py-6  rounded-lg shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <div className="grid grid-cols-1 gap-4">
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
                      className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                          : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="mb-4">
                  <label
                    className={`block text-sm font-bold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.maxArtworks}:
                    <input
                      type="number"
                      {...register("maxArtworks", {
                        required: t.maxArtworks,
                        min: {
                          value: 0,
                          message: "Number of artworks cannot be negative",
                        },
                      })}
                      min="0"
                      className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                          : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                      }`}
                    />
                    {errors.maxArtworks && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.maxArtworks.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-bold mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t.description}:
                  <textarea
                    {...register("description", { required: t.description })}
                    className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                        : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                    }`}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="mb-4 flex flex-col items-center">
                <label
                  className={`block text-sm font-bold mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t.imageUpload}:
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  {uploading && (
                    <p className="text-sm mt-2">
                      {t.progress}: {progress}%
                    </p>
                  )}
                  {url && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={url}
                        alt="Uploaded"
                        className="w-48 h-48 mt-2 rounded-lg object-cover"
                      />
                    </div>
                  )}
                  {errors.imageUrl && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.imageUrl.message}
                    </span>
                  )}
                </label>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 mt-2"
                >
                {t.viewImage}
                </a>
              </div>

              <div className="mb-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleGenerateExhibitDescription}
                  className={`w-auto border border-gray-500 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-transparent hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
                >
                  <FaMagic className="text-gray-500 dark:text-gray-300" />{" "}
                  {t.generateAI}
                </button>
              </div>

              <h2
                className={`text-xl md:text-2xl font-bold text-center my-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t.enterCurators}
              </h2>

              <div className="flex flex-col sm:flex-row justify-end mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      lastName: "",
                      email: "",
                      phoneNumber: "",
                      isEditable: true,
                    })
                  }
                  className={`w-full sm:w-auto py-2 px-4 font-poppins border border-transparent hover:border-black underline transition-colors duration-300 ${
                    isDarkMode ? "text-white hover:border-white" : "text-black"
                  }`}
                >
                  {t.addCurator}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCuratorSelect(true)}
                  className={`w-full sm:w-auto text-black py-2 px-4 font-poppins border border-transparent hover:border-black underline ${
                    isDarkMode ? "text-white hover:border-white" : ""
                  } transition-colors duration-300`}
                >
                  {t.selectFromCuratorList}
                </button>
              </div>

              {showCuratorSelect && (
                <CuratorSelect
                  onCuratorsSelect={handleCuratorsSelect}
                  isDarkMode={isDarkMode}
                />
              )}

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-gray-250 border-gray-200"
                    } transition-colors duration-300`}
                  >
                    <div>
                      <label
                        className={`block text-sm font-bold mb-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.name}
                      </label>
                      {field.isEditable ? (
                        <input
                          type="text"
                          {...register(`curators.${index}.name`, {
                            required: t.name,
                          })}
                          className={`mt-1 block w-full rounded-md border ${
                            isDarkMode
                              ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                              : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                          } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.curators?.[index]?.name
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      ) : (
                        <span>{field.name}</span>
                      )}
                      {errors.curators?.[index]?.name && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.curators[index]?.name?.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-bold mb-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.surname}
                      </label>
                      {field.isEditable ? (
                        <input
                          type="text"
                          {...register(`curators.${index}.lastName`, {
                            required: t.surname,
                          })}
                          className={`mt-1 block w-full rounded-md border ${
                            isDarkMode
                              ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                              : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                          } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.curators?.[index]?.lastName
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      ) : (
                        <span>{field.lastName}</span>
                      )}
                      {errors.curators?.[index]?.lastName && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.curators[index]?.lastName?.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-bold mb-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.email}
                      </label>
                      {field.isEditable ? (
                        <input
                          type="email"
                          {...register(`curators.${index}.email`, {
                            required: t.email,
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
                            errors.curators?.[index]?.email
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      ) : (
                        <span>{field.email}</span>
                      )}
                      {errors.curators?.[index]?.email && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.curators[index]?.email?.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-bold mb-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.phone}
                      </label>
                      {field.isEditable ? (
                        <input
                          type="tel"
                          {...register(`curators.${index}.phoneNumber`, {
                            required: t.phone,
                          })}
                          className={`mt-1 block w-full rounded-md border ${
                            isDarkMode
                              ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200"
                              : "border-gray-300 bg-white placeholder-gray-400 text-gray-900"
                          } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.curators?.[index]?.phoneNumber
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      ) : (
                        <span>{field.phoneNumber}</span>
                      )}
                      {errors.curators?.[index]?.phoneNumber && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.curators[index]?.phoneNumber?.message}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-end sm:justify-center items-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
                          isDarkMode ? "bg-red-600 hover:bg-red-800" : ""
                        } transition-colors duration-300`}
                      >
                        <TiUserDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <FormConfirmButton
                onSubmit={handleSubmit(onSubmit)}
                buttonText={t.confirmCreateExhibition}
                dialogMessage={t.confirmCreateExhibition}
                className={`py-2 px-4 rounded-full font-bold text-white font-poppins transition-transform transform-gpu duration-300 focus:outline-none focus:ring-4 border-2 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 border-blue-500 focus:ring-blue-600"
                    : "bg-[#587cd9] hover:bg-blue-700 border-white focus:ring-blue-300"
                }`}
              />
            </form>
          ) : (
            <p
              className={`text-center text-xl ${
                isDarkMode ? "text-red-500" : "text-red-500"
              }`}
            >
              {t.noExhibitionsLeft}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MuseumOwnerOpenExhibit;
