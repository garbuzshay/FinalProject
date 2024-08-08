import React, { createContext, useContext } from "react";
import useMuseums from "../hooks/useMuseums";
import useExhibitions from "../hooks/useExhibitions";
import useRequests from "../hooks/useRequests";
import useUser from "../hooks/useUser";
import usePlans from "../hooks/usePlans";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const museumsData = useMuseums();
  const exhibitionsData = useExhibitions();
  const requestsData = useRequests();
  const usersData = useUser();
  const plansData = usePlans();

  const fetchData = async () => {
    museumsData.fetchMuseums();
    exhibitionsData.fetchExhibitions();
    requestsData.fetchRequests();
    usersData.fetchUsers();
    plansData.fetchPlans();
  };

  return (
    <AdminContext.Provider
      value={{ museumsData, exhibitionsData, requestsData, usersData, plansData, fetchData }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
};
