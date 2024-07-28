import { useRegisterContext } from "../contexts/RegisterContext";
import DisplayData from "../components/registration/DisplayData";
import { Stepper, StepLabel, Step } from "@mui/material";
import {NavigationButtons} from "../components/common/NavigationButtons";
import Footer from "../components/common/Footer";

const RegistrationPage = () => {
  const { currentStep, steps, goToNextPage, goToPreviousPage } = useRegisterContext();

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="w-full flex justify-center">
        <Stepper
          className="w-1/3"
          activeStep={currentStep}
          orientation="horizontal"
        >
          {steps.map((step, index) => <Step key={index}>
            <StepLabel />
          </Step>)}
         
        </Stepper>
      </div>
      <div className="w-full">
        {steps[currentStep].component}
      </div>
      <NavigationButtons currentPage={currentStep} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} nextButtonText={currentStep === steps.length - 1 ? "Confirm & Pay" : "Next"} isPrevPageExist={true}/>
    {/* <DisplayData/> */}
    <Footer/>
    </div>
  );
};

export default RegistrationPage;
