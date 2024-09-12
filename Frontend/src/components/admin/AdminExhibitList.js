// import React from 'react';
// import { useAdminContext } from '../../contexts/AdminContext';
// import { Link } from 'react-router-dom';

// const AdminExhibitList = () => {
//   const { exhibitionsData } = useAdminContext();
//   const { exhibitions, isLoading, error } = exhibitionsData;

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-5">Exhibitions</h2>
//       <table className="min-w-full bg-white">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="w-1/6 py-2border">Name of Exhibit</th>
//             <th className="w-1/6 py-2 border">Museum</th>
//             <th className="w-1/6 py-2 border">Curators</th>
//             <th className="w-1/6 py2 border">Status</th>
//             <th className="w-1/6 py-2 px-4 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exhibitions.map((exhibit) => (
//             <tr key={exhibit._id}>
//               <td className="border px-4 py-2">{exhibit.name}</td>
//               <td className="border px-4 py-2">{exhibit.museum.name}</td>
//               <td className="border px-4 py-2">{exhibit.curators.map((curator) => curator.name).join(', ')}</td>
//               <td className="border px-4 py-2">{exhibit.status}</td>
//               <td className="border px-4 py-2">
//                 <Link to={`edit-exhibit/${exhibit._id}`} className="text-blue-500 hover:text-blue-700">
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

// export default AdminExhibitList;

import React, { useState } from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import { Link } from 'react-router-dom';

const AdminExhibitList = () => {
  const { exhibitionsData } = useAdminContext();
  const { exhibitions, isLoading, error } = exhibitionsData;
  const [filter, setFilter] = useState("all");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // Function to filter exhibitions based on status
  const filterExhibitions = () => {
    switch (filter) {
      case "open":
        return exhibitions.filter((exhibit) => exhibit.status === "open");
      case "closed":
        return exhibitions.filter((exhibit) => exhibit.status === "closed");
      case "all":
      default:
        return exhibitions;
    }
  };

  const filteredExhibitions = filterExhibitions();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Exhibitions</h2>

      {/* Filter buttons */}
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
          Show Open Exhibits
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 ${filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Show Closed Exhibits
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2 px-4 border">Exhibit Name</th>
            <th className="w-1/6 py-2 px-4 border">Museum</th>
            <th className="w-1/6 py-2 px-4 border">Curators</th>
            <th className="w-1/6 py-2 px-4 border">Status</th>
            <th className="w-1/6 py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExhibitions.map((exhibit) => (
            <tr key={exhibit._id}>
              <td className="border px-4 py-2">{exhibit.name}</td>
              <td className="border px-4 py-2">{exhibit.museum.name}</td>
              <td className="border px-4 py-2">
                {exhibit.curators.map((curator) => curator.name).join(', ')}
              </td>
              <td className="border px-4 py-2">{exhibit.status}</td>
              <td className="border px-4 py-2">
                <Link to={`edit-exhibit/${exhibit._id}`} className="text-blue-500 hover:text-blue-700">
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

export default AdminExhibitList;
