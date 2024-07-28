import { useIntroContext } from "../contexts/IntroContext";
import ContentSection from "../components/intros/ContentSection";
import pageData from "../data/introPageData";
import { NavigationButtons } from "../components/common/NavigationButtons";
import MobileStepper from '@mui/material/MobileStepper';
import Footer from "../components/common/Footer";


const IntroPage = () => {
  const { currentPage, goToNextPage, goToPreviousPage } = useIntroContext();
  const { logoSrc, explanation, imageSrc, title, nextButtonText } =
    pageData[currentPage];

  
  return (
    <div >
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
          sx={{justifyContent:"center"}}
          position="static"
        >

          </MobileStepper>

      <NavigationButtons currentPage={currentPage} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} nextButtonText={nextButtonText} />
      <Footer/>
    </div>
  );
};

export default IntroPage;
