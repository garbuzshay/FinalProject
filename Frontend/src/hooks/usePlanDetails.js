import { useState, useEffect } from 'react';

const usePlanDetails = (museum) => {
  const [planDetails, setPlanDetails] = useState({
    maxExhibitions: 0,
    maxArtWorks: 0,
    exhibitionsLeft: 0,
    artworksLeft: 0,
  });

  useEffect(() => {
    if (museum) {
      const planData = museum.plan;

      const exhibitionsUsed = museum.exhibitions?.length || 0;
      const artworksUsed =
        museum.exhibitions?.reduce(
          (total, exhibition) => total + (exhibition.maxArtworks || 0),
          0
        ) || 0;

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
