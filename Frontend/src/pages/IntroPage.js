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
    <div>
      <div>
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
      </div>
      <NavigationButtons
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        nextButtonText={nextButtonText}
      />

      <button
        onClick={handleLoginClick}
        className="bg-transparent border-none text-blue-600 underline cursor-pointer px-4 text-base"
      >
        Already a user? Click here
      </button>
    </div>
  );
};

export default IntroPage;
