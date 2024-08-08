// import React from 'react';
// import { useAdminContext } from '../../contexts/AdminContext';
// import { Link } from 'react-router-dom';

// const AdminMuseumList = () => {
//   const { museumsData } = useAdminContext();
//   const { museums, isLoading, error } = museumsData;

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-5">Museums</h2>
//       <table className="min-w-full bg-white border">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="w-1/6 py-2 px-4 border">Name</th>
//             <th className="w-1/6 py-2 px-4 border">Museum Owner</th>
//             <th className="w-1/6 py-2 px-4 border">Location</th>
//             <th className="w-1/6 py-2 px-4 border">Plan</th>
//             <th className="w-1/6 py-2 px-4 border">Created At</th>
//             <th className="w-1/6 py-2 px-4 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {museums.map((museum, index) => (
//             <tr key={index}>
//               <td className="border px-4 py-2">{museum.name}</td>
//               <td className="border px-4 py-2">{museum.owner.name + " " + museum.owner.lastName}</td>
//               <td className="border px-4 py-2">{museum.address + ", " + museum.city + ", " + museum.state}</td>
//               <td className="border px-4 py-2">{museum.plan.name}</td>
//               <td className="border px-4 py-2">{new Date(museum.createdAt).toLocaleDateString()}</td>
//               <td className="border px-4 py-2">
//                 <Link to={`edit/${museum._id}`} className="text-blue-500 hover:text-blue-700">
//                   View and Edit
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminMuseumList;


// Frontend\src\components\admin\AdminMuseumList.js
// Frontend\src\components\admin\AdminMuseumList.js
import React, { useState } from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import { Link } from 'react-router-dom';

const AdminMuseumList = () => {
  const { museumsData } = useAdminContext();
  const { museums, isLoading, error } = museumsData;
  const [filter, setFilter] = useState("all");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filterMuseums = () => {
    switch (filter) {
      case "open":
        return museums.filter((museum) => museum.status === "open");
      case "closed":
        return museums.filter((museum) => museum.status === "closed");
      case "all":
      default:
        return museums;
    }
  };

  const filteredMuseums = filterMuseums();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Museums</h2>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter("open")}
          className={`px-4 py-2 mx-2 ${filter === "open" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Show Opened Museums
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 ${filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Show Closed Museums
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2 px-4 border">Name</th>
            <th className="w-1/6 py-2 px-4 border">Museum Owner</th>
            <th className="w-1/6 py-2 px-4 border">Location</th>
            <th className="w-1/6 py-2 px-4 border">Plan</th>
            <th className="w-1/6 py-2 px-4 border">Created At</th>
            {filter === "all" && <th className="w-1/6 py-2 px-4 border">Status</th>}
            <th className="w-1/6 py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMuseums.map((museum, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{museum.name}</td>
              <td className="border px-4 py-2">{museum.owner.name + " " + museum.owner.lastName}</td>
              <td className="border px-4 py-2">{museum.address + ", " + museum.city + ", " + museum.state}</td>
              <td className="border px-4 py-2">{museum.plan.name}</td>
              <td className="border px-4 py-2">{new Date(museum.createdAt).toLocaleDateString()}</td>
              {filter === "all" && <td className="border px-4 py-2">{museum.status}</td>}
              <td className="border px-4 py-2">
                <Link to={`edit/${museum._id}`} className="text-blue-500 hover:text-blue-700">
                  View and Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMuseumList;
