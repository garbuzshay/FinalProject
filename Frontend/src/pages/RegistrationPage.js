import { useRegisterContext } from "../contexts/RegisterContext";
import { Stepper, StepLabel, Step } from "@mui/material";
import {NavigationButtons} from "../components/common/NavigationButtons";

import logoSrc from "../assets/LogoMusuem.png";
import Logo from "../components/intros/Logo";

const RegistrationPage = () => {
  const { currentStep, steps, goToNextPage, goToPreviousPage } = useRegisterContext();
  
  return (
    <div>
      <div className="absolute top-0 left-0">
        <Logo src={logoSrc} className="h-8 w-auto" />
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center p-4">
       
          <Stepper
            className="w-full md:max-w-md"
            activeStep={currentStep}
            orientation="horizontal"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>

        <div className="w-full max-w-md py-4">
          {steps[currentStep].component}
        </div>

        </div>
        <NavigationButtons
          currentPage={currentStep} 
          goToNextPage={goToNextPage} 
          goToPreviousPage={goToPreviousPage} 
          nextButtonText={currentStep === steps.length - 1 ? "Confirm & Pay" : "Next"} 
          isPrevPageExist={true}
        />

      
    </div>
  );
};

export default RegistrationPage;