import React from 'react';
import { useAdminContext } from '../../contexts/AdminContext';

const AdminExhibitList = () => {
  const { exhibitionsData } = useAdminContext();
  const { exhibitions, isLoading, error } = exhibitionsData;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Exhibitions</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2">Name of Exhibition</th>
            <th className="w-1/3 py-2">Museum</th>
            <th className="w-1/3 py-2">Curators</th>
          </tr>
        </thead>
        <tbody>
          {exhibitions.map((exhibit) => (
            <tr key={exhibit._id}>
              <td className="border px-4 py-2">{exhibit.name}</td>
              <td className="border px-4 py-2">{exhibit.museum.name}</td>
              <td className="border px-4 py-2">{exhibit.curators.map((curator) => curator.name).join(', ')}</td>
              {/* <td className="border px-4 py-2">
                <button className="text-blue-500 hover:text-blue-700">Edit</button> | 
                <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExhibitList;
