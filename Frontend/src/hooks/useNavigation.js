import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const useNavigation = () => {
  const { currentPage, goToNextPage, goToPreviousPage } =
    useContext(AppContext);
  return { currentPage, goToNextPage, goToPreviousPage };
};

export default useNavigation;
