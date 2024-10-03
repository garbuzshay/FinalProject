// import { useRegisterContext } from "../contexts/RegisterContext";
// import { Stepper, StepLabel, Step } from "@mui/material";
// import { NavigationButtons } from "../components/common/NavigationButtons";
// import logoSrc from "../assets/LogoMusuem.png";
// import Logo from "../components/intros/Logo";

// const RegistrationPage = () => {
//   const { currentStep, steps, goToNextPage, goToPreviousPage } = useRegisterContext();

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="mx-5">
//         <Logo src={logoSrc} className="h-8 " />
//       </div>

//       <div className="flex flex-col pt-4 items-center">
//         <Stepper
//           className="w-full md:max-w-2xl"
//           activeStep={currentStep}
//           orientation="horizontal"
//         >
//           {steps.map(( _, index) => (
//             <Step key={index}>
//               <StepLabel />
//             </Step>
//           ))}
//         </Stepper>

//         <div className=" p-2 text-center mb-20 w-full px-8 ">
//           <h2 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h2>
//           <div>{steps[currentStep].component}</div>
//         </div>
//       </div>

//       <div className="pb-12 fixed bottom-0 left-0 right-0 "> {/* Added background color */}
//         <NavigationButtons
//           currentPage={currentStep}
//           goToNextPage={goToNextPage}
//           goToPreviousPage={goToPreviousPage}
//           nextButtonText={currentStep === steps.length - 1 ? "Confirm & Pay" : "Next"}
//           isPrevPageExist={true}
//         />
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;

import { useRegisterContext } from "../contexts/RegisterContext";
import { Stepper, StepLabel, Step } from "@mui/material";
import { NavigationButtons } from "../components/common/NavigationButtons";
import logoSrc from "../assets/LogoMusuem.png";
import Logo from "../components/intros/Logo";

const RegistrationPage = () => {
  const { currentStep, steps, goToNextPage, goToPreviousPage } = useRegisterContext();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed logo in top left corner */}
      <div className="absolute top-0 left-0 px-4">
        <Logo src={logoSrc} />
      </div>

      {/* Flexbox container for the stepper */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full mt-16">
        {/* Stepper stays centered on larger screens, and moves below logo on mobile */}
        <div className="w-full flex justify-center md:justify-center mt-4 md:mt-0 md:ml-auto">
          <Stepper
            className="w-full md:max-w-2xl mx-auto mt-4 md:mt-0" // Added mt-4 for small screens to give space between the logo and stepper
            activeStep={currentStep}
            orientation="horizontal"
            
          >
            {steps.map((_, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col pt-4 items-center">
        <div className="p-2 text-center mb-20 w-full px-8">
          <h2 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h2>
          <div>{steps[currentStep].component}</div>
        </div>
      </div>

      {/* Navigation buttons at the bottom */}
      <div className="pb-12 fixed bottom-0 left-0 right-0">
        <NavigationButtons
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
