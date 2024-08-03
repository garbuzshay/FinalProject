
// import { useState, useEffect } from "react";
// import museumApi from "../api/MuseumApi"; // Adjust the path as needed
// import exhibitionsApi from "../api/ExhibitionsApi";

// const useOpenExhibit = () => {
//   const [planDetails, setPlanDetails] = useState({
//     maxExhibitions: 0,
//     maxArtWorks: 0,
//     exhibitionsLeft: 0,
//     artworksLeft: 0,
//   });

//   const [museum, setMuseum] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMuseum = async () => {
//       try {
//         const museumData = await museumApi.getUserMuseum();
//         setMuseum(museumData);

//         const planData = museumData.plan;

//         const exhibitionsUsed = museumData.exhibitions?.length || 0;
//         const artworksUsed =
//           museumData.exhibitions?.reduce(
//             (total, exhibition) => total + (exhibition.maxArtworks || 0),
//             0
//           ) || 0;

//         setPlanDetails({
//           maxExhibitions: planData.maxExhibitions,
//           maxArtWorks: planData.maxArtWorks,
//           exhibitionsLeft: planData.maxExhibitions
//             ? planData.maxExhibitions - exhibitionsUsed
//             : null,
//           artworksLeft: planData.maxArtWorks
//             ? planData.maxArtWorks - artworksUsed
//             : null,
//         });
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMuseum();
//   }, []);

//   const handleSubmit = async (data) => {
//     if (
//       (planDetails.exhibitionsLeft !== null &&
//         planDetails.exhibitionsLeft > 0 &&
//         planDetails.artworksLeft !== null &&
//         data.maxArtworks <= planDetails.artworksLeft) ||
//       planDetails.artworksLeft === null
//     ) {
//       try {
//         const exhibitionData = {
//           ...data,
//           curators: data.curators,
//           museum: museum.id, // Use the museum's ID
//         };
//         await exhibitionsApi.createExhibition(exhibitionData);
//         alert("Exhibition created successfully");
//         // Reset form data
//         return true; // Indicate success
//       } catch (error) {
//         console.error("Error creating exhibition:", error);
//         alert("Failed to create exhibition");
//         return false; // Indicate failure
//       }
//     } else {
//       alert("Cannot create more exhibitions or artworks limit exceeded");
//       return false; // Indicate failure
//     }
//   };

//   return {
//     planDetails,
//     museum,
//     isLoading,
//     error,
//     handleSubmit,
//   };
// };

// export default useOpenExhibit;
import { useContext } from 'react';
import { useMuseumContext, usePlanContext } from '../contexts/MuseumContext';
import exhibitionsApi from '../api/ExhibitionsApi';

const useOpenExhibit = () => {
  const { museum, fetchMuseum } = useMuseumContext();
  const planDetails = usePlanContext();

  const handleSubmit = async (data) => {
    if (
      (planDetails.exhibitionsLeft !== null &&
        planDetails.exhibitionsLeft > 0 &&
        planDetails.artworksLeft !== null &&
        data.maxArtworks <= planDetails.artworksLeft) ||
      planDetails.artworksLeft === null
    ) {
      try {
        const exhibitionData = {
          ...data,
          curators: data.curators,
          museum: museum.id,
        };
        await exhibitionsApi.createExhibition(exhibitionData);
        alert('Exhibition created successfully');
        fetchMuseum(); // Refresh museum data
        return true; // Indicate success
      } catch (error) {
        console.error('Error creating exhibition:', error);
        alert(error.response?.data?.message || 'Failed to create exhibition');
        return false; // Indicate failure
      }
    } else {
      alert('Cannot create more exhibitions or artworks limit exceeded');
      return false; // Indicate failure
    }
  };

  return {
    planDetails,
    museum,
    handleSubmit,
  };
};

export default useOpenExhibit;
