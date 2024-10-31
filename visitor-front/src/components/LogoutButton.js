// // src/components/LogoutButton.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform any logout logic here (e.g., clearing tokens, user data)
//     navigate('/');
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
//     >
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMuseum } from '../contexts/MuseumContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { initializeMuseumData } = useMuseum(); // Access context to reset data on logout

  const handleLogout = () => {
    // Clear localStorage and reset museum context data
    localStorage.removeItem('museumData'); // Clear museum data from localStorage
    localStorage.removeItem('museumToken');
    initializeMuseumData({ museum: null, exhibitions: [], artworks: [] }); // Reset context state

    // Redirect user to the homepage after logout
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
