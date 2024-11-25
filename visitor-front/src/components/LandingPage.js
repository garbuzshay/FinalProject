
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
      className="relative min-h-screen bg-cover bg-center flex items-end justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${museumData.imageUrl})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content with responsive design */}
      <div className="relative z-10 text-left text-white px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-4xl mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
          Welcome to {museumData.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl leading-relaxed animate-fadeIn">
          Enjoy an immersive and engaging experience as you explore the museum!
        </p>
        <button
          onClick={() => navigate(`/${museumData.name}/exhibitions`)}
          className="bg-black bg-opacity-70 text-white  text-2xl px-3 sm:px-12 py-2 sm:py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 animate-fadeIn"
        >
          Show Exhibitions
        </button>
      </div>

      {/* Adding custom animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 1.5s ease-out forwards;
            opacity: 0;
          }

          /* Responsive background image */
          @media (max-width: 640px) {
            .bg-cover {
              background-position: center;
              background-size: cover;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;