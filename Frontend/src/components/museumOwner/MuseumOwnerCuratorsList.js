import React from 'react';
// import useUserExhibitions from '../../hooks/useUserExhibitions';
import { useMuseumContext } from '../../contexts/MuseumContext';
// import {useMuseum} from '../../hooks/useMuseum';

const MuseumOwnerCuratorsList = () => {
  const { museum, loading } = useMuseumContext();
  const exhibitions = museum?.exhibitions;

  if (loading) {
    return <div>Loading...</div>;
  }

  const curatorsMap = new Map();

  exhibitions?.forEach((exhibition) => {
    exhibition.curators.forEach((curator) => {
      if (!curatorsMap.has(curator._id)) {
        curatorsMap.set(curator._id, {
          ...curator,
          exhibitions: [],
        });
      }
      curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
    });
  });

  const curators = Array.from(curatorsMap.values());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Curators</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Exhibitions</th>
          </tr>
        </thead>
        <tbody>
          {curators.map((curator) => (
            <tr key={curator._id}>
              <td className="py-2 px-4 border-b">{`${curator.name} ${curator.lastName}`}</td>
              <td className="py-2 px-4 border-b">{curator.email}</td>
              <td className="py-2 px-4 border-b">{curator.phoneNumber}</td>
              <td className="py-2 px-4 border-b">
                {curator.exhibitions.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MuseumOwnerCuratorsList;
