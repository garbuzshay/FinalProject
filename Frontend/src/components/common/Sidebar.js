// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ links }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {isOpen ? (
//         <div
//           className={`bg-gray-800 text-white p-5 transition-width
//           ${isOpen ? 'w-64 md:w-64 sm:w-48 sm:p-3' : 'w-0'}
//           ${isOpen ? 'fixed md:relative' : 'fixed'}
//          h-screen z-50 transform md:translate-x-0
//           ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//           sm:max-w-full`} // Ensure it doesn't extend beyond screen width
//         >
//           <button
//             onClick={toggleSidebar}
//             className="text-white absolute top-4 left-4"
//           >
//             ✕
//           </button>
//           {links && links.length > 0 && (
//             <>
//               <h2 className="text-2xl font-semibold mb-5 sm:text-xl">
//                 <Link to={links[0].path}>{links[0].name}</Link>
//               </h2>
//               <nav>
//                 <ul>
//                   {links.slice(1).map((link, index) => (
//                     <li key={index} className="mb-4">
//                       <Link to={link.path}>{link.name}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </>
//           )}
//         </div>
//       ) : (
//         <button
//           onClick={toggleSidebar}
//           className="absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-r-md shadow-lg hover:bg-gray-700"
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

const Sidebar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div
          className={`bg-gray-900 text-white p-6 shadow-xl transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 md:w-64 sm:w-48" : "w-0"} 
          ${isOpen ? "fixed md:relative" : "fixed"} 
         h-screen z-50 transform md:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          sm:max-w-full rounded-r-lg`}
        >
          {/* Close Button */}
          {/* <button
            onClick={toggleSidebar}
            className="text-white absolute top-4 left-4 hover:text-red-500 transition-colors duration-300"
          >
            ✕
          </button> */}
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
                  <li className="sm:block lg:hidden mt-8">
                    <button
                      onClick={toggleSidebar}
                      className="block w-full text-lg font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Close Sidebar
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-r-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
          style={{ left: 0 }}
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;
