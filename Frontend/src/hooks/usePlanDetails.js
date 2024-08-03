import { useState, useEffect } from 'react';

const usePlanDetails = (museum, exhibitions) => {
  const [planDetails, setPlanDetails] = useState({
    maxExhibitions: 0,
    maxArtWorks: 0,
    exhibitionsLeft: 0,
    artworksLeft: 0,
  });

  useEffect(() => {
    if (museum) {
      const planData = museum.plan;

      const openExhibitions = exhibitions?.filter(exhibition => exhibition.status === 'open') || [];
      const exhibitionsUsed = openExhibitions.length;
      const artworksUsed = openExhibitions.reduce(
        (total, exhibition) => total + (exhibition.maxArtworks || 0),
        0
      );

      setPlanDetails({
        maxExhibitions: planData.maxExhibitions,
        maxArtWorks: planData.maxArtWorks,
        exhibitionsLeft: planData.maxExhibitions
          ? planData.maxExhibitions - exhibitionsUsed
          : null,
        artworksLeft: planData.maxArtWorks
          ? planData.maxArtWorks - artworksUsed
          : null,
      });
    }
  }, [museum]);

  return planDetails;
};

export default usePlanDetails;
