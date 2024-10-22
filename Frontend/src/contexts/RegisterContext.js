import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Registration from "../components/registration/Registration";
import ChoosePlan from "../components/registration/ChoosePlan";
import PaymentStep from "../components/registration/Payment";
import UserDataDisplay from "../components/registration/UserDataDisplay";
import MuseumRegistration from "../components/registration/MuseumRegistration";
import {
  validateRegistration,
  validateMuseumRegistration,
  validateChoosePlan,
} from "../validators/registrationValidators";
import requestsApi from "../api/RequestsApi";
// import { loginWithEmailPassword } from "../utils/auth";
import { useUserContext } from "./UserContext"; // Import useUserContext

export const RegisterContext = React.createContext();

export const RegisterProvider = ({ children }) => {
  const [currentStep, setStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userData: {},
    museumData: {},
  });

  const { login } = useUserContext(); 

  const steps = [
    {
      component: <Registration />,
      title:"Museum Owner Sign Up ",
      isValid: (data) => validateRegistration(data.userData),
    },
    {
      component: <MuseumRegistration />,
      title:"Museum Registration ",
      isValid: (data) => validateMuseumRegistration(data.museumData),
    },
    {
      component: <ChoosePlan />,
      title:"Choose your plan ",
      isValid: (data) => validateChoosePlan(data.userData),
    },
    {
      component: <PaymentStep />,
      title:"Payment ",
      isValid: () => true,
    },
    {
      component: <UserDataDisplay />,
      isValid: (data) => true,
    },
  ];

  const goToNextPage = () => {
    if (currentStep < steps.length - 1) {
      if (steps[currentStep].isValid(formData)) {
        setStep(currentStep + 1);
      }
    } else {
      submitData();
    }
  };

  const goToPreviousPage = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const submitData = async () => {
    try {

      await requestsApi.createRequest({...formData, type: "Museum-Opening"});
      await login(formData.userData.email, formData.userData.password);  
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    // setFormData({ userData: {}, museumData: {} });
    // setStep(0);
  };

  return (
    <div>
      <RegisterContext.Provider
        value={{
          currentStep,
          setStep,
          formData,
          setFormData,
          submitData,
          steps,
          goToNextPage,
          goToPreviousPage,
        }}
      >
        {children}
      </RegisterContext.Provider>
    </div>
  );
};

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegisterContext must be used within a RegisterProvider");
  }
  return context;
};
