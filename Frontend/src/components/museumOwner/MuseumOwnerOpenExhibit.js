// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { TiUserDelete } from "react-icons/ti";
// import useOpenExhibit from "../../hooks/useOpenExhibit";
// import FormConfirmButton from "../common/FormConfirmButton";
// import CuratorSelect from "./CuratorSelect";

// const MuseumOwnerOpenExhibit = () => {
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
//     return <p>Loading museum...</p>;
//   }

//   if (error) {
//     return <p>Error loading museum: {error.message}</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center my-4">
//         Open New Exhibition
//       </h1>
//       {museum && (
//         <>
//           <p>
//             Exhibitions Left:{" "}
//             {planDetails.exhibitionsLeft !== null
//               ? `${planDetails.exhibitionsLeft} / ${
//                   planDetails.maxExhibitions|| "unlimited"
//                 }`
//               : "unlimited"}
//           </p>
//           <p>
//             Artworks Left:{" "}
//             {planDetails.artworksLeft !== null
//               ? `${planDetails.artworksLeft} / ${
//                   planDetails.maxArtWorks || "unlimited"
//                 }`
//               : "unlimited"}
//           </p>

//           <form
//             id="exhibitionForm"
//             onSubmit={handleSubmit(onSubmit)}
//             className="mx-auto shadow p-6"
//           >
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Exhibition Name:
//                 <input
//                   type="text"
//                   {...register("name", {
//                     required: "Exhibition name is required",
//                   })}
//                   className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                     errors.name ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.name && (
//                   <span className="text-red-500">{errors.name.message}</span>
//                 )}
//               </label>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Description:
//                 <textarea
//                   {...register("description", {
//                     required: "Description is required",
//                   })}
//                   className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                     errors.description ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.description && (
//                   <span className="text-red-500">
//                     {errors.description.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Maximum Number of Artworks:
//                 <input
//                   type="number"
//                   {...register("maxArtworks", {
//                     required: "Maximum number of artworks is required",
//                   })}
//                   className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                     errors.maxArtworks ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.maxArtworks && (
//                   <span className="text-red-500">
//                     {errors.maxArtworks.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Image URL:
//                 <input
//                   type="text"
//                   {...register("imageUrl", {
//                     required: "Image URL is required",
//                   })}
//                   className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                     errors.imageUrl ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.imageUrl && (
//                   <span className="text-red-500">
//                     {errors.imageUrl.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             <h2 className="text-xl font-bold text-center my-4">
//               Enter Curators:
//             </h2>
//             <div className="flex justify-end mb-4 space-x-2">
//               <button
//                 type="button"
//                 onClick={() =>
//                   append({
//                     name: "",
//                     lastName: "",
//                     email: "",
//                     phoneNumber: "",
//                     isEditable: true,
//                   })
//                 }
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 + Add Curator
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCuratorSelect(true)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Select from Curator's list
//               </button>
//             </div>
//             {showCuratorSelect && (
//               <CuratorSelect onCuratorsSelect={handleCuratorsSelect} />
//             )}
//             <table className="min-w-full bg-white border">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                     Surname
//                   </th>
//                   <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                     Phone
//                   </th>
//                   <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fields.map((field, index) => (
//                   <tr key={field.id} className="even:bg-gray-100 ">
//                     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
//                       {field.isEditable ? (
//                         <input
//                           type="text"
//                           {...register(`curators.${index}.name`, {
//                             required: "Curator name is required",
//                           })}
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.name
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.name}</span>
//                       )}
//                       {errors.curators?.[index]?.name && (
//                         <span className="text-red-500">
//                           {errors.curators[index]?.name?.message}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                       {field.isEditable ? (
//                         <input
//                           type="text"
//                           {...register(`curators.${index}.lastName`, {
//                             required: "Curator surname is required",
//                           })}
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.lastName
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.lastName}</span>
//                       )}
//                       {errors.curators?.[index]?.lastName && (
//                         <span className="text-red-500">
//                           {errors.curators[index]?.lastName?.message}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                       {field.isEditable ? (
//                         <input
//                           type="email"
//                           {...register(`curators.${index}.email`, {
//                             required: "Curator email is required",
//                             pattern: {
//                               value: /^\S+@\S+\.\S+$/,
//                               message: "Invalid email address",
//                             },
//                           })}
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.email
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
//                         >
//                           {field.email}
//                         </span>
//                       )}
//                       {errors.curators?.[index]?.email && (
//                         <span className="text-red-500">
//                           {errors.curators[index]?.email?.message}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                       {field.isEditable ? (
//                         <input
//                           type="tel"
//                           {...register(`curators.${index}.phoneNumber`, {
//                             required: "Curator phone number is required",
//                           })}
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                             errors.curators?.[index]?.phoneNumber
//                               ? "border-red-500"
//                               : ""
//                           }`}
//                         />
//                       ) : (
//                         <span>{field.phoneNumber}</span>
//                       )}
//                       {errors.curators?.[index]?.phoneNumber && (
//                         <span className="text-red-500">
//                           {errors.curators[index]?.phoneNumber?.message}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//                       >
//                         <TiUserDelete />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <FormConfirmButton
//               onSubmit={handleSubmit(onSubmit)}
//               buttonText="Confirm & Create Exhibition"
//               dialogMessage="Are you sure you want to create this exhibition?"
//             />
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default MuseumOwnerOpenExhibit;

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TiUserDelete } from "react-icons/ti";
import useOpenExhibit from "../../hooks/useOpenExhibit";
import FormConfirmButton from "../common/FormConfirmButton";
import CuratorSelect from "./CuratorSelect";

const MuseumOwnerOpenExhibit = () => {
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

  const onSubmit = async (data, event) => {
    const isValid = await trigger();
    if (isValid) {
      const success = await handleExhibitSubmit(data, event);
      if (success) {
        reset({
          name: "",
          description: "",
          maxArtworks: "",
          imageUrl: "",
          curators: [],
        });
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
    return <p>Loading museum...</p>;
  }

  if (error) {
    return <p>Error loading museum: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-4">
        Open New Exhibition
      </h1>
      {museum && (
        <>
          <p>
            Exhibitions Left:{" "}
            {planDetails.exhibitionsLeft !== null
              ? `${planDetails.exhibitionsLeft} / ${
                  planDetails.maxExhibitions || "unlimited"
                }`
              : "unlimited"}
          </p>
          <p>
            Artworks Left:{" "}
            {planDetails.artworksLeft !== null
              ? `${planDetails.artworksLeft} / ${
                  planDetails.maxArtWorks || "unlimited"
                }`
              : "unlimited"}
          </p>

          <form
            id="exhibitionForm"
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto shadow p-6 sm:p-8 lg:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-gray-700 font-bold mb-2">
                Image URL:
                <input
                  type="text"
                  {...register("imageUrl", {
                    required: "Image URL is required",
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors.imageUrl ? "border-red-500" : ""
                  }`}
                />
                {errors.imageUrl && (
                  <span className="text-red-500">
                    {errors.imageUrl.message}
                  </span>
                )}
              </label>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-center my-4">
              Enter Curators:
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

            {/* Responsive Table */}
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 rounded-md shadow-sm bg-gray-50"
                >
                  <div>
                    <label className="block text-gray-700">Name</label>
                    {field.isEditable ? (
                      <input
                        type="text"
                        {...register(`curators.${index}.name`, {
                          required: "Curator name is required",
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.curators?.[index]?.name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.name}</span>
                    )}
                    {errors.curators?.[index]?.name && (
                      <span className="text-red-500">
                        {errors.curators[index]?.name?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700">Surname</label>
                    {field.isEditable ? (
                      <input
                        type="text"
                        {...register(`curators.${index}.lastName`, {
                          required: "Curator surname is required",
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.curators?.[index]?.lastName
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.lastName}</span>
                    )}
                    {errors.curators?.[index]?.lastName && (
                      <span className="text-red-500">
                        {errors.curators[index]?.lastName?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    {field.isEditable ? (
                      <input
                        type="email"
                        {...register(`curators.${index}.email`, {
                          required: "Curator email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email address",
                          },
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.curators?.[index]?.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.email}</span>
                    )}
                    {errors.curators?.[index]?.email && (
                      <span className="text-red-500">
                        {errors.curators[index]?.email?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700">Phone</label>
                    {field.isEditable ? (
                      <input
                        type="tel"
                        {...register(`curators.${index}.phoneNumber`, {
                          required: "Curator phone number is required",
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          errors.curators?.[index]?.phoneNumber
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    ) : (
                      <span>{field.phoneNumber}</span>
                    )}
                    {errors.curators?.[index]?.phoneNumber && (
                      <span className="text-red-500">
                        {errors.curators[index]?.phoneNumber?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end sm:justify-center items-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      <TiUserDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <FormConfirmButton
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Confirm & Create Exhibition"
              dialogMessage="Are you sure you want to create this exhibition?"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default MuseumOwnerOpenExhibit;
