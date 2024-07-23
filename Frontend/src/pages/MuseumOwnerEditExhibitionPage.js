// Frontend/src/components/exhibitions/EditExhibitionPage.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import exhibitionsApi from '../api/ExhibitionsApi';
import FormConfirmButton from "../components/common/FormConfirmButton";
import { useFieldArray, useForm } from 'react-hook-form';
import { TiUserDelete } from 'react-icons/ti';

const MuseumOwnerEditExhibitionPage = () => {
    const { id } = useParams();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
      defaultValues: {
        name: "",
        description: "",
        maxArtworks: "",
        curators: [{ name: "", surname: "", email: "", phoneNumber: "" }],
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "curators",
    });

    useEffect(() => {
      const fetchExhibition = async () => {
        try {
          const data = await exhibitionsApi.getExhibitionById(id);
          reset({
            name: data.name,
            description: data.description,
            maxArtworks: data.maxArtworks,
            curators: data.curators.map(curator => ({
              name: curator.name,
              surname: curator.surname || curator.lastName, // Adjusting to handle both surname and lastName
              email: curator.email,
              phoneNumber: curator.phoneNumber,
            })),
          });
        } catch (error) {
          console.error("Error fetching exhibition:", error);
        }
      };

      fetchExhibition();
    }, [id, reset]);

    const onSubmit = async (data) => {
      try {
        await exhibitionsApi.updateExhibition(id, data);
        // Add your success handling here, e.g., navigate back to exhibitions list or show a success message
      } catch (error) {
        console.error("Error updating exhibition:", error);
      }
    };

    return (
        <div>
          <h1 className="text-2xl font-bold text-center my-4">Edit Exhibition</h1>
          <form id="exhibitionForm" onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto shadow p-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Exhibition Name:
                <input
                  type="text"
                  {...register("name", { required: "Exhibition name is required" })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description:
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Maximum Number of Artworks:
                <input
                  type="number"
                  {...register("maxArtworks", { required: "Maximum number of artworks is required" })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.maxArtworks ? 'border-red-500' : ''}`}
                />
                {errors.maxArtworks && <span className="text-red-500">{errors.maxArtworks.message}</span>}
              </label>
            </div>
            <h2 className="text-xl font-bold text-center my-4">Edit Curators:</h2>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => append({ name: "", surname: "", email: "", phoneNumber: "" })}
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
                {fields.map((field, index) => (
                  <tr key={field.id} className="even:bg-gray-100">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="text"
                        {...register(`curators.${index}.name`, { required: "Curator name is required" })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.curators?.[index]?.name ? 'border-red-500' : ''}`}
                      />
                      {errors.curators?.[index]?.name && <span className="text-red-500">{errors.curators[index]?.name?.message}</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="text"
                        {...register(`curators.${index}.surname`, { required: "Curator surname is required" })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.curators?.[index]?.surname ? 'border-red-500' : ''}`}
                      />
                      {errors.curators?.[index]?.surname && <span className="text-red-500">{errors.curators[index]?.surname?.message}</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="email"
                        {...register(`curators.${index}.email`, {
                          required: "Curator email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.curators?.[index]?.email ? 'border-red-500' : ''}`}
                      />
                      {errors.curators?.[index]?.email && <span className="text-red-500">{errors.curators[index]?.email?.message}</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="tel"
                        {...register(`curators.${index}.phoneNumber`, { required: "Curator phone number is required" })}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.curators?.[index]?.phoneNumber ? 'border-red-500' : ''}`}
                      />
                      {errors.curators?.[index]?.phoneNumber && <span className="text-red-500">{errors.curators[index]?.phoneNumber?.message}</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => remove(index)}
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
        </div>
    );
};

export default MuseumOwnerEditExhibitionPage;
