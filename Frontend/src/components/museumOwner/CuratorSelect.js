import React, { useState } from 'react';
import { useMuseumContext } from '../../contexts/MuseumContext';

const CuratorSelect = ({ onCuratorsSelect }) => {
  const { museum, loading } = useMuseumContext();
  const exhibitions = museum?.exhibitions;
  const [selectedCurators, setSelectedCurators] = useState([]);

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

  const handleSelect = (curatorId) => {
    setSelectedCurators((prevSelected) => {
      if (prevSelected.includes(curatorId)) {
        return prevSelected.filter((id) => id !== curatorId);
      } else {
        return [...prevSelected, curatorId];
      }
    });
  };

  const handleSubmit = () => {
    const selectedCuratorsData = curators.filter((curator) =>
      selectedCurators.includes(curator._id)
    );
    onCuratorsSelect(selectedCuratorsData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Select Curators</h1>
      <div className="mb-4">
        {curators.map((curator) => (
          <div key={curator._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={curator._id}
              checked={selectedCurators.includes(curator._id)}
              onChange={() => handleSelect(curator._id)}
              className="mr-2"
            />
            <label htmlFor={curator._id}>
              {`${curator.name} ${curator.lastName}`}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Click to Add Selected Curators or Close tab
      </button>
    </div>
  );
};

export default CuratorSelect;
