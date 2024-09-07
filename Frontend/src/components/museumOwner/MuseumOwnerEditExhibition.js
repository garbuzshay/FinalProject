// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import FormConfirmButton from "../common/FormConfirmButton";
// import { useFieldArray, useForm } from "react-hook-form";
// import { TiUserDelete } from "react-icons/ti";
// import CuratorSelect from "./CuratorSelect";
// import GoBackButton from "../common/GoBackButton";

// const MuseumOwnerEditExhibition = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const {
//     museum,
//     exhibitions,
//     fetchMuseum,
//     updateExhibition,
//     closeExhibition,
//   } = useMuseumContext();
//   const [loading, setLoading] = useState(false);
//   const [showCuratorSelect, setShowCuratorSelect] = useState(false);
//   const [error, setError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//     watch,
//     setError: setFormError,
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
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExhibition = () => {
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
//   };

//   useEffect(() => {
//     if (museum) {
//       fetchExhibition();
//     }

//     return () => setError(null);
//   }, [id, museum, reset, setError]);

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

//     // Validation: Check if the new maxArtworks is less than the current number of artworks
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

//   return (
//     <div>
//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <form
//           id="exhibitionForm"
//           onSubmit={handleSubmit(onSubmit)}
//           className=" mx-auto shadow p-6"
//         >
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Exhibition Name:
//               <input
//                 type="text"
//                 {...register("name", {
//                   required: "Exhibition name is required",
//                 })}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                   errors.name ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.name && (
//                 <span className="text-red-500">{errors.name.message}</span>
//               )}
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Description:
//               <textarea
//                 {...register("description", {
//                   required: "Description is required",
//                 })}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                   errors.description ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.description && (
//                 <span className="text-red-500">
//                   {errors.description.message}
//                 </span>
//               )}
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Maximum Number of Artworks:
//               <input
//                 type="number"
//                 {...register("maxArtworks", {
//                   required: "Maximum number of artworks is required",
//                 })}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                   errors.maxArtworks ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.maxArtworks && (
//                 <span className="text-red-500">
//                   {errors.maxArtworks.message}
//                 </span>
//               )}
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Image URL:
//             </label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 {...register("imageUrl", { required: "Image URL is required" })}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                   errors.imageUrl ? "border-red-500" : ""
//                 }`}
//               />
//               {imageUrl && (
//                 <div className="mt-2 ml-4 flex justify-center">
//                   <img
//                     src={imageUrl}
//                     alt="Exhibition"
//                     className="h-40 w-40 object-cover"
//                   />
//                 </div>
//               )}
//             </div>
//             {errors.imageUrl && (
//               <span className="text-red-500">{errors.imageUrl.message}</span>
//             )}
//           </div>

//           <h2 className="text-xl font-bold text-center my-4">Curators:</h2>
//           <table className="min-w-full bg-white border mb-4">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Surname
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {curators.map((curator, index) => (
//                 <tr key={curator.id} className="even:bg-gray-100">
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <span>{curator.name}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <span>{curator.lastName}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <span>{curator.email}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <span>{curator.phoneNumber}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
//                     <button
//                       type="button"
//                       onClick={() => removeCurator(index)}
//                       className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//                     >
//                       <TiUserDelete />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <h2 className="text-xl font-bold text-center my-4">
//             Add New Curators:
//           </h2>
//           <div className="flex justify-end mb-4 space-x-2">
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
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               + Add Curator
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowCuratorSelect(true)}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Select from Curator's list
//             </button>
//           </div>
//           {showCuratorSelect && (
//             <CuratorSelect onCuratorsSelect={handleCuratorsSelect} />
//           )}
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Surname
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {newCurators.map((field, index) => (
//                 <tr key={field.id} className="even:bg-gray-100">
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {field.isEditable ? (
//                       <input
//                         type="text"
//                         {...register(`newCurators.${index}.name`, {
//                           required: "Curator name is required",
//                         })}
//                         className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                           errors.newCurators?.[index]?.name
//                             ? "border-red-500"
//                             : ""
//                         }`}
//                       />
//                     ) : (
//                       <span>{field.name}</span>
//                     )}
//                     {errors.newCurators?.[index]?.name && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.name?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {field.isEditable ? (
//                       <input
//                         type="text"
//                         {...register(`newCurators.${index}.lastName`, {
//                           required: "Curator lastName is required",
//                         })}
//                         className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                           errors.newCurators?.[index]?.lastName
//                             ? "border-red-500"
//                             : ""
//                         }`}
//                       />
//                     ) : (
//                       <span>{field.lastName}</span>
//                     )}
//                     {errors.newCurators?.[index]?.lastName && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.lastName?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {field.isEditable ? (
//                       <input
//                         type="email"
//                         {...register(`newCurators.${index}.email`, {
//                           required: "Curator email is required",
//                           pattern: {
//                             value: /^\S+@\S+\.\S+$/,
//                             message: "Invalid email address",
//                           },
//                         })}
//                         className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                           errors.newCurators?.[index]?.email
//                             ? "border-red-500"
//                             : ""
//                         }`}
//                       />
//                     ) : (
//                       <span>{field.email}</span>
//                     )}
//                     {errors.newCurators?.[index]?.email && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.email?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {field.isEditable ? (
//                       <input
//                         type="tel"
//                         {...register(`newCurators.${index}.phoneNumber`, {
//                           required: "Curator phone number is required",
//                         })}
//                         className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                           errors.newCurators?.[index]?.phoneNumber
//                             ? "border-red-500"
//                             : ""
//                         }`}
//                       />
//                     ) : (
//                       <span>{field.phoneNumber}</span>
//                     )}
//                     {errors.newCurators?.[index]?.phoneNumber && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.phoneNumber?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
//                     <button
//                       type="button"
//                       onClick={() => removeNewCurator(index)}
//                       className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//                     >
//                       <TiUserDelete />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-between">
//             <FormConfirmButton
//               onSubmit={handleSubmit(onSubmit)}
//               buttonText="Save Changes"
//               dialogMessage="Are you sure you want to save these changes?"
//             />
//           </div>
//           <div>
//             {error && (
//               <p className="text-red-500 text-center">
//                 {error.response?.data?.message || error.message}
//               </p>
//             )}
//           </div>
//           <div className="mt-4">
//             <FormConfirmButton
//               onSubmit={handleCloseExhibition}
//               buttonText="Would you like to close this exhibition?"
//               dialogMessage="Are you sure you want to close this exhibition?"
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             />
//           </div>
//         </form>
//       )}
//       <GoBackButton />
//     </div>
//   );
// };

// export default MuseumOwnerEditExhibition;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import FormConfirmButton from "../common/FormConfirmButton";
import { useFieldArray, useForm } from "react-hook-form";
import { TiUserDelete } from "react-icons/ti";
import CuratorSelect from "./CuratorSelect";
import GoBackButton from "../common/GoBackButton";
import geminiApi from "../../api/GeminiApi"; // Import geminiApi

const MuseumOwnerEditExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { museum, exhibitions, fetchMuseum, updateExhibition, closeExhibition } =
    useMuseumContext();
  const [loading, setLoading] = useState(false);
  const [showCuratorSelect, setShowCuratorSelect] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setError: setFormError,
    setValue, // Add this line
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
    } finally {
      setLoading(false);
    }
  };

  const fetchExhibition = () => {
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
  };

  useEffect(() => {
    if (museum) {
      fetchExhibition();
    }

    return () => setError(null);
  }, [id, museum, reset, setError]);

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

  // Function to generate AI-based exhibit description
  const handleGenerateExhibitDescription = async () => {
    const name = watch("name");
    const maxArtworks = watch("maxArtworks");
    const imageUrl = watch("imageUrl");

    if (name && maxArtworks && imageUrl) {
      try {
        const generatedDescription = await geminiApi.generateExhibitDescription({
          name,
          maxArtworks,
          imageUrl,
        });
        setValue("description", generatedDescription); // Fill in the Description field
      } catch (error) {
        console.error("Error generating exhibit description:", error);
        alert("Failed to generate AI description.");
      }
    } else {
      alert(
        "Please enter the exhibition name, maximum artworks, and image URL before generating a description."
      );
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form
          id="exhibitionForm"
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto shadow p-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Exhibition Name:
              <input
                type="text"
                {...register("name", {
                  required: "Exhibition name is required",
                })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description:
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleGenerateExhibitDescription}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate AI Exhibit Description
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Maximum Number of Artworks:
              <input
                type="number"
                {...register("maxArtworks", {
                  required: "Maximum number of artworks is required",
                })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.maxArtworks ? "border-red-500" : ""
                }`}
              />
              {errors.maxArtworks && (
                <span className="text-red-500">
                  {errors.maxArtworks.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image URL:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                {...register("imageUrl", { required: "Image URL is required" })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.imageUrl ? "border-red-500" : ""
                }`}
              />
              {imageUrl && (
                <div className="mt-2 ml-4 flex justify-center">
                  <img
                    src={imageUrl}
                    alt="Exhibition"
                    className="h-40 w-40 object-cover"
                  />
                </div>
              )}
            </div>
            {errors.imageUrl && (
              <span className="text-red-500">{errors.imageUrl.message}</span>
            )}
          </div>

          <h2 className="text-xl font-bold text-center my-4">Curators:</h2>
          <table className="min-w-full bg-white border mb-4">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Surname
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {curators.map((curator, index) => (
                <tr key={curator.id} className="even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span>{curator.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span>{curator.lastName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span>{curator.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span>{curator.phoneNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => removeCurator(index)}
                      className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      <TiUserDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-xl font-bold text-center my-4">Add New Curators:</h2>
          <div className="flex justify-end mb-4 space-x-2">
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Add Curator
            </button>
            <button
              type="button"
              onClick={() => setShowCuratorSelect(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Select from Curator's list
            </button>
          </div>

          {showCuratorSelect && (
            <CuratorSelect onCuratorsSelect={handleCuratorsSelect} />
          )}

          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Surname
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {newCurators.map((field, index) => (
                <tr key={field.id} className="even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {field.isEditable ? (
                      <input
                        type="text"
                        {...register(`newCurators.${index}.name`, {
                          required: "Curator name is required",
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.newCurators?.[index]?.name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.name}</span>
                    )}
                    {errors.newCurators?.[index]?.name && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.name?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {field.isEditable ? (
                      <input
                        type="text"
                        {...register(`newCurators.${index}.lastName`, {
                          required: "Curator lastName is required",
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.newCurators?.[index]?.lastName
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.lastName}</span>
                    )}
                    {errors.newCurators?.[index]?.lastName && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.lastName?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {field.isEditable ? (
                      <input
                        type="email"
                        {...register(`newCurators.${index}.email`, {
                          required: "Curator email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email address",
                          },
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.newCurators?.[index]?.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.email}</span>
                    )}
                    {errors.newCurators?.[index]?.email && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.email?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {field.isEditable ? (
                      <input
                        type="tel"
                        {...register(`newCurators.${index}.phoneNumber`, {
                          required: "Curator phone number is required",
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.newCurators?.[index]?.phoneNumber
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.phoneNumber}</span>
                    )}
                    {errors.newCurators?.[index]?.phoneNumber && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.phoneNumber?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => removeNewCurator(index)}
                      className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      <TiUserDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between">
            <FormConfirmButton
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Save Changes"
              dialogMessage="Are you sure you want to save these changes?"
            />
          </div>
          <div>
            {error && (
              <p className="text-red-500 text-center">
                {error.response?.data?.message || error.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <FormConfirmButton
              onSubmit={handleCloseExhibition}
              buttonText="Would you like to close this exhibition?"
              dialogMessage="Are you sure you want to close this exhibition?"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      )}
      <GoBackButton />
    </div>
  );
};

export default MuseumOwnerEditExhibition;
