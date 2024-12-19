// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useVisitor } from '../contexts/VisitorContext';
// import MuseumFeedbackForm from './MuseumFeedbackForm';

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   const { museumName } = useParams();
//   const { logout } = useVisitor();
//   const [showDialog, setShowDialog] = useState(false);
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Check if feedback has been submitted in this session
//   const feedbackSubmitted =   localStorage.getItem(`submittedFeedback-${museumName}`) === 'true'

//   const handleLogoutClick = () => {
//     if (!feedbackSubmitted) {
//       setShowDialog(true); // Show dialog to ask for feedback
//     } else {
//       handleDirectLogout();
//     }
//   };

//   const handleFeedbackSubmit = () => {
//     setShowDialog(false);
//     setShowFeedbackForm(false);
//     setLoading(true); // Start loading spinner

//     // Set the session storage flag to indicate feedback has been submitted
//     localStorage.setItem('feedbackSubmitted', 'true');

//     setTimeout(() => {
//       logout();
//       navigate('/');
//     }, 2000); // Simulate a delay for the spinner, adjust if needed
//   };

//   const handleFeedbackNo = () => {
//     setShowDialog(false);
//     setLoading(true);

//     // Set the session storage flag to skip feedback prompt next time
//     localStorage.setItem('feedbackSubmitted', 'true');

//     setTimeout(() => {
//       logout();
//       navigate('/');
//     }, 2000);
//   };

//   const handleCancelLogout = () => {
//     setShowDialog(false);
//     setShowFeedbackForm(false);
//   };

//   const handleDirectLogout = () => {
//     setLoading(true);
//     setTimeout(() => {
//       logout();
//       navigate('/');
//     }, 2000);
//   };

//   return (
//     <>
//       <button
//         onClick={handleLogoutClick}
//         className="p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
//       >
//         Leave Museum
//       </button>

//       {showDialog && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           onClick={handleCancelLogout}
//         >
//           <div
//             className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 md:max-w-md text-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={handleCancelLogout}
//               className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
//               aria-label="Close dialog"
//             >
//               <span className="text-2xl font-semibold">&times;</span>
//             </button>

//             {!showFeedbackForm ? (
//               <>
//                 <p className="text-lg font-semibold mb-6">
//                   Would you like to leave feedback about your visit before logging out?
//                 </p>
//                 <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
//                   <button
//                     onClick={() => setShowFeedbackForm(true)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={handleFeedbackNo}
//                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 w-full md:w-auto"
//                   >
//                     No, leave without giving a review.
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <MuseumFeedbackForm onSubmit={handleFeedbackSubmit} />
//             )}
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="flex flex-col items-center">
//             <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
//             <p className="text-white">Logging you out...</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LogoutButton;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVisitor } from "../contexts/VisitorContext";
import MuseumFeedbackForm from "./MuseumFeedbackForm";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { museumName } = useParams();
  const { logout } = useVisitor();
  const [showDialog, setShowDialog] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // New state for the confirmation dialog
  const [loading, setLoading] = useState(false);

  const feedbackSubmitted =
    localStorage.getItem(`submittedFeedback-${museumName}`) === "true";

  const handleLogoutClick = () => {
    if (!feedbackSubmitted) {
      setShowDialog(true); // Show dialog to ask for feedback
    } else {
      setShowConfirmationDialog(true); // Show confirmation dialog instead of direct logout
    }
  };

  const handleFeedbackSubmit = () => {
    setShowDialog(false);
    setShowFeedbackForm(false);
    setLoading(true);

    localStorage.setItem(`submittedFeedback-${museumName}`, "true");

    setTimeout(() => {
      logout();
      navigate("/");
    }, 2000);
  };

  const handleFeedbackNo = () => {
    setShowDialog(false);
    setLoading(true);

    // localStorage.setItem(`submittedFeedback-${museumName}`, 'true');

    setTimeout(() => {
      logout();
      navigate("/");
    }, 2000);
  };

  const handleCancelLogout = () => {
    setShowDialog(false);
    setShowFeedbackForm(false);
    setShowConfirmationDialog(false);
  };

  const handleConfirmLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleLogoutClick}
        className="p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Leave Museum
      </button>

      {showDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCancelLogout}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 md:max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCancelLogout}
              className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
              aria-label="Close dialog"
            >
              <span className="text-2xl font-semibold">&times;</span>
            </button>

            {!showFeedbackForm ? (
              <div>
                <p className="text-lg font-semibold mb-6">
                  Would you like to leave feedback about your visit before
                  logging out?
                </p>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                  <button
                    onClick={() => setShowFeedbackForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleFeedbackNo}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 w-full md:w-auto"
                  >
                    No, leave without giving a review.
                  </button>
                </div>
              </div>
            ) : (
              <MuseumFeedbackForm onSubmit={handleFeedbackSubmit} />
            )}
          </div>
        </div>
      )}

      {showConfirmationDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-50"
          onClick={handleCancelLogout}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Leaving the Museum?
            </h2>
            <div className="text-lg text-gray-600 mb-8 space-y-4">
              <p>Are you sure you want to log out?</p>
              <p>To log back in, you'll have two options:</p>
              <ol className="list-decimal list-inside text-left space-y-2">
                <li>
                  <span className="font-semibold">Scan QR Code:</span> Use your
                  device to scan the museum's QR code
                </li>
                <li>
                  <span className="font-semibold">Manual Entry:</span> Enter the
                  museum name and password
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleConfirmLogout}
                className="w-full sm:w-1/2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Yes, Log Out
              </button>
              <button
                onClick={handleCancelLogout}
                className="w-full sm:w-1/2 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-white">Logging you out...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
