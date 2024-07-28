import { useState, useEffect } from 'react';
import exhibitionsApi from '../api/ExhibitionsApi';
import artworksApi from '../api/ArtworksApi';

const useUserExhibitions = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const updateArtwork = async (exhibitionId, artworkId, artworkData) => {
        try {
          const response = await artworksApi.updateArtwork(artworkId, artworkData);
          setExhibitions(prevExhibitions => {
            const updatedExhibitions = prevExhibitions.map(exhibition => {
              if (exhibition._id === exhibitionId) {
                const updatedArtworks = exhibition.artworks.map(artwork => 
                  artwork._id === artworkId ? { ...artwork, ...artworkData } : artwork
                );
                return { ...exhibition, artworks: updatedArtworks };
              }
              return exhibition;
            });
            return updatedExhibitions;
          });
          return response;
        } catch (error) {
          throw error;
        }
      };


    useEffect(() => {
        const fetchExhibitions = async () => {
            setIsLoading(true);
            try {
                const data = await exhibitionsApi.getUserExhibitions();
                setExhibitions(data); // Make sure this matches the structure of your API response
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchExhibitions();
    }, []);

    return { exhibitions, isLoading, error , updateArtwork};
};

export default useUserExhibitions;
