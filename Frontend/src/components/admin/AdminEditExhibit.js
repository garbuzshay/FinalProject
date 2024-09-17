// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAdminContext } from "../../contexts/AdminContext";
// import { useForm } from "react-hook-form";
// import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed
// import { useThemeMode } from "../../contexts/DarkModeContext"; // Import the DarkMode Context

// const AdminEditExhibit = () => {
//   const { id } = useParams(); // Get the exhibit ID from the URL params
//   const { exhibitionsData } = useAdminContext(); // Fetch exhibitions data from AdminContext
//   const { exhibitions, updateExhibition, isLoading, error } = exhibitionsData;
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue } = useForm();
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

//   useEffect(() => {
//     const selectedExhibit = exhibitions.find((exhibit) => exhibit._id === id);
//     if (selectedExhibit) {
//       setValue("status", selectedExhibit.status); // Set the status in the form
//     }
//   }, [exhibitions, id, setValue]);

//   const onSubmit = async (data) => {
//     await updateExhibition(id, { status: data.status }); // Update exhibition status
//     navigate("/admin/exhibitions"); // Navigate back to the exhibits list
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const exhibit = exhibitions.find((exhibit) => exhibit._id === id);

//   return (
//     <div className={`p-4 min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-300" : " text-gray-900"} transition-colors duration-300`}>
//       <h2 className="text-2xl font-semibold mt-5">Edit Exhibit</h2>
//       {exhibit && (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="my-4">
//             <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Exhibit Name</label>
//             <input
//               type="text"
//               value={exhibit.name}
//               readOnly
//               className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
//             />
//           </div>

//           <div className="mb-4">
//             <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Description</label>
//             <textarea
//               value={exhibit.description}
//               readOnly
//               className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
//               rows={4}
//             />
//           </div>

//           <div className="mb-4">
//             <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Max Artworks</label>
//             <input
//               type="number"
//               value={exhibit.maxArtworks}
//               readOnly
//               className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
//             />
//           </div>

//           <div className="mb-4">
//             <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Curators</label>
//             <input
//               type="text"
//               value={exhibit.curators.map((curator) => `${curator.name} ${curator.lastName}`).join(", ")}
//               readOnly
//               className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
//             />
//           </div>

//           <div className="mb-4">
//             <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Museum</label>
//             <input
//               type="text"
//               value={exhibit.museum.name}
//               readOnly
//               className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
//             />
//           </div>

//           <div className="mb-4">
//             <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Status</label>
//             <select
//               {...register("status")}
//               className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
//             >
//               <option value="open">Open</option>
//               <option value="closed">Closed</option>
//             </select>
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className={`bg-gray-500 text-white px-4 py-2 rounded-md ${isDarkMode ? "hover:bg-gray-600" : ""}`}
//             >
//               Back
//             </button>
//             <FormConfirmButton
//               type="submit"
//               buttonText="Save Changes"
//               onSubmit={handleSubmit(onSubmit)}
//               dialogMessage="Are you sure you want to edit the exhibit's status?"
//               className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isDarkMode ? "hover:bg-blue-600" : ""}`}
//             />
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AdminEditExhibit;
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import { useForm } from "react-hook-form";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import the DarkMode Context
import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed

const AdminEditExhibit = () => {
  const { id } = useParams(); // Get the exhibit ID from the URL params
  const { exhibitionsData } = useAdminContext(); // Fetch exhibitions data from AdminContext
  const { exhibitions, updateExhibition, isLoading, error } = exhibitionsData;
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

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

  if (isLoading)
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-red-500" : "bg-white text-red-500"
        }`}
      >
        <h1 className="text-2xl font-semibold">Error: {error}</h1>
      </div>
    );

  const exhibit = exhibitions.find((exhibit) => exhibit._id === id);

  return (
    <div>
      <h3
        className={`text-2xl font-semibold mt-5 text-center ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Edit Exhibit
      </h3>
      {exhibit && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mx-auto space-y-6"
        >
          {/* Exhibit Name Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="name"
            >
              Exhibit Name
            </label>
            <input
              type="text"
              value={exhibit.name}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={exhibit.description}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              rows={4}
            />
          </div>

          {/* Max Artworks Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="maxArtworks"
            >
              Max Artworks
            </label>
            <input
              type="number"
              value={exhibit.maxArtworks}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Curators Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="curators"
            >
              Curators
            </label>
            <input
              type="text"
              value={exhibit.curators
                .map((curator) => `${curator.name} ${curator.lastName}`)
                .join(", ")}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Museum Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="museum"
            >
              Museum
            </label>
            <input
              type="text"
              value={exhibit.museum.name}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Status Selection */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="status"
            >
              Status
            </label>
            <select
              {...register("status")}
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-10 items-center">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-4 py-2 rounded-md shadow ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              } transition-colors duration-300`}
            >
              Back
            </button>

            {/* Save Changes Button */}
            <FormConfirmButton
              buttonText="Save Changes"
              onSubmit={handleSubmit(onSubmit)}
              dialogMessage="Are you sure you want to edit the exhibit's details?"
              isDarkMode={isDarkMode} // Pass isDarkMode as a prop for styling
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminEditExhibit;
