
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

//       <div className="flex flex-col items-center ">
//         <Stepper
//           className="w-full md:max-w-xl"
//           activeStep={currentStep}
//           orientation="horizontal"
//         >
//           {steps.map((step, index) => (
//             <Step key={index}>
//               <StepLabel />
//             </Step>
//           ))}
//         </Stepper>

//         <div className="max-w-md p-2 text-center">
//           <h2 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h2>
//           <div>{steps[currentStep].component}</div>
//         </div>
//       </div>

//       <div className=" pb-6 fixed bottom-0 left-0 right-0">
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
      <div className="mx-5">
        <Logo src={logoSrc} className="h-8 " />
      </div>

      <div className="flex flex-col pt-4 items-center">
        <Stepper
          className="w-full md:max-w-2xl"
          activeStep={currentStep}
          orientation="horizontal"
        >
          {steps.map(( _, index) => (
            <Step key={index}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        <div className=" p-2 text-center mb-20 w-full px-8 ">
          <h2 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h2>
          <div>{steps[currentStep].component}</div>
        </div>
      </div>

      <div className="pb-12 fixed bottom-0 left-0 right-0 "> {/* Added background color */}
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
