// validation.js
export const validateRegistration = (userData) => {
    const requiredFields = ["name", "lastName", "email", "password", "confirmPassword", "phoneNumber", "terms"];
    for (const field of requiredFields) {
      if (!userData[field]) {
        alert(`Please fill the ${field} field.`);
        return false;
      }
    }
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };
  
  export const validateMuseumRegistration = (museumData) => {
    const requiredFields = ["name", "address", "city", "state", "zipCode", "phoneNumber", "email"];
    for (const field of requiredFields) {
      if (!museumData[field]) {
        alert(`Please fill the ${field} field.`);
        return false;
      }
    }
    return true;
  };
  
  export const validateChoosePlan = (userData) => {
    if (!userData.plan) {
      alert("Please choose a plan.");
      return false;
    }
    return true;
  };
  