// // Frontend\src\hooks\useMuseum.js
// import { useState, useEffect } from 'react';
// import museumApi from '../api/MuseumApi';
// import exhibitionsApi from '../api/ExhibitionsApi';
// import artworksApi from '../api/ArtworksApi';

// const useMuseum = (role) => {
//   const [museum, setMuseum] = useState(null);
//   const [exhibitions, setExhibitions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchMuseum = async () => {
//     setIsLoading(true);
//     try {
//       if (role === 'MuseumOwner') {
//         const museumData = await museumApi.getUserMuseum();
//         setMuseum(museumData);
//         setExhibitions(museumData?.exhibitions || []);
//       } else if (role === 'Curator') {
//         const exhibitionsData = await exhibitionsApi.getUserExhibitions();
//         setExhibitions(exhibitionsData);
//       }
    
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//   };

//   const updateExhibition = async (exhibitionId, updatedData) => {
//     try {
//       await exhibitionsApi.updateExhibition(exhibitionId, updatedData);
//       await fetchMuseum();
//     } catch (error) {
//       setError(error);
//       throw error;
//     }
//   };

//   const openExhibition = async (exhibitionId) => {
//     try {
//       await exhibitionsApi.updateExhibition(exhibitionId, { status: 'open' });
//       await fetchMuseum();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const closeExhibition = async (exhibitionId) => {
//     try {
//       await exhibitionsApi.updateExhibition(exhibitionId, { status: 'closed' });
//       await fetchMuseum();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const updateArtwork = async (exhibitionId, artworkId, artworkData) => {
//     try {
//       const response = await artworksApi.updateArtwork(artworkId, artworkData);
//       setExhibitions(prevExhibitions => {
//         const updatedExhibitions = prevExhibitions.map(exhibition => {
//           if (exhibition._id === exhibitionId) {
//             const updatedArtworks = exhibition.artworks.map(artwork =>
//               artwork._id === artworkId ? { ...artwork, ...artworkData } : artwork
//             );
//             return { ...exhibition, artworks: updatedArtworks };
//           }
//           return exhibition;
//         });
//         return updatedExhibitions;
//       });
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const createArtwork = async (exhibitionId, artworkData) => {
//     try {
//       const response = await artworksApi.createArtwork(exhibitionId, artworkData);
//       setExhibitions(prevExhibitions => {
//         return prevExhibitions.map(exhibition => {
//           if (exhibition._id === exhibitionId) {
//             return { ...exhibition, artworks: [...exhibition.artworks, response] };
//           }
//           return exhibition;
//         });
//       });
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const deleteArtwork = async (exhibitionId, artworkId) => {
//     try {
//       await artworksApi.deleteArtwork(exhibitionId, artworkId);
//       setExhibitions(prevExhibitions => {
//         const updatedExhibitions = prevExhibitions.map(exhibition => {
//           if (exhibition._id === exhibitionId) {
//             const updatedArtworks = exhibition.artworks.filter(artwork => artwork._id !== artworkId);
//             return { ...exhibition, artworks: updatedArtworks };
//           }
//           return exhibition;
//         });
//         // fetchMuseum();
//         return updatedExhibitions;
//       });
//     } catch (error) {
//       throw error;
//     }
//   };


//   const updateMuseumDetails = async (details) => {
//     try {
//       await museumApi.updateMuseum(museum._id, details);
//       setMuseum(prevMuseum => ({ ...prevMuseum, ...details }));
//     } catch (err) {
//       setError(err);
//     }
//   };


//   useEffect(() => {
//     fetchMuseum();
//   }, []);

//   return {
//     museum,
//     exhibitions,
//     isLoading,
//     error,
//     fetchMuseum,
//     updateExhibition,
//     openExhibition,
//     closeExhibition,
//     updateArtwork,
//     createArtwork,
//     deleteArtwork,
//     updateMuseumDetails
//   };
// };

// export default useMuseum;

import { useState, useEffect, useCallback } from 'react';
import museumApi from '../api/MuseumApi';
import exhibitionsApi from '../api/ExhibitionsApi';
import artworksApi from '../api/ArtworksApi';

const useMuseum = (role) => {
  const [museum, setMuseum] = useState(null);
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMuseum = useCallback(async () => {
    setIsLoading(true);
    try {
      if (role === 'MuseumOwner') {
        const museumData = await museumApi.getUserMuseum();
        setMuseum(museumData);
        setExhibitions(museumData?.exhibitions || []);
      } else if (role === 'Curator') {
        const exhibitionsData = await exhibitionsApi.getUserExhibitions();
        setExhibitions(exhibitionsData);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [role]);

  const updateExhibition = useCallback(async (exhibitionId, updatedData) => {
    try {
      await exhibitionsApi.updateExhibition(exhibitionId, updatedData);
      await fetchMuseum();
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [fetchMuseum]);

  const openExhibition = useCallback(async (exhibitionId) => {
    try {
      await exhibitionsApi.updateExhibition(exhibitionId, { status: 'open' });
      await fetchMuseum();
    } catch (err) {
      setError(err.message);
    }
  }, [fetchMuseum]);

  const closeExhibition = useCallback(async (exhibitionId) => {
    try {
      await exhibitionsApi.updateExhibition(exhibitionId, { status: 'closed' });
      await fetchMuseum();
    } catch (err) {
      setError(err.message);
    }
  }, [fetchMuseum]);

  const updateArtwork = useCallback(async (exhibitionId, artworkId, artworkData) => {
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
  }, []);

  const createArtwork = useCallback(async (exhibitionId, artworkData) => {
    try {
      const response = await artworksApi.createArtwork(exhibitionId, artworkData);
      setExhibitions(prevExhibitions => {
        return prevExhibitions.map(exhibition => {
          if (exhibition._id === exhibitionId) {
            return { ...exhibition, artworks: [...exhibition.artworks, response] };
          }
          return exhibition;
        });
      });
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteArtwork = useCallback(async (exhibitionId, artworkId) => {
    try {
      await artworksApi.deleteArtwork(exhibitionId, artworkId);
      setExhibitions(prevExhibitions => {
        const updatedExhibitions = prevExhibitions.map(exhibition => {
          if (exhibition._id === exhibitionId) {
            const updatedArtworks = exhibition.artworks.filter(artwork => artwork._id !== artworkId);
            return { ...exhibition, artworks: updatedArtworks };
          }
          return exhibition;
        });
        return updatedExhibitions;
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const updateMuseumDetails = useCallback(async (details) => {
    try {
      await museumApi.updateMuseum(museum._id, details);
      setMuseum(prevMuseum => ({ ...prevMuseum, ...details }));
    } catch (err) {
      setError(err);
    }
  }, [museum?._id]);

  useEffect(() => {
    fetchMuseum();
  }, [fetchMuseum]);

  return {
    museum,
    exhibitions,
    isLoading,
    error,
    fetchMuseum,
    updateExhibition,
    openExhibition,
    closeExhibition,
    updateArtwork,
    createArtwork,
    deleteArtwork,
    updateMuseumDetails
  };
};

export default useMuseum;