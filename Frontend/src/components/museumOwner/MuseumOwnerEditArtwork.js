
// import React, { useEffect, useState, useMemo } from "react";
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

//   const initialData = useMemo(() => {
//     const exhibition = exhibitions.find((exhibit) => exhibit._id === id);
//     return exhibition
//       ? exhibition.artworks.find((art) => art._id === artworkId)
//       : {};
//   }, [exhibitions, id, artworkId]);

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
//       <GoBackButton />
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
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
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
      setIsSubmitting(true); // Show spinner during submission
      await updateArtwork(id, artworkId, data);
      alert("Artwork updated successfully");
      goBack();
    } catch (error) {
      console.error("There was an error updating the artwork!", error);
    } finally {
      setIsSubmitting(false); // Hide spinner
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
      {loading || isSubmitting ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-4 text-lg font-medium">
            {loading ? "Loading..." : "Updating..."}
          </p>
        </div>
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
