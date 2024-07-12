import React from "react";
import NavigationButton from "./NavigationButton";

export const NavigationButtons = ({ currentPage, goToPreviousPage, goToNextPage, nextButtonText = "Next", prevButtonText = "Previous", isPrevPageExist }) => {
  const prevButtonVisible = currentPage > 0 || isPrevPageExist;

  return (
    <div className="flex justify-between p-4 w-full fixed bottom-4">
      {prevButtonVisible ? (
        <>
          <NavigationButton onClick={goToPreviousPage} text={prevButtonText} />
          <NavigationButton onClick={goToNextPage} text={nextButtonText} />
        </>
      ) : (
        <div className="flex justify-end w-full">
          <NavigationButton onClick={goToNextPage} text={nextButtonText} />
        </div>
      )}
    </div>
  );
};
