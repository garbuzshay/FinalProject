// Frontend\src\components\admin\AdminEditMuseum.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import { useForm } from "react-hook-form";
import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed

const AdminEditMuseum = () => {
  const { id } = useParams();
  const { museumsData } = useAdminContext();
  const { museums, updateMuseum, isLoading, error } = museumsData;
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const selectedMuseum = museums.find((museum) => museum._id === id);
    if (selectedMuseum) {
      setValue("status", selectedMuseum.status);
    }
  }, [museums, id, setValue]);

  const onSubmit = async (data) => {
    await updateMuseum(id, { status: data.status });
    navigate("/admin/museums");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const museum = museums.find((museum) => museum._id === id);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Edit Museum</h2>
      {museum && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={museum.name}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={museum.address}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={museum.city}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={museum.state}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              value={museum.zipcode}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={museum.phoneNumber}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={museum.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Owner</label>
            <input
              type="text"
              value={`${museum.owner.name} ${museum.owner.lastName}`}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Plan</label>
            <input
              type="text"
              value={museum.plan.name}
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
              dialogMessage="Are you sure you want to edit the museum's status?"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminEditMuseum;


// Frontend\src\components\admin\AdminEditMuseum.js
// Frontend\src\components\admin\AdminEditMuseum.js
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAdminContext } from "../../contexts/AdminContext";
// import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed

// const AdminEditMuseum = () => {
//   const { id } = useParams();
//   const { museumsData } = useAdminContext();
//   const { museums, updateMuseum, isLoading, error } = museumsData;
//   const [museum, setMuseum] = useState(null);
//   const [status, setStatus] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const selectedMuseum = museums.find((museum) => museum._id === id);
//     if (selectedMuseum) {
//       setMuseum(selectedMuseum);
//       setStatus(selectedMuseum.status);
//     }
//   }, [museums, id]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     await updateMuseum(id, { status });
//     navigate("/admin/museums");
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-5">Edit Museum</h2>
//       {museum && (
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               value={museum.name}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               value={museum.address}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               City
//             </label>
//             <input
//               type="text"
//               value={museum.city}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               State
//             </label>
//             <input
//               type="text"
//               value={museum.state}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Zipcode
//             </label>
//             <input
//               type="text"
//               value={museum.zipcode}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               value={museum.phoneNumber}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="text"
//               value={museum.email}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Owner
//             </label>
//             <input
//               type="text"
//               value={`${museum.owner.name} ${museum.owner.lastName}`}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Plan
//             </label>
//             <input
//               type="text"
//               value={museum.plan.name}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Exhibitions
//             </label>
//             <input
//               type="text"
//               value={museum.exhibitions.length}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Artworks
//             </label>
//             <input
//               type="text"
//               value={museum.artworks.length}
//               readOnly
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Status
//             </label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             >
//               <option value="open">Open</option>
//               <option value="closed">Closed</option>
//             </select>
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="bg-gray-500 text-white px-4 py-2 rounded-md"
//             >
//               Back
//             </button>
//             {/* <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             >
             
//             </button> */}
//             <FormConfirmButton
//               type="submit"
//               onSubmit={handleSubmit}
//               buttonText=" Save Changes"
//               dialogMessage="Are you sure you want to edit the museums status?"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             />
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AdminEditMuseum;
