
// import React from 'react';
// import { useMuseumContext } from '../../contexts/MuseumContext';
// import ArtworkForm from '../common/ArtworkForm';
// import { useParams } from 'react-router-dom';
// import GoBackButton from '../common/GoBackButton';
// import useNavigation from '../../hooks/useNavigation';

// const MuseumOwnerCreateArtwork = () => {
//   const { id } = useParams();
//   const { createArtwork, exhibitions } = useMuseumContext();
//   // const { artworksLeft } = usePlanContext();
//   const { goBack } = useNavigation();


//   const exhibition = exhibitions.find(exhibition => exhibition._id === id);

//   const handleCreateArtwork = async (data) => {
//     try {
//       const response = await createArtwork(id, data);
//       if (response) {
//         alert('Artwork created successfully');
//         goBack();
//       }
//     } catch (error) {
//       console.error('There was an error creating the artwork!', error);
//       alert('Failed to create artwork. Please try again.');
//     }
//   };

//   // Check if there are artworks left to create for this specific exhibition
//   const artworksLeftForExhibition = exhibition && (exhibition.maxArtworks - exhibition.artworks.length);

//   if (artworksLeftForExhibition <= 0) {
//     return (
//       <div >
//         <p className="text-xl font-semibold">
//           The exhibition is already full. No more artworks can be added.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
 
//       <ArtworkForm
//         onSubmit={handleCreateArtwork}
//         formType="create"
//       />
//       <div className="mt-6">
//         <GoBackButton />
//       </div>
//     </div>
//   );
// };

// export default MuseumOwnerCreateArtwork;

import React, { useState } from "react";
import { useMuseumContext } from "../../contexts/MuseumContext";
import ArtworkForm from "../common/ArtworkForm";
import { useParams } from "react-router-dom";
import GoBackButton from "../common/GoBackButton";
import useNavigation from "../../hooks/useNavigation";

const MuseumOwnerCreateArtwork = () => {
  const { id } = useParams();
  const { createArtwork, exhibitions } = useMuseumContext();
  const { goBack } = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

  const handleCreateArtwork = async (data) => {
    try {
      setIsSubmitting(true); // Show spinner during submission
      const response = await createArtwork(id, data);
      if (response) {
        alert("Artwork created successfully");
        goBack();
      }
    } catch (error) {
      console.error("There was an error creating the artwork!", error);
      alert("Failed to create artwork. Please try again.");
    } finally {
      setIsSubmitting(false); // Hide spinner
    }
  };

  // Check if there are artworks left to create for this specific exhibition
  const artworksLeftForExhibition =
    exhibition && exhibition.maxArtworks - exhibition.artworks.length;

  if (artworksLeftForExhibition <= 0) {
    return (
      <div>
        <p className="text-xl font-semibold">
          The exhibition is already full. No more artworks can be added.
        </p>
      </div>
    );
  }

  return (
    <div>
      {isSubmitting ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-4 text-lg font-medium">Submitting...</p>
        </div>
      ) : (
        <>
          <ArtworkForm onSubmit={handleCreateArtwork} formType="create" />
          <div className="mt-6">
            <GoBackButton />
          </div>
        </>
      )}
    </div>
  );
};

export default MuseumOwnerCreateArtwork;
