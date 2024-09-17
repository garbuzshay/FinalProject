import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the exhibition ID from the URL and to navigate
import { useAdminContext } from "../../contexts/AdminContext"; // Import the Admin context
import ArtworkCard from "../common/ArtworkCard"; // Import ArtworkCard component
import { useThemeMode } from "../../contexts/DarkModeContext";
import GoBackButton from "../common/GoBackButton"; // Assuming you have a GoBackButton component

const AdminViewExhibition = () => {
  const { id } = useParams(); // Get the exhibition ID from the URL
  const { exhibitionsData } = useAdminContext(); // Get exhibitions data from context
  const { exhibitions, isLoading, error } = exhibitionsData; // Destructure necessary data from exhibitions
  const { isDarkMode } = useThemeMode();
  const [currentExhibition, setCurrentExhibition] = useState(null);


  useEffect(() => {
    // Find the current exhibition based on the ID
    if (exhibitions && exhibitions.length > 0) {
      const exhibition = exhibitions.find((exhibit) => exhibit._id === id);
      setCurrentExhibition(exhibition);
    }
  }, [exhibitions, id]);

  if (isLoading) return <div>Loading...</div>; // Handle loading state
  if (error) return <div style={{ color: "red" }}>{error}</div>; // Handle error state

  return (
    <div className={`p-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}>
     

      {currentExhibition ? (
        <>
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            {currentExhibition.name}
          </h1>
          <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            {currentExhibition.description}
          </p>

          <div className="flex flex-wrap justify-center">
            {currentExhibition.artworks && currentExhibition.artworks.length > 0 ? (
              currentExhibition.artworks.map((artwork) => (
                <ArtworkCard
                  key={artwork._id}
                  id={artwork._id}
                  title={artwork.title}
                  description={artwork.description}
                  createdDateByArtist={artwork.createdDateByArtist}
                  artist={artwork.artist}
                  imageUrl={artwork.imageUrl}
                  clickable={false} // Prevent the user from clicking the ArtworkCard
                />
              ))
            ) : (
              <p>No artworks available for this exhibition.</p>
            )}
          </div>
        </>
      ) : (
        <div>No exhibition found.</div>
      )}
       <GoBackButton /> {/* Go Back button */}
    </div>
  );
};

export default AdminViewExhibition;