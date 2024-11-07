

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import ArtworkForm from "../common/ArtworkForm";
// import useNavigation from "../../hooks/useNavigation";
// import GoBackButton from "../common/GoBackButton";

// const MuseumOwnerEditArtwork = () => {
//   const { id, artworkId } = useParams();
//   const { exhibitions, updateArtwork, deleteArtwork } = useMuseumContext();
//   const [loading, setLoading] = useState(true);
//   const { goBack } = useNavigation();

//   const exhibition = exhibitions.find((exhibit) => exhibit._id === id);
//   const initialData = exhibition
//     ? exhibition.artworks.find((art) => art._id === artworkId)
//     : {};

//   useEffect(() => {
//     if (initialData) {
//       setLoading(false);
//     }
//   }, [initialData]);

//   const handleEditArtwork = async (data) => {
//     try {
//       await updateArtwork(id, artworkId, data);
//       alert("Artwork updated successfully");
//       goBack();
//     } catch (error) {
//       console.error("There was an error updating the artwork!", error);
//     }
//   };

//   const handleDeleteArtwork = async () => {
//     try {
//       await deleteArtwork(id, artworkId);
//       alert("Artwork deleted successfully");
//       goBack();
//     } catch (error) {
//       console.error("There was an error deleting the artwork!", error);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ArtworkForm
//           onSubmit={handleEditArtwork}
//           onDelete={handleDeleteArtwork}
//           initialData={initialData}
//           formType="edit"
//         />
//       )}
//       <GoBackButton/>
//     </div>
//   );
// };

// export default MuseumOwnerEditArtwork;


import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import ArtworkForm from "../common/ArtworkForm";
import useNavigation from "../../hooks/useNavigation";
import GoBackButton from "../common/GoBackButton";

const MuseumOwnerEditArtwork = () => {
  const { id, artworkId } = useParams();
  const { exhibitions, updateArtwork, deleteArtwork } = useMuseumContext();
  const [loading, setLoading] = useState(true);
  const { goBack } = useNavigation();

  const initialData = useMemo(() => {
    const exhibition = exhibitions.find((exhibit) => exhibit._id === id);
    return exhibition
      ? exhibition.artworks.find((art) => art._id === artworkId)
      : {};
  }, [exhibitions, id, artworkId]);

  useEffect(() => {
    if (initialData) {
      setLoading(false);
    }
  }, [initialData]);

  const handleEditArtwork = async (data) => {
    try {
      await updateArtwork(id, artworkId, data);
      alert("Artwork updated successfully");
      goBack();
    } catch (error) {
      console.error("There was an error updating the artwork!", error);
    }
  };

  const handleDeleteArtwork = async () => {
    try {
      await deleteArtwork(id, artworkId);
      alert("Artwork deleted successfully");
      goBack();
    } catch (error) {
      console.error("There was an error deleting the artwork!", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ArtworkForm
          onSubmit={handleEditArtwork}
          onDelete={handleDeleteArtwork}
          initialData={initialData}
          formType="edit"
        />
      )}
      <GoBackButton />
    </div>
  );
};

export default MuseumOwnerEditArtwork;