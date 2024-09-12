import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import { useForm } from "react-hook-form";
import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed

const AdminEditExhibit = () => {
  const { id } = useParams(); // Get the exhibit ID from the URL params
  const { exhibitionsData } = useAdminContext(); // Fetch exhibitions data from AdminContext
  const { exhibitions, updateExhibition, isLoading, error } = exhibitionsData;
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const selectedExhibit = exhibitions.find((exhibit) => exhibit._id === id);
    if (selectedExhibit) {
      setValue("status", selectedExhibit.status); // Set the status in the form
    }
  }, [exhibitions, id, setValue]);

  const onSubmit = async (data) => {
    await updateExhibition(id, { status: data.status }); // Update exhibition status
    navigate("/admin/exhibitions"); // Navigate back to the exhibits list
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const exhibit = exhibitions.find((exhibit) => exhibit._id === id);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mt-5">Edit Exhibit</h2>
      {exhibit && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">Exhibit Name</label>
            <input
              type="text"
              value={exhibit.name}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={exhibit.description}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Max Artworks</label>
            <input
              type="number"
              value={exhibit.maxArtworks}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Curators</label>
            <input
              type="text"
              value={exhibit.curators.map((curator) => `${curator.name} ${curator.lastName}`).join(", ")}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Museum</label>
            <input
              type="text"
              value={exhibit.museum.name}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register("status")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Back
            </button>
            <FormConfirmButton
              type="submit"
              buttonText="Save Changes"
              onSubmit={handleSubmit(onSubmit)}
              dialogMessage="Are you sure you want to edit the exhibit's status?"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminEditExhibit;
