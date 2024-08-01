import React, { createContext, useContext } from "react";
import useUserMuseum from "../hooks/useUserMuseum";
import usePlanDetails from "../hooks/usePlanDetails";

const MuseumContext = createContext();
const PlanContext = createContext();

export const MuseumProvider = ({ children }) => {
  const {
    museum,
    isLoading,
    error,
    fetchMuseum,
    updateExhibition,
    openExhibition,
    closeExhibition,
  } = useUserMuseum();
  const planDetails = usePlanDetails(museum);

  return (
    <MuseumContext.Provider
      value={{
        museum,
        isLoading,
        error,
        fetchMuseum,
        updateExhibition,
        openExhibition,
        closeExhibition,
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
