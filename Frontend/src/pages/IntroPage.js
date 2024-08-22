import { useIntroContext } from "../contexts/IntroContext";
import ContentSection from "../components/intros/ContentSection";
import pageData from "../data/introPageData";
import { NavigationButtons } from "../components/common/NavigationButtons";
import MobileStepper from "@mui/material/MobileStepper";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import FloatingPicture from "../components/intros/FloatingPicture";

const IntroPage = () => {
  const { currentPage, goToNextPage, goToPreviousPage } = useIntroContext();
  const { logoSrc, explanation, imageSrc, title, nextButtonText } =
    pageData[currentPage];

  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 1920px)");

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    // <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300">
    <div className="min-h-screen flex flex-col justify-between">
      <div className="px-5">
        <ContentSection
          logoSrc={logoSrc}
          title={title}
          explanation={explanation}
          imageSrc={imageSrc}
        />
        <div className="flex justify-center">
          <MobileStepper
            activeStep={currentPage}
            variant="dots"
            steps={pageData.length}
            orientation="horizontal"
            sx={{ justifyContent: "center", backgroundColor: "transparent" }}
            position="static"
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 pb-6">
        <NavigationButtons
          currentPage={currentPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          nextButtonText={nextButtonText}
        />
        <button
          onClick={handleLoginClick}
          className="bg-transparent border-none text-blue-600 underline cursor-pointer text-base"
        >
          Already a user? Click here
        </button>
      </div>

      {/* {isLargeScreen && <FloatingPicture />} */}
    </div>
  );
};

export default IntroPage;
