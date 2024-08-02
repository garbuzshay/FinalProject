// Sidebar.js
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
        <div className=" bg-gray-800 text-white w-64 p-5 md:w-64 sm:w-48 sm:p-3 transition-width duration-700 ">
          <button onClick={toggleSidebar} className="text-white absolute top-4 left-4">
            ✕
          </button>
          <h2 className="text-2xl font-semibold mb-5 sm:text-xl">
            <Link to={links[0].path}>{links[0].name}</Link>
          </h2>
          <nav>
            <ul>
              {links.slice(1).map((link, index) => (
                <li key={index} className="mb-4">
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="fixed top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-r-md shadow-lg hover:bg-gray-700"
          style={{ left: 0 }}
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ links }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div
//         className={` top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-200 ease-in-out ${
//           isOpen ? 'translate-x-0 w-64 p-5 md:w-64 sm:w-48 sm:p-3 ' : '-translate-x-full '
//         }`}
//       >
//         {isOpen && (
//           <>
//             <button onClick={toggleSidebar} className="text-white absolute top-4 left-4">
//               ✕
//             </button>
//             <h2 className="text-2xl font-semibold mb-5 sm:text-xl">
//               <Link to={links[0].path}>{links[0].name}</Link>
//             </h2>
//             <nav>
//               <ul>
//                 {links.slice(1).map((link, index) => (
//                   <li key={index} className="mb-4">
//                     <Link to={link.path}>{link.name}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </>
//         )}
//       </div>
//       {!isOpen && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-r-md shadow-lg  hover:bg-gray-700"
//           style={{ left: 0 }}
//         >
//           ☰
//         </button>
//       )}
//     </>
//   );
// };

// export default Sidebar;
