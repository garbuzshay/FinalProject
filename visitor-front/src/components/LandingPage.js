
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMuseum } from '../contexts/MuseumContext';
// import LoadingSpinner from './LoadingSpinner';

// const LandingPage = () => {
//   const { museumData, loading } = useMuseum();
//   const navigate = useNavigate();

//   if (loading || !museumData) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center overflow-hidden"
//       style={{
//         backgroundImage: `url(${museumData.imageUrl})`,
//       }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content with fade-in animation */}
//       <div className="absolute bottom-4 left-8 text-white z-10 opacity-0 animate-fadeIn">
//         <h1 className="text-4xl font-extrabold mb-4">
//           Welcome to {museumData.name}
//         </h1>
//         <p className="text-lg mb-8 mr-4 leading-relaxed">
//           Enjoy an immersive and engaging experience as you explore the museum!
//         </p>
//         <button
//           onClick={() => navigate(`/${museumData.name}/exhibitions`)}
//           className="bg-black bg-opacity-70 text-white text-lg px-12 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-opacity duration-300"
//           style={{ minWidth: '200px' }}
//         >
//           Show Exhibitions
//         </button>
//       </div>

//       {/* Adding custom animations */}
//       <style>
//         {`
//           /* Fade-in effect for text */
//           @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }

//           /* Zoom effect with fixed scaling */
//           @keyframes zoomIn {
//             from { transform: scale(1.25); } /* Slightly larger start */
//             to { transform: scale(1); }
//           }

//           .animate-fadeIn {
//             animation: fadeIn 5.5s ease-out forwards;
//           }

//           .animate-zoom {
//             animation: zoomIn 3s ease-out forwards;
//           }

//           /* Apply overflow-hidden to body to prevent scroll */
//           body {
//             overflow: hidden;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default LandingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMuseum } from '../contexts/MuseumContext';
import LoadingSpinner from './LoadingSpinner';

const LandingPage = () => {
  const { museumData, loading } = useMuseum();
  const navigate = useNavigate();

  if (loading || !museumData) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${museumData.imageUrl})`,
      }}
    >
      {/* Dark overlay with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Content with improved responsive layout and spacing */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16 text-white z-10 opacity-0 animate-fadeIn">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Welcome to {museumData.name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
            Enjoy an immersive and engaging experience as you explore the museum!
          </p>
          <button
            onClick={() => navigate(`/${museumData.name}/exhibitions`)}
            className="bg-white text-black text-base sm:text-lg px-8 sm:px-12 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            style={{ minWidth: '200px' }}
          >
            Show Exhibitions
          </button>
        </div>
      </div>

      {/* Refined animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes zoomIn {
            from { transform: scale(1.1); }
            to { transform: scale(1); }
          }

          .animate-fadeIn {
            animation: fadeIn 1.5s ease-out forwards;
          }

          .animate-zoom {
            animation: zoomIn 10s ease-out forwards;
          }

          body {
            overflow: hidden;
          }

          /* Smooth transition for button hover */
          button {
            transition: all 0.3s ease;
          }

          /* Responsive font size adjustments */
          @media (max-width: 640px) {
            h1 { font-size: 2.5rem; }
            p { font-size: 1rem; }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;