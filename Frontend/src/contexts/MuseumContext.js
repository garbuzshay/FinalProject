// import React, { createContext, useContext } from "react";
// import useUserMuseum from "../hooks/useUserMuseum";
// import usePlanDetails from "../hooks/usePlanDetails";

// const MuseumContext = createContext();
// const PlanContext = createContext();

// export const MuseumProvider = ({ children }) => {
//   const {
//     museum,
//     isLoading,
//     fetchMuseum,
//     updateExhibition,
//     openExhibition,
//     closeExhibition,
//   } = useUserMuseum();
//   const planDetails = usePlanDetails(museum);

//   return (
//     <MuseumContext.Provider
//       value={{
//         museum,
//         isLoading,
//         fetchMuseum,
//         updateExhibition,
//         openExhibition,
//         closeExhibition,
//       }}
//     >
//       <PlanContext.Provider value={planDetails}>
//         {children}
//       </PlanContext.Provider>
//     </MuseumContext.Provider>
//   );
// };

// export const useMuseumContext = () => {
//   const context = useContext(MuseumContext);
//   if (!context) {
//     throw new Error("useMuseumContext must be used within a MuseumProvider");
//   }
//   return context;
// };

// export const usePlanContext = () => {
//   const context = useContext(PlanContext);
//   if (!context) {
//     throw new Error("usePlanContext must be used within a MuseumProvider");
//   }
//   return context;
// };

// Frontend\src\contexts\MuseumContext.js
import React, { createContext, useContext } from "react";
import useMuseum from "../hooks/useMuseum";
import usePlanDetails from "../hooks/usePlanDetails";

const MuseumContext = createContext();
const PlanContext = createContext();

export const MuseumProvider = ({ children, role }) => {
  const {
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
  } = useMuseum(role);
  const planDetails = usePlanDetails(museum, exhibitions);

  return (
    <MuseumContext.Provider
      value={{
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
      }}
    >
      <PlanContext.Provider value={planDetails}>
        {children}
      </PlanContext.Provider>
    </MuseumContext.Provider>
  );
};

export const useMuseumContext = () => {
  const context = useContext(MuseumContext);
  if (!context) {
    throw new Error("useMuseumContext must be used within a MuseumProvider");
  }
  return context;
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a MuseumProvider");
  }
  return context;
};
