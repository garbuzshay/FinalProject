import React, { useState } from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { useThemeMode } from '../../contexts/DarkModeContext';

const AdminMuseumList = () => {
  const { isDarkMode } = useThemeMode();
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
      <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Museums</h2>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter("open")}
          className={`px-4 py-2 mx-2 ${filter === "open" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          Show Opened Museums
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 ${filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          Show Closed Museums
        </button>
      </div>
      <div className="hidden md:block overflow-x-auto">
        {/* Table view for desktop */}
        <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
            <tr>
              <th className="w-1/7 py-2 px-4 border">Name</th>
              <th className="w-1/7 py-2 px-4 border">Museum Owner</th>
              <th className="w-1/7 py-2 px-4 border">Location</th>
              <th className="w-1/7 py-2 px-4 border">Plan</th>
              <th className="w-1/7 py-2 px-4 border">Created At</th>
              {filter === "all" && <th className="w-1/7 py-2 px-4 border">Status</th>}
              <th className="w-1/7 py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMuseums.map((museum, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="border px-4 py-2">{museum.name}</td>
                <td className="border px-4 py-2">{museum.owner.name + " " + museum.owner.lastName}</td>
                <td className="border px-4 py-2">{museum.address + ", " + museum.city + ", " + museum.state}</td>
                <td className="border px-4 py-2">{museum.plan.name}</td>
                <td className="border px-4 py-2">{new Date(museum.createdAt).toLocaleDateString()}</td>
                {filter === "all" && <td className="border px-4 py-2">{museum.status}</td>}
                <td className="border px-4 py-2">
                  <Link to={`edit-museum/${museum._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
                    View and Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        {/* Card view for mobile */}
        {filteredMuseums.map((museum, index) => (
          <div key={index} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
            <h3 className="font-bold text-lg">{museum.name}</h3>
            <p className="text-sm"><strong>Owner:</strong> {museum.owner.name + " " + museum.owner.lastName}</p>
            <p className="text-sm"><strong>Location:</strong> {museum.address + ", " + museum.city + ", " + museum.state}</p>
            <p className="text-sm"><strong>Plan:</strong> {museum.plan.name}</p>
            <p className="text-sm"><strong>Created At:</strong> {new Date(museum.createdAt).toLocaleDateString()}</p>
            {filter === "all" && <p className="text-sm"><strong>Status:</strong> {museum.status}</p>}
            <Link to={`edit-museum/${museum._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 mt-2 block">
              View and Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMuseumList;
