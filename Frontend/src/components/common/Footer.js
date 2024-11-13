// // src/components/common/Footer.js

// import React from 'react';
// import { useThemeMode } from '../../contexts/DarkModeContext'; // Adjust the path as necessary

// const Footer = () => {
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode from context

//   return (
//     <footer
//       className={`py-4 z-60 ${
//         isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
//       } transition-colors duration-300`}
//     >
//       <div className="container mx-auto text-center">
//         <p className="text-sm">
//           mensch-edutainment &copy; 2024 All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// src/components/common/Footer.js

import React from 'react';
import { useThemeMode } from '../../contexts/DarkModeContext'; // Adjust the path as necessary

const Footer = () => {
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode from context

  return (
    <footer
      className={`py-2  ${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
      } transition-colors duration-300`}
    >
      <div className="container mx-auto text-center">
        <p className=" text-[10px]">
          mensch-edutainment &copy; 2024 All rights reserved. <br />
          Made by{' '}
          <a
            href="https://portfolio-garbuz.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-blue-500 font-semibold"
          >
            Shay Garbuz
          </a>{' '}
          &{' '}
          <a
            href="https://www.linkedin.com/in/may-caspi-332236254?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B228GcC8zRVWvPQaToosq4w%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-blue-500 font-semibold "
          >
            May Caspi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
