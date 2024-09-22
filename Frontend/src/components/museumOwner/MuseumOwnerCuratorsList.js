
// import React, { useState } from 'react';
// import { useMuseumContext } from '../../contexts/MuseumContext';
// import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context
// import ConfirmationDialog from '../common/ConfirmationDialog';

// const MuseumOwnerCuratorsList = () => {
//   const { museum, loading, updateExhibition } = useMuseumContext();
//   const exhibitions = museum?.exhibitions;
//   const [showDialog, setShowDialog] = useState(false);
//   const [selectedCurator, setSelectedCurator] = useState(null);
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

//   if (loading) {
//     return (
//       <div
//         className={`flex justify-center items-center h-screen ${
//           isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
//         }`}
//       >
//         <h1 className="text-2xl font-semibold">Loading...</h1>
//       </div>
//     );
//   }

//   const curatorsMap = new Map();

//   exhibitions?.forEach((exhibition) => {
//     exhibition.curators.forEach((curator) => {
//       if (!curatorsMap.has(curator._id)) {
//         curatorsMap.set(curator._id, {
//           ...curator,
//           exhibitions: [],
//         });
//       }
//       curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
//     });
//   });

//   const curators = Array.from(curatorsMap.values());

//   const disableCurator = async (curatorId) => {
//     try {
//       // Filter exhibitions where the curator exists
//       const exhibitionsToUpdate = exhibitions.filter((exhibition) =>
//         exhibition.curators.some((c) => c._id === curatorId)
//       );

//       // Prepare a list of promises for updating exhibitions in parallel
//       const updatePromises = exhibitionsToUpdate.map(async (exhibition) => {
//         const updatedCurators = exhibition.curators
//           .filter((c) => c._id !== curatorId)
//           .map((c) => c._id); // Extract only the curator IDs

//         // Return the promise for updating the exhibition
//         return updateExhibition(exhibition._id, { curators: updatedCurators });
//       });

//       // Execute all update promises in parallel
//       await Promise.all(updatePromises);

//       console.log('Curator disabled in all exhibitions.');
//     } catch (error) {
//       console.error('Error disabling curator:', error);
//     }

//     setShowDialog(false); // Hide the dialog after disabling the curator
//   };

//   // Function to handle opening the confirmation dialog
//   const handleDisableClick = (curator) => {
//     setSelectedCurator(curator); // Set the selected curator for disabling
//     setShowDialog(true); // Show the confirmation dialog
//   };

//   return (
//     <div
//       className={`mx-auto p-4 overflow-y-auto ${
//         isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-900'
//       } min-h-screen transition-colors duration-300`}
//     >
//       <h1
//         className={`text-4xl font-extrabold mb-8 text-center ${
//           isDarkMode ? 'text-white' : 'text-gray-900'
//         }`}
//       >
//         Curators
//       </h1>
//       <div className="hidden md:block">
//         <table
//           className={`min-w-full ${
//             isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
//           } rounded-lg overflow-hidden shadow-lg`}
//         >
//           <thead>
//             <tr>
//               <th
//                 className={`py-2 px-4 border-b ${
//                   isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Full Name
//               </th>
//               <th
//                 className={`py-2 px-4 border-b ${
//                   isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Email
//               </th>
//               <th
//                 className={`py-2 px-4 border-b ${
//                   isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Phone
//               </th>
//               <th
//                 className={`py-2 px-4 border-b ${
//                   isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Exhibitions
//               </th>
//               <th
//                 className={`py-2 px-4 border-b ${
//                   isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {curators.map((curator) => (
//               <tr key={curator._id}>
//                 <td
//                   className={`py-2 px-4 border-b ${
//                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                 >
//                   {`${curator.name} ${curator.lastName}`}
//                 </td>
//                 <td
//                   className={`py-2 px-4 border-b ${
//                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                 >
//                   {curator.email}
//                 </td>
//                 <td
//                   className={`py-2 px-4 border-b ${
//                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                 >
//                   {curator.phoneNumber}
//                 </td>
//                 <td
//                   className={`py-2 px-4 border-b ${
//                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                 >
//                   {curator.exhibitions.join(', ')}
//                 </td>
//                 <td
//                   className={`py-2 px-4 border-b ${
//                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                 >
//                   <button
//                     className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ${
//                       isDarkMode ? 'focus:ring-red-400' : 'focus:ring-red-400'
//                     }`}
//                     onClick={() => handleDisableClick(curator)} // Show dialog on button click
//                   >
//                     Disable Curator
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="md:hidden">
//         {curators.map((curator) => (
//           <div
//             key={curator._id}
//             className={`mb-4 p-4 rounded-lg shadow ${
//               isDarkMode ? 'bg-gray-800' : 'bg-white'
//             } transition-colors duration-300`}
//           >
//             <h2 className="text-xl font-bold mb-2">
//               {`${curator.name} ${curator.lastName}`}
//             </h2>
//             <p className="mb-1">
//               <strong>Email:</strong> {curator.email}
//             </p>
//             <p className="mb-1">
//               <strong>Phone:</strong> {curator.phoneNumber}
//             </p>
//             <p>
//               <strong>Exhibitions:</strong> {curator.exhibitions.join(', ')}
//             </p>
//             <button
//               className={`bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600 transition duration-300 ${
//                 isDarkMode ? 'focus:ring-red-400' : 'focus:ring-red-400'
//               }`}
//               onClick={() => handleDisableClick(curator)} // Show dialog on button click
//             >
//               Disable Curator
//             </button>
//           </div>
//         ))}
//       </div>
//       {showDialog && (
//         <ConfirmationDialog
//           message={`Are you sure you want to remove ${selectedCurator?.name} ${selectedCurator?.lastName} from your museum?`}
//           onConfirm={() => disableCurator(selectedCurator._id)} // Disable curator if confirmed
//           onCancel={() => setShowDialog(false)} // Hide dialog if canceled
//           isDarkMode={isDarkMode} // Pass isDarkMode as a prop for styling
//         />
//       )}
//     </div>
//   );
// };

// export default MuseumOwnerCuratorsList;


import React, { useState } from 'react';
import { useMuseumContext } from '../../contexts/MuseumContext';
import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context
import { useLang } from '../../contexts/LangContext'; // Import Lang Context
import ConfirmationDialog from '../common/ConfirmationDialog';

const MuseumOwnerCuratorsList = () => {
  const { museum, loading, updateExhibition } = useMuseumContext();
  const exhibitions = museum?.exhibitions;
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCurator, setSelectedCurator] = useState(null);
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
  const { language } = useLang(); // Get current language
  // const isHebrew = language === 'he'; // Check if the current language is Hebrew

  // Translation object for both English and Hebrew
  const translations = {
    en: {
      curatorsTitle: 'Curators',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      exhibitions: 'Exhibitions',
      action: 'Action',
      disableCurator: 'Disable Curator',
      loading: 'Loading...',
      confirmationMessage: 'Are you sure you want to remove',
    },
    he: {
      curatorsTitle: 'אוצרים',
      fullName: 'שם מלא',
      email: 'אימייל',
      phone: 'טלפון',
      exhibitions: 'תערוכות',
      action: 'פעולה',
      disableCurator: 'השבת אוצר',
      loading: 'טוען...',
      confirmationMessage: 'האם אתה בטוח שברצונך להסיר את',
    }
  };

  const t = translations[language]; // Select the correct translation based on the current language

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      >
        <h1 className="text-2xl font-semibold">{t.loading}</h1>
      </div>
    );
  }

  const curatorsMap = new Map();

  exhibitions?.forEach((exhibition) => {
    exhibition.curators.forEach((curator) => {
      if (!curatorsMap.has(curator._id)) {
        curatorsMap.set(curator._id, {
          ...curator,
          exhibitions: [],
        });
      }
      curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
    });
  });

  const curators = Array.from(curatorsMap.values());

  const disableCurator = async (curatorId) => {
    try {
      const exhibitionsToUpdate = exhibitions.filter((exhibition) =>
        exhibition.curators.some((c) => c._id === curatorId)
      );

      const updatePromises = exhibitionsToUpdate.map(async (exhibition) => {
        const updatedCurators = exhibition.curators
          .filter((c) => c._id !== curatorId)
          .map((c) => c._id);

        return updateExhibition(exhibition._id, { curators: updatedCurators });
      });

      await Promise.all(updatePromises);
      console.log('Curator disabled in all exhibitions.');
    } catch (error) {
      console.error('Error disabling curator:', error);
    }

    setShowDialog(false);
  };

  const handleDisableClick = (curator) => {
    setSelectedCurator(curator);
    setShowDialog(true);
  };

  return (
    <div className={`mx-8 overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-900'} min-h-screen transition-colors duration-300`}>
      <h1 className={`text-4xl font-extrabold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t.curatorsTitle}
      </h1>
      <div className="hidden md:block">
        <table className={`min-w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg overflow-hidden shadow-lg`}>
          <thead>
            <tr>
              <th className={`py-2 px-4 border-b ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{t.fullName}</th>
              <th className={`py-2 px-4 border-b ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{t.email}</th>
              <th className={`py-2 px-4 border-b ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{t.phone}</th>
              <th className={`py-2 px-4 border-b ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{t.exhibitions}</th>
              <th className={`py-2 px-4 border-b ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{t.action}</th>
            </tr>
          </thead>
          <tbody>
            {curators.map((curator) => (
              <tr key={curator._id}>
                <td className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>{`${curator.name} ${curator.lastName}`}</td>
                <td className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>{curator.email}</td>
                <td className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>{curator.phoneNumber}</td>
                <td className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>{curator.exhibitions.join(', ')}</td>
                <td className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ${isDarkMode ? 'focus:ring-red-400' : 'focus:ring-red-400'}`} onClick={() => handleDisableClick(curator)}>
                    {t.disableCurator}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {curators.map((curator) => (
          <div key={curator._id} className={`mb-4 p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
            <h2 className="text-xl font-bold mb-2">{`${curator.name} ${curator.lastName}`}</h2>
            <p className="mb-1"><strong>{t.email}:</strong> {curator.email}</p>
            <p className="mb-1"><strong>{t.phone}:</strong> {curator.phoneNumber}</p>
            <p><strong>{t.exhibitions}:</strong> {curator.exhibitions.join(', ')}</p>
            <button className={`bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600 transition duration-300 ${isDarkMode ? 'focus:ring-red-400' : 'focus:ring-red-400'}`} onClick={() => handleDisableClick(curator)}>
              {t.disableCurator}
            </button>
          </div>
        ))}
      </div>

      {showDialog && (
        <ConfirmationDialog
          message={`${t.confirmationMessage} ${selectedCurator?.name} ${selectedCurator?.lastName}?`}
          onConfirm={() => disableCurator(selectedCurator._id)}
          onCancel={() => setShowDialog(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default MuseumOwnerCuratorsList;
