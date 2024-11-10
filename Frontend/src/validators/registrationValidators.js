// // validation.js
// export const validateRegistration = (userData) => {
//     // const requiredFields = ["name", "lastName", "email", "password", "confirmPassword", "phoneNumber", "terms"];
//     const requiredFields = ["name", "lastName", "email", "password", "confirmPassword", "phoneNumber"];
//     for (const field of requiredFields) {
//       if (!userData[field]) {
//         alert(`Please fill the ${field} field.`);
//         return false;
//       }
//     }
//     if (userData.password !== userData.confirmPassword) {
//       alert("Passwords do not match.");
//       return false;
//     }
//     return true;
//   };
  
//   export const validateMuseumRegistration = (museumData) => {
//     const requiredFields = ["name", "address", "city", "state", "zipCode", "phoneNumber", "email"];
//     for (const field of requiredFields) {
//       if (!museumData[field]) {
//         alert(`Please fill the ${field} field.`);
//         return false;
//       }
//     }
//     return true;
//   };
  
//   export const validateChoosePlan = (userData) => {
//     if (!userData.plan) {
//       alert("Please choose a plan.");
//       return false;
//     }
//     return true;
//   };
  
//   export const validatePayment = (userData) => {
//     const requiredFields = ["cardNumber", "expiryDate", "cvv", "email", "terms"];
//     for (const field of requiredFields) {
//       if (!userData[field]) {
//         alert(`Please fill the ${field} field.`);
//         return false;
//       }
//     }
//     if (!userData.terms) {
//       alert("You must agree to the terms and conditions.");
//       return false;
//     }
//     return true;
//   };

export const validateRegistration = (userData) => {
  const requiredFields = ["name", "lastName", "email", "password", "confirmPassword", "phoneNumber"];
  
  // Check for required fields
  for (const field of requiredFields) {
    if (!userData[field]) {
      alert(`Please fill the ${field} field.`);
      return false;
    }
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    alert("The email address is improperly formatted.");
    return false;
  }
  
  // Password validation (minimum 6 characters)
  if (userData.password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  // Confirm password match
  if (userData.password !== userData.confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Phone number validation (must contain only numbers)
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(userData.phoneNumber)) {
    alert("Phone number must contain only numbers.");
    return false;
  }

  return true;
};

export const validateMuseumRegistration = (museumData) => {
  const requiredFields = ["name", "address", "city", "state", "zipCode", "phoneNumber", "email"];

  // Check for required fields
  for (const field of requiredFields) {
    if (!museumData[field]) {
      alert(`Please fill the ${field} field.`);
      return false;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(museumData.email)) {
    alert("The email address is improperly formatted.");
    return false;
  }

  // Phone number validation
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(museumData.phoneNumber)) {
    alert("Phone number must contain only numbers.");
    return false;
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

export const validatePayment = (userData) => {
  const requiredFields = ["cardNumber", "expiryDate", "cvv", "email", "terms"];

  // Check for required fields
  for (const field of requiredFields) {
    if (!userData[field]) {
      alert(`Please fill the ${field} field.`);
      return false;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    alert("The email address is improperly formatted.");
    return false;
  }

  // Terms acceptance
  if (!userData.terms) {
    alert("You must agree to the terms and conditions.");
    return false;
  }

  return true;
};
