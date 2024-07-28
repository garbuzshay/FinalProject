// // Frontend/src/components/museumOwner/MuseumOwnerEditExhibition.js

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import exhibitionsApi from "../../api/ExhibitionsApi";
// import FormConfirmButton from "../common/FormConfirmButton";
// import { useFieldArray, useForm } from "react-hook-form";
// import { TiUserDelete } from "react-icons/ti";
// import { useMuseumContext } from '../../contexts/MuseumContext';


// const MuseumOwnerEditExhibition = () => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const { museum, fetchMuseum } = useMuseumContext();
//   const exhibitions = museum?.exhibitions;
//   const exhibitionData = exhibitions?.find((exhibit) => exhibit._id === id);
  
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//     watch,
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

//   const fetchExhibition = async () => {
//     try {
//       setLoading(true);
//       const data = await exhibitionsApi.getExhibitionById(id);
//       reset({
//         name: data.name,
//         description: data.description,
//         maxArtworks: data.maxArtworks,
//         imageUrl: data.imageUrl,
//         curators: data.curators.map((curator) => ({
//           id: curator._id,
//           name: curator.name,
//           lastName: curator.lastName, // Adjusting to handle both surname and lastName
//           email: curator.email,
//           phoneNumber: curator.phoneNumber,
//         })),
//         newCurators: [],
//       });
//     } catch (error) {
//       console.error("Error fetching exhibition:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExhibition();
//   }, [id, reset]);

//   const onSubmit = async (data) => {
//     const { curators, newCurators, ...rest } = data;
//     const updatedData = {
//       ...rest,
//       curators: curators.map((curator) => curator.id),
//       newCurators: newCurators.filter(
//         (curator) => curator.name && curator.email
//       ), // Exclude empty new curator fields
//     };
//     try {
//       await exhibitionsApi.updateExhibition(id, updatedData);
//       fetchExhibition(); // Refetch data to update the form with the latest data
//       // Add your success handling here, e.g., show a success message
//     } catch (error) {
//       console.error("Error updating exhibition:", error);
//     }
//   };

//   const imageUrl = watch("imageUrl");

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-center my-4">Edit Exhibition</h1>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <form
//           id="exhibitionForm"
//           onSubmit={handleSubmit(onSubmit)}
//           className="max-w mx-auto shadow p-6"
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
//                     {curator.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {curator.lastName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {curator.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     {curator.phoneNumber}
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
//           <div className="flex justify-end mb-4">
//             <button
//               type="button"
//               onClick={() =>
//                 appendNewCurator({
//                   name: "",
//                   lastName: "",
//                   email: "",
//                   phoneNumber: "",
//                 })
//               }
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               + Add Curator
//             </button>
//           </div>
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
//                     <input
//                       type="text"
//                       {...register(`newCurators.${index}.name`, {
//                         required: "Curator name is required",
//                       })}
//                       className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.name
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     {errors.newCurators?.[index]?.name && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.name?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <input
//                       type="text"
//                       {...register(`newCurators.${index}.lastName`, {
//                         required: "Curator lastName is required",
//                       })}
//                       className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.lastName
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     {errors.newCurators?.[index]?.lastName && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.lastName?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <input
//                       type="email"
//                       {...register(`newCurators.${index}.email`, {
//                         required: "Curator email is required",
//                         pattern: {
//                           value: /^\S+@\S+\.\S+$/,
//                           message: "Invalid email address",
//                         },
//                       })}
//                       className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.email
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     {errors.newCurators?.[index]?.email && (
//                       <span className="text-red-500">
//                         {errors.newCurators[index]?.email?.message}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <input
//                       type="tel"
//                       {...register(`newCurators.${index}.phoneNumber`, {
//                         required: "Curator phone number is required",
//                       })}
//                       className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
//                         errors.newCurators?.[index]?.phoneNumber
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
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
//           <FormConfirmButton
//             onSubmit={handleSubmit(onSubmit)}
//             buttonText="Save Changes"
//             dialogMessage="Are you sure you want to save these changes?"
//           />
//         </form>
//       )}
//     </div>
//   );
// };

// export default MuseumOwnerEditExhibition;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import FormConfirmButton from "../common/FormConfirmButton";
import { useFieldArray, useForm } from "react-hook-form";
import { TiUserDelete } from "react-icons/ti";

const MuseumOwnerEditExhibition = () => {
  const { id } = useParams();
  const { museum, fetchMuseum ,updateExhibition } = useMuseumContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
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

  const fetchExhibition = () => {
    setLoading(true);
    const exhibition = museum.exhibitions.find((exhibit) => exhibit._id === id);
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
  }, [id, museum, reset]);

  // const onSubmit = async (data) => {
  //   const { curators, newCurators, ...rest } = data;
  //   const updatedData = {
  //     ...rest,
  //     curators: curators.map((curator) => curator.id),
  //     newCurators: newCurators.filter(
  //       (curator) => curator.name && curator.email
  //     ),
  //   };
  //   try {
  //     await exhibitionsApi.updateExhibition(id, updatedData);
  //     fetchMuseum();
  //     fetchExhibition();
  //   } catch (error) {
  //     console.error("Error updating exhibition:", error);
  //   }
  // };

  const onSubmit = async (data) => {
    const { curators, newCurators, ...rest } = data;
    const updatedData = {
      ...rest,
      curators: curators.map((curator) => curator.id),
      newCurators: newCurators.filter(
        (curator) => curator.name && curator.email
      ),
    };
    try {
      await updateExhibition(id, updatedData);
      fetchMuseum();
      fetchExhibition();
    } catch (error) {
      console.error("Error updating exhibition:", error);
    }
  };

  const imageUrl = watch("imageUrl");

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Edit Exhibition</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form
          id="exhibitionForm"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w mx-auto shadow p-6"
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
                    {curator.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {curator.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {curator.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {curator.phoneNumber}
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
          <h2 className="text-xl font-bold text-center my-4">
            Add New Curators:
          </h2>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() =>
                appendNewCurator({
                  name: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                })
              }
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Add Curator
            </button>
          </div>
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
                    {errors.newCurators?.[index]?.name && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.name?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                    {errors.newCurators?.[index]?.lastName && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.lastName?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                    {errors.newCurators?.[index]?.email && (
                      <span className="text-red-500">
                        {errors.newCurators[index]?.email?.message}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
          <FormConfirmButton
            onSubmit={handleSubmit(onSubmit)}
            buttonText="Save Changes"
            dialogMessage="Are you sure you want to save these changes?"
          />
        </form>
      )}
    </div>
  );
};

export default MuseumOwnerEditExhibition;
