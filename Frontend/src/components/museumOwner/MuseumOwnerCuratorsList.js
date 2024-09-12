

import React, { useState } from 'react';
import { useMuseumContext } from '../../contexts/MuseumContext';
import ConfirmationDialog from '../common/ConfirmationDialog';

const MuseumOwnerCuratorsList = () => {
  const { museum, loading ,updateExhibition} = useMuseumContext();
  const exhibitions = museum?.exhibitions;
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCurator, setSelectedCurator] = useState(null);

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


  // const disableCurator = async (curatorId) => {
  //   try {
  //     for (const exhibition of exhibitions) {
  //       // Check if the curator exists in the current exhibition
  //       if (exhibition.curators.some(c => c._id === curatorId)) {
  //         const updatedCurators = exhibition.curators
  //           .filter(c => c._id !== curatorId)
  //           .map(c => c._id); // Extract just the curator IDs

  //         // Send the updated curators list to the backend for the exhibition
  //         await updateExhibition(exhibition._id, { curators: updatedCurators });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error disabling curator:", error);
  //   }

  //   setShowDialog(false); // Hide the dialog after disabling the curator
  // };
  const disableCurator = async (curatorId) => {
    try {
      // Filter exhibitions where the curator exists
      const exhibitionsToUpdate = exhibitions.filter(exhibition =>
        exhibition.curators.some(c => c._id === curatorId)
      );
  
      // Prepare a list of promises for updating exhibitions in parallel
      const updatePromises = exhibitionsToUpdate.map(async (exhibition) => {
        const updatedCurators = exhibition.curators
          .filter(c => c._id !== curatorId)
          .map(c => c._id); // Extract only the curator IDs
  
        // Return the promise for updating the exhibition
        return updateExhibition(exhibition._id, { curators: updatedCurators });
      });
  
      // Execute all update promises in parallel
      await Promise.all(updatePromises);
  
      console.log("Curator disabled in all exhibitions.");
    } catch (error) {
      console.error("Error disabling curator:", error);
    }
  
    setShowDialog(false); // Hide the dialog after disabling the curator
  };
  

  // Function to handle opening the confirmation dialog
  const handleDisableClick = (curator) => {
    setSelectedCurator(curator); // Set the selected curator for disabling
    setShowDialog(true); // Show the confirmation dialog
  };

  return (
    <div className="mx-auto p-4 overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Curators</h1>
      <div className="hidden md:block">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Exhibitions</th>
              <th className="py-2 px-4 border-b">Action</th>
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
                <td className="py-2 px-4 border-b">
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => handleDisableClick(curator)} // Show dialog on button click
                  >
                  Disable Curator
                </button>
              </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" md:hidden">
        {curators.map((curator) => (
          <div key={curator._id} className="mb-4 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">
              {`${curator.name} ${curator.lastName}`}
            </h2>
            <p className="mb-1">
              <strong>Email:</strong> {curator.email}
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> {curator.phoneNumber}
            </p>
            <p>
              <strong>Exhibitions:</strong> {curator.exhibitions.join(', ')}
            </p>
            <button 
            className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => handleDisableClick(curator)} // Show dialog on button click
            >
            Disable Curator
          </button>
          </div>
        ))}
      </div>
      {showDialog && (
        <ConfirmationDialog
          message={`Are you sure you want to remove ${selectedCurator?.name} ${selectedCurator?.lastName} from your museum?`}
          onConfirm={() => disableCurator(selectedCurator._id)} // Disable curator if confirmed
          onCancel={() => setShowDialog(false)} // Hide dialog if canceled
        />
      )}
    </div>
  );
};

export default MuseumOwnerCuratorsList;
