// import React, { useState } from "react";
// import {
//   auth,
//   sendPasswordResetEmail,
// } from "../../configuration/firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import FormConfirmButton from "./FormConfirmButton";
// import LogoMuseum from "../../assets/LogoMusuem.png"; // Import the logo

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleResetPassword = async () => {
//     setMessage("");
//     setError("");

//     try {
//       await sendPasswordResetEmail(auth, email, {
//         url: "http://localhost:3000/login",
//       });
//       setMessage("Password reset email sent. Please check your inbox.");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
//       {/* Background Circles */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

//       <form className="relative bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-sm">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={LogoMuseum}
//             alt="Museum Logo"
//             className="w-36 h-36 object-contain rounded-full shadow-lg"
//           />
//         </div>

//         <h2 className="text-3xl font-semibold text-white text-center mb-5">
//           Reset Password
//         </h2>

//         {/* Email Input */}
//         <div className="mb-6">
//           <label className="block text-white text-opacity-80" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="w-full px-4 py-3 bg-white bg-opacity-50 text-white text-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Message/Error */}
//         {message && (
//           <p className="text-green-500 text-center mb-4">{message}</p>
//         )}
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* Submit Button */}
//         <FormConfirmButton
//           buttonText="Send Reset Email"
//           dialogMessage="Are you sure you want to send the reset email?"
//           onSubmit={handleResetPassword}
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-200 mt-4"
//         />

//         {/* Cancel Button */}
//         <button
//           type="button"
//           className="w-full py-3 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-200 mt-4"
//           onClick={() => navigate("/login")}
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import {
  auth,
  sendPasswordResetEmail,
} from "../../configuration/firebaseConfig";
import { useNavigate } from "react-router-dom";
import FormConfirmButton from "./FormConfirmButton";
import SymbolMuseum from "../../assets/MusuemSymbol.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/login",
      });
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#cfd7f7] via-white to-[#dfe4f9]">
      <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
        <form
          className="relative bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Logo */}
          <div className="flex justify-center mb-3">
            <img
              src={SymbolMuseum}
              alt="Museum Symbol"
              className="w-36 h-36 object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-[#343341] text-center mb-5 font-poppins">
            Reset Password
          </h1>

          {/* Email Input with Icon */}
          <div className="mb-6 relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3a4c98] text-opacity-80"
            />
            <input
              className="w-full pl-12 py-3 bg-white bg-opac5ty-10 text-gray-600 text-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              type="email"
              id="email"
              placeholder="Please enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Error/Success Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && (
            <p className="text-green-500 text-center mb-4">{message}</p>
          )}

          {/* Submit Button */}
          <FormConfirmButton
          buttonText="Send Reset Email"
          dialogMessage="Are you sure you want to send the reset email?"
          onSubmit={handleResetPassword}
          className="w-full py-3 font-poppins bg-[#3a4c98] text-white font-semibold rounded-full hover:bg-[#2f3a73] transition duration-200 mt-4"
        />
          {/* Cancel Button */}
          <button
            type="button"
            className="w-full py-3 font-poppins bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-200 mt-4"
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default ResetPassword;
