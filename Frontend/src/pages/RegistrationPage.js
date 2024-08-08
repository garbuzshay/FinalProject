import { useRegisterContext } from "../contexts/RegisterContext";
import DisplayData from "../components/registration/DisplayData";
import { Stepper, StepLabel, Step } from "@mui/material";
import {NavigationButtons} from "../components/common/NavigationButtons";


// const RegistrationPage = () => {
//   const { currentStep, steps, goToNextPage, goToPreviousPage } = useRegisterContext();

//   return (
//     <div className="flex flex-col items-center p-4 space-y-6">
      
//       <div className="w-full flex justify-center">
//         <Stepper
//           className="w-1/3"
//           activeStep={currentStep}
//           orientation="horizontal"
//         >
//           {steps.map((step, index) => <Step key={index}>
//             <StepLabel />
//           </Step>)}
         
//         </Stepper>
//       </div>
//       <div className="w-full">
//         {steps[currentStep].component}
//       </div>
//       <NavigationButtons currentPage={currentStep} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} nextButtonText={currentStep === steps.length - 1 ? "Confirm & Pay" : "Next"} isPrevPageExist={true}/>
//     {/* <DisplayData/> */}
//     <Footer/>
//     </div>
//   );
// };

// export default RegistrationPage;

// Import the logo image directly
import logoSrc from "../assets/LogoMusuem.png";
import Logo from "../components/intros/Logo";

const RegistrationPage = () => {
  const { currentStep, steps, goToNextPage, goToPreviousPage } = useRegisterContext();
  
  const src=logoSrc;
  return (
    <div className ="container">
      {/* Logo at the upper left side */}
      <div className="absolute top-0 left-0">
        <Logo src={logoSrc} className="h-8 w-auto" />
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center p-4 space-y-6 min-h-screen">
        <div className="w-full flex justify-center">
          <Stepper
            className="w-full max-w-md"
            activeStep={currentStep}
            orientation="horizontal"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="w-full max-w-md">
          {steps[currentStep].component}
        </div>
        <NavigationButtons  className=" bottom-0"
          currentPage={currentStep} 
          goToNextPage={goToNextPage} 
          goToPreviousPage={goToPreviousPage} 
          nextButtonText={currentStep === steps.length - 1 ? "Confirm & Pay" : "Next"} 
          isPrevPageExist={true}
        />

      </div>
    </div>
  );
};

export default RegistrationPage;