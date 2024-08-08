import { useIntroContext } from "../contexts/IntroContext";
import ContentSection from "../components/intros/ContentSection";
import pageData from "../data/introPageData";
import { NavigationButtons } from "../components/common/NavigationButtons";
import MobileStepper from "@mui/material/MobileStepper";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const { currentPage, goToNextPage, goToPreviousPage } = useIntroContext();
  const { logoSrc, explanation, imageSrc, title, nextButtonText } =
    pageData[currentPage];

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <ContentSection
        logoSrc={logoSrc}
        explanation={explanation}
        title={title}
        imageSrc={imageSrc}
      />
      <MobileStepper
        activeStep={currentPage}
        variant="dots"
        steps={pageData.length}
        orientation="horizontal"
        sx={{ justifyContent: "center" }}
        position="static"
      ></MobileStepper>
      <div className="flex justify-center">
        <div className="absolute text-center mt-2 z-20">
          <button
            onClick={handleLoginClick}
            className="bg-transparent border-none text-blue-600 underline cursor-pointer py-2 px-4 text-lg"
          >
            Already a user? Click here
          </button>
        </div>
      </div>
      <NavigationButtons
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        nextButtonText={nextButtonText}
      />
    </div>
  );
};

export default IntroPage;
