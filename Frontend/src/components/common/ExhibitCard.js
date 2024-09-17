

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import FormConfirmButton from "../common/FormConfirmButton";
// import { useUserContext } from "../../contexts/UserContext";
// import { usePlanContext } from "../../contexts/MuseumContext";


// // AdminExhibitCard component
// const AdminExhibitCard = ({
//   id,
//   name,
//   description,
//   imageUrl,
//   location,
//   artworks,
//   curators,
//   status,
// }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     if (status === "open") {
//       navigate(`${id}`);
//     }
//   };

//   return (
//     <div
//       className={`max-w-sm w-full rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ${
//         status === "open" ? "cursor-pointer hover:scale-105" : "cursor-default"
//       }`}
//       onClick={status === "open" ? handleCardClick : undefined}
//     >
//       <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
//         <img
//           className="w-full h-full object-center"
//           src={imageUrl}
//           alt={`${name}`}
//         />
//       </div>
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{name}</div>
//         <p className="text-gray-700 text-base mb-2">{description}</p>
//         <div className="flex mb-2">
//           <span className="font-semibold text-gray-700">Artworks:</span>
//           <span className="text-gray-700 ml-1">{artworks}</span>
//         </div>
//         <div className="flex mb-2">
//           <span className="font-semibold text-gray-700">Curators:</span>
//           <span className="text-gray-700 ml-1 truncate">{curators}</span>
//         </div>
//         <div className="flex mb-2">
//           <span className="font-semibold text-gray-700">Status:</span>
//           <span className="text-gray-700 ml-1 capitalize">{status}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // EmployeeExhibitCard component for MuseumOwner and Curator
// const EmployeeExhibitCard = ({
//   id,
//   name,
//   description,
//   imageUrl,
//   location,
//   artworks,
//   curators,
//   status,
//   openExhibition,
// }) => {
//   const navigate = useNavigate();
//   const { exhibitionsLeft } = usePlanContext();
//   const { user } = useUserContext();
//   const handleCardClick = () => {
//     if (status === "open") {
//       navigate(`${id}`);
//     }
//   };

//   const handleOpenExhibition = () => {
//     if (exhibitionsLeft > 0) {
//       openExhibition(id);
//     } else {
//       alert("The museum cannot be opened because there is not enough space.");
//     }
//   };

//   return (
//     <div
//       className={`max-w-sm w-full rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ${
//         status === "open" ? "cursor-pointer hover:scale-105" : "cursor-default"
//       }`}
//       onClick={status === "open" ? handleCardClick : undefined}
//     >
//       <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
//         <img
//           className="w-full h-full object-center"
//           src={imageUrl}
//           alt={`${name}`}
//         />
//       </div>
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{name}</div>
//         <p className="text-gray-700 text-base mb-2">{description}</p>

//         {location && (
//           <div className="flex mb-2">
//             <span className="font-semibold text-gray-700">Museum:</span>
//             <span className="text-gray-700 ml-1">{location}</span>
//           </div>
//         )}

//         <div className="flex mb-2">
//           <span className="font-semibold text-gray-700">Artworks:</span>
//           <span className="text-gray-700 ml-1">{artworks}</span>
//         </div>

//         <div className="flex mb-2">
//           <span className="font-semibold text-gray-700">Curators:</span>
//           <span className="text-gray-700 ml-1 truncate">{curators}</span>
//         </div>

//         {status === "closed"&& user?.role?.roleName === "MuseumOwner" && (
//           <div className="mt-3 text-gray-500 flex justify-end">
//             <FormConfirmButton
//               onSubmit={handleOpenExhibition}
//               buttonText="Re-open?"
//               dialogMessage="Are you sure you want to re-open this exhibition?"
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
//             />
//           </div>
//         )}

//         {status === "closed" && (
//           <div className="flex mb-2">
//             <span className="font-semibold text-gray-900 text-xl">Status:</span>
//             <span className="text-red-600 font-bold text-lg ml-1 capitalize">
//               {status}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main ExhibitCard component that conditionally renders either AdminExhibitCard or EmployeeExhibitCard
// const ExhibitCard = (props) => {
//   const { user } = useUserContext();

//   if (user?.role?.roleName === "Admin") {
//     return <AdminExhibitCard {...props} />;
//   } else {
//     return <EmployeeExhibitCard {...props} />;
//   }
// };

// export default ExhibitCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import FormConfirmButton from "./FormConfirmButton";
import { useUserContext } from "../../contexts/UserContext";
import { usePlanContext } from "../../contexts/MuseumContext";
import { useThemeMode } from "../../contexts/DarkModeContext";

// AdminExhibitCard component
const AdminExhibitCard = ({
  id,
  name,
  description,
  imageUrl,
  location,
  artworks,
  curators,
  status,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeMode();

  const handleCardClick = () => {
    if (status === "open") {
      navigate(`${id}`);
    }
  };

  return (
    <div
      className={`max-w-sm w-full rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ${
        status === "open" ? "cursor-pointer hover:scale-105" : "cursor-default"
      } ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}
      onClick={status === "open" ? handleCardClick : undefined}
    >
      <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          className="w-full h-full object-center"
          src={imageUrl}
          alt={`${name}`}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className={`text-base mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{description}</p>
        <div className="flex mb-2">
          <span className="font-semibold">Artworks:</span>
          <span className={`ml-1 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{artworks}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-semibold">Curators:</span>
          <span className={`ml-1 truncate ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{curators}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-semibold">Status:</span>
          <span className={`ml-1 capitalize ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{status}</span>
        </div>
      </div>
    </div>
  );
};

// EmployeeExhibitCard component for MuseumOwner and Curator
const EmployeeExhibitCard = ({
  id,
  name,
  description,
  imageUrl,
  location,
  artworks,
  curators,
  status,
  openExhibition,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeMode();
  const { exhibitionsLeft } = usePlanContext();
  const { user } = useUserContext();

  const handleCardClick = () => {
    if (status === "open") {
      navigate(`${id}`);
    }
  };

  const handleOpenExhibition = () => {
    if (exhibitionsLeft > 0) {
      openExhibition(id);
    } else {
      alert("The museum cannot be opened because there is not enough space.");
    }
  };

  return (
    <div
      className={`max-w-sm w-full rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ${
        status === "open" ? "cursor-pointer hover:scale-105" : "cursor-default"
      } ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}
      onClick={status === "open" ? handleCardClick : undefined}
    >
      <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          className="w-full h-full object-center"
          src={imageUrl}
          alt={`${name}`}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className={`text-base mb-2 ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>{description}</p>

        {location && (
          <div className="flex mb-2">
            <span className="font-semibold">Museum:</span>
            <span className={`ml-1 ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>{location}</span>
          </div>
        )}

        <div className="flex mb-2">
          <span className="font-semibold">Artworks:</span>
          <span className={`ml-1 ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>{artworks}</span>
        </div>

        <div className="flex mb-2">
          <span className="font-semibold">Curators:</span>
          <span className={`ml-1 truncate ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>{curators}</span>
        </div>

        {status === "closed" && user?.role?.roleName === "MuseumOwner" && (
          <div className="mt-3 text-gray-500 flex justify-end">
            <FormConfirmButton
              onSubmit={handleOpenExhibition}
              buttonText="Re-open?"
              dialogMessage="Are you sure you want to re-open this exhibition?"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            />
          </div>
        )}

        {status === "closed" && (
          <div className="flex mb-2">
            <span className="font-semibold text-xl">Status:</span>
            <span className={`ml-1 capitalize ${isDarkMode ? "text-red-500" : "text-red-600"}`}>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main ExhibitCard component that conditionally renders either AdminExhibitCard or EmployeeExhibitCard
const ExhibitCard = (props) => {
  const { user } = useUserContext();

  if (user?.role?.roleName === "Admin") {
    return <AdminExhibitCard {...props} />;
  } else {
    return <EmployeeExhibitCard {...props} />;
  }
};

export default ExhibitCard;
