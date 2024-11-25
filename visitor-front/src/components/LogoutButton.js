// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useVisitor } from '../contexts/VisitorContext';

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   const {logout} = useVisitor();

//   const handleLogout = () => {
//     // Perform any logout logic here (e.g., clearing tokens, user data)
//     logout();
//     navigate('/');
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
//     >
//       Leave Museum
//     </button>
//   );
// };

// export default LogoutButton;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useVisitor } from '../contexts/VisitorContext';
// import MuseumFeedbackForm from './MuseumFeedbackForm';

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   const { logout } = useVisitor();
//   const [showDialog, setShowDialog] = useState(false);
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogoutClick = () => {
//     setShowDialog(true); // Show dialog to ask for feedback
//   };

//   const handleFeedbackSubmit = () => {
//     setShowDialog(false);
//     setShowFeedbackForm(false);
//     setLoading(true); // Start loading spinner
//     setTimeout(() => {
//       logout();
//       navigate('/');
//     }, 2000); // Simulate a delay for the spinner, adjust if needed
//   };

//   const handleFeedbackNo = () => {
//     setShowDialog(false);
//     setLoading(true);
//     setTimeout(() => {
//       logout();
//       navigate('/');
//     }, 2000);
//   };

//   const handleCancelLogout = () => {
//     setShowDialog(false);
//     setShowFeedbackForm(false);
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
//                     No
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


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVisitor } from '../contexts/VisitorContext';
import MuseumFeedbackForm from './MuseumFeedbackForm';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { museumName } = useParams();
  const { logout } = useVisitor();
  const [showDialog, setShowDialog] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if feedback has been submitted in this session
  const feedbackSubmitted =   localStorage.getItem(`submittedFeedback-${museumName}`) === 'true'

  const handleLogoutClick = () => {
    if (!feedbackSubmitted) {
      setShowDialog(true); // Show dialog to ask for feedback
    } else {
      handleDirectLogout();
    }
  };

  const handleFeedbackSubmit = () => {
    setShowDialog(false);
    setShowFeedbackForm(false);
    setLoading(true); // Start loading spinner

    // Set the session storage flag to indicate feedback has been submitted
    localStorage.setItem('feedbackSubmitted', 'true');

    setTimeout(() => {
      logout();
      navigate('/');
    }, 2000); // Simulate a delay for the spinner, adjust if needed
  };

  const handleFeedbackNo = () => {
    setShowDialog(false);
    setLoading(true);

    // Set the session storage flag to skip feedback prompt next time
    localStorage.setItem('feedbackSubmitted', 'true');

    setTimeout(() => {
      logout();
      navigate('/');
    }, 2000);
  };

  const handleCancelLogout = () => {
    setShowDialog(false);
    setShowFeedbackForm(false);
  };

  const handleDirectLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate('/');
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
              <>
                <p className="text-lg font-semibold mb-6">
                  Would you like to leave feedback about your visit before logging out?
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
              </>
            ) : (
              <MuseumFeedbackForm onSubmit={handleFeedbackSubmit} />
            )}
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
