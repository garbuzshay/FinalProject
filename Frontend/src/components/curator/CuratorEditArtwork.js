
// CuratorEditArtwork.js
import React from "react";
import ArtworkForm from "../common/ArtworkForm";
import { useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import GoBackButton from "../common/GoBackButton";
import useNavigation from "../../hooks/useNavigation";

const CuratorEditArtwork = () => {
  const { exhibitionId, artworkId } = useParams();
  const { exhibitions, updateArtwork, deleteArtwork } = useMuseumContext();
  const {goBack} = useNavigation();

  const exhibition = exhibitions.find(
    (exhibit) => exhibit._id === exhibitionId
  );
  const initialData = exhibition
    ? exhibition.artworks.find((art) => art._id === artworkId)
    : {};

  const handleEditArtwork = async (data) => {
    try {
      await updateArtwork(exhibitionId, artworkId, data);
      alert("Artwork updated successfully");
      goBack();
    } catch (error) {
      console.error("There was an error updating the artwork!", error);
    }
  };

  const handleDeleteArtwork = async () => {
    try {
      await deleteArtwork(exhibitionId, artworkId);
      alert("Artwork deleted successfully");
      goBack();
    } catch (error) {
      console.error("There was an error deleting the artwork!", error);
    }
  };

  return (
    <div >
    <>
      <ArtworkForm
        onSubmit={handleEditArtwork}
        onDelete={handleDeleteArtwork}
        initialData={initialData}
        formType="edit"
      />
      <GoBackButton />
    </>
    </div>
  );
};

export default CuratorEditArtwork;
