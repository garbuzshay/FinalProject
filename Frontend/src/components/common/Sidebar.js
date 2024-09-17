// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// const Sidebar = ({ links }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [touchStartX, setTouchStartX] = useState(0); // Track where the touch started
//   const [dragDistance, setDragDistance] = useState(0); // Track how far the user has dragged
//   const { isDarkMode, toggleDarkMode } = useThemeMode(); // Get dark mode state

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//     setDragDistance(0); // Reset drag distance when toggling
//   };

//   // Touch event handlers for dragging to close
//   const handleTouchStart = (e) => {
//     setTouchStartX(e.touches[0].clientX); // Record the starting X position
//   };

//   const handleTouchMove = (e) => {
//     const touchCurrentX = e.touches[0].clientX;
//     const dragDelta = touchCurrentX - touchStartX; // Calculate how far the user has dragged

//     // Only update the drag distance if dragging left
//     if (dragDelta < 0) {
//       setDragDistance(dragDelta);
//     }
//   };

//   const handleTouchEnd = () => {
//     // Close the sidebar if the drag distance exceeds -100px (i.e., dragged far enough to the left)
//     if (dragDistance < -100) {
//       setIsOpen(false);
//     }

//     // Reset drag distance
//     setDragDistance(0);
//   };

//   return (
//     <>
//       {isOpen ? (
//         <div
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           className={`bg-gray-900 text-white p-6 shadow-xl transition-all duration-300 ease-in-out
//           ${isOpen ? "w-64 md:w-64 sm:w-48" : "w-0"} 
//           ${isOpen ? "fixed md:relative" : "fixed"} 
//          h-screen z-50 transform md:translate-x-0 
//           ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//           sm:max-w-full rounded-r-lg`}
//           style={{
//             transform: `translateX(${dragDistance}px)`, // Apply the drag distance to the transform
//             transition: dragDistance ? 'none' : 'transform 0.3s ease', // Disable transition while dragging, enable it after release
//           }}
//         >
//           <button
//             onClick={toggleSidebar}
//             className="text-white absolute top-4 left-4 hover:text-red-500 transition-colors duration-300 hidden sm:block"
//           >
//             ✕
//           </button>

//           {/* Sidebar Links */}
//           {links && links.length > 0 && (
//             <>
//               <h2 className="text-2xl font-semibold mb-8 sm:text-xl border-b border-gray-700 pb-4">
//                 <Link to={links[0].path}>{links[0].name}</Link>
//               </h2>
//               <nav>
//                 <ul className="space-y-6">
//                   {links.slice(1).map((link, index) => (
//                     <li key={index}>
//                       <Link
//                         to={link.path}
//                         className="block text-lg font-medium hover:bg-gray-700 hover:text-gray-200 px-4 py-2 rounded-lg transition-colors duration-300"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                   {/* Close Sidebar Link for mobile */}
//                   <li className="sm:block lg:hidden mt-8">
//                     <button
//                       onClick={toggleSidebar}
//                       className="block w-full text-lg font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
//                     >
//                       Close Sidebar
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </>
//           )}
//         </div>
//       ) : (
//         <button
//           onClick={toggleSidebar}
//           className="absolute z-50 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-r-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
//           style={{ left: 0 }}
//         >
//           ☰
//         </button>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Dark Mode context

const Sidebar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0); // Track where the touch started
  const [dragDistance, setDragDistance] = useState(0); // Track how far the user has dragged
  // const { isDarkMode, toggleDarkMode } = useThemeMode(); // Get dark mode state
  const { isDarkMode } = useThemeMode(); // Get dark mode state
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setDragDistance(0); // Reset drag distance when toggling
  };

  // Touch event handlers for dragging to close
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX); // Record the starting X position
  };

  const handleTouchMove = (e) => {
    const touchCurrentX = e.touches[0].clientX;
    const dragDelta = touchCurrentX - touchStartX; // Calculate how far the user has dragged

    // Only update the drag distance if dragging left
    if (dragDelta < 0) {
      setDragDistance(dragDelta);
    }
  };

  const handleTouchEnd = () => {
    // Close the sidebar if the drag distance exceeds -100px (i.e., dragged far enough to the left)
    if (dragDistance < -100) {
      setIsOpen(false);
    }

    // Reset drag distance
    setDragDistance(0);
  };

  return (
    <>
      {isOpen ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`p-6 shadow-xl transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 md:w-64 sm:w-48" : "w-0"} 
          ${isOpen ? "fixed md:relative" : "fixed"} 
          h-screen z-50 transform md:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          sm:max-w-full rounded-r-lg
          ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`} // Apply dark mode styles
          style={{
            transform: `translateX(${dragDistance}px)`, // Apply the drag distance to the transform
            transition: dragDistance ? 'none' : 'transform 0.3s ease', // Disable transition while dragging, enable it after release
          }}
        >
          <button
            onClick={toggleSidebar}
            className="text-white absolute top-4 left-4 hover:text-red-500 transition-colors duration-300 hidden sm:block"
          >
            ✕
          </button>

          {/* Sidebar Links */}
          {links && links.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-8 sm:text-xl border-b border-gray-700 pb-4">
                <Link to={links[0].path}>{links[0].name}</Link>
              </h2>
              <nav>
                <ul className="space-y-6">
                  {links.slice(1).map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="block text-lg font-medium hover:bg-gray-700 hover:text-gray-200 px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {/* Close Sidebar Link for mobile */}
                  {/* <li className="sm:block lg:hidden mt-8">
                    <button
                      onClick={toggleSidebar}
                      className="block w-full text-lg font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Close Sidebar
                    </button>
                  </li> */}
                </ul>
              </nav>
    
            </>
          )}
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="absolute z-50 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-r-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
          style={{ left: 0 }}
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;
