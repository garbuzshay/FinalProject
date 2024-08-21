import React from "react";
import NavigationButton from "./NavigationButton";

export const NavigationButtons = ({
  currentPage,
  goToPreviousPage,
  goToNextPage,
  nextButtonText = "Next",
  prevButtonText = "Previous",
  isPrevPageExist,
}) => {
  const prevButtonVisible = currentPage > 0 || isPrevPageExist;

  return (
    <div className="flex justify-between ">
      {prevButtonVisible ? (
        <>
          <NavigationButton 
            className="rounded-l-none rounded-r-[20px]" 
            onClick={goToPreviousPage} 
            text={prevButtonText} 
          />
          <NavigationButton 
            className="rounded-l-[20px] rounded-r-none" 
            onClick={goToNextPage} 
            text={nextButtonText} 
          />
        </>
      ) : (
        <div className="flex justify-end w-full">
          <NavigationButton 
            className="rounded-l-[20px] rounded-r-none" 
            onClick={goToNextPage} 
            text={nextButtonText} 
          />
        </div>
      )}
    </div>
  );  
};
