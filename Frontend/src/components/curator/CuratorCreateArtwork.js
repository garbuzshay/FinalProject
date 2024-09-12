// import React from "react";
// import ArtworkForm from "../common/ArtworkForm";
// import { useMuseumContext } from "../../contexts/MuseumContext";

// const CuratorCreateArtwork = ({ exhibitionId }) => {
//   const { createArtwork } = useMuseumContext();

//   const handleCreateArtwork = async (data) => {
//     try {
//       const response = await createArtwork(exhibitionId, data);
//       if (response) {
//         alert("Artwork created successfully");
//       }

//     } catch (error) {
//       console.error("There was an error creating the artwork!", error);
//     }
//   };

//   return <ArtworkForm onSubmit={handleCreateArtwork} formType="create" />;
// };

// export default CuratorCreateArtwork;
import React, { useState, useEffect } from "react";
import ArtworkForm from "../common/ArtworkForm";
import { useMuseumContext } from "../../contexts/MuseumContext";

const CuratorCreateArtwork = ({ exhibitionId, onCreate }) => {
  const { createArtwork } = useMuseumContext();
  const [isFormVisible, setFormVisible] = useState(true);

  const handleCreateArtwork = async (data) => {
    try {
      const response = await createArtwork(exhibitionId, data);
      if (response) {
        alert("Artwork created successfully");

        // Hide the form after 2 seconds and invoke the onCreate callback
        // setTimeout(() => {
        setFormVisible(false);
        if (onCreate) onCreate(); // Notify parent that form submission is done
        // }, 2000);
      }
    } catch (error) {
      console.error("There was an error creating the artwork!", error);
    }
  };

  useEffect(() => {
    // Optionally reset the form visibility when component mounts/unmounts
    return () => setFormVisible(true);
  }, []);

  return isFormVisible ? (
    <ArtworkForm onSubmit={handleCreateArtwork} formType="create" />
  ) : null; // The form disappears when it's not visible
};

export default CuratorCreateArtwork;
