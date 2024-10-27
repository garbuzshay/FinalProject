
// import React, { useState } from 'react';
// import { useAdminContext } from '../../contexts/AdminContext';
// import { Link } from 'react-router-dom';
// import { useThemeMode } from '../../contexts/DarkModeContext';

// const AdminExhibitList = () => {
//   const { isDarkMode } = useThemeMode();
//   const { exhibitionsData } = useAdminContext();
//   const { exhibitions, isLoading, error } = exhibitionsData;
//   const [filter, setFilter] = useState("all");

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   // Function to filter exhibitions based on status
//   const filterExhibitions = () => {
//     switch (filter) {
//       case "open":
//         return exhibitions.filter((exhibit) => exhibit.status === "open");
//       case "closed":
//         return exhibitions.filter((exhibit) => exhibit.status === "closed");
//       case "all":
//       default:
//         return exhibitions;
//     }
//   };

//   const filteredExhibitions = filterExhibitions();

//   return (
//     <div className="p-4">
//       <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Exhibitions</h2>

//       {/* Filter buttons */}
//       <div className="flex justify-center mb-4">
//         <button
//           onClick={() => setFilter("all")}
//           className={`px-4 py-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
//         >
//           Show All
//         </button>
//         <button
//           onClick={() => setFilter("open")}
//           className={`px-4 py-2 mx-2 ${filter === "open" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
//         >
//           Show Open Exhibits
//         </button>
//         <button
//           onClick={() => setFilter("closed")}
//           className={`px-4 py-2 ${filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
//         >
//           Show Closed Exhibits
//         </button>
//       </div>

//       <div className="hidden md:block overflow-x-auto">
//         {/* Table view for desktop */}
//         <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
//           <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
//             <tr>
//               <th className="w-1/7 py-2 px-4 border">Exhibit Name</th>
//               <th className="w-1/7 py-2 px-4 border">Museum</th>
//               <th className="w-1/7 py-2 px-4 border">Curators</th>
//               <th className="w-1/7 py-2 px-4 border">Status</th>
//               <th className='w-1/7 py-2 px-4 border'>Created at</th>
//               <th className="w-1/7 py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredExhibitions.map((exhibit) => (
//               <tr key={exhibit._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
//                 <td className="border px-4 py-2">{exhibit.name}</td>
//                 <td className="border px-4 py-2">{exhibit.museum.name}</td>
//                 <td className="border px-4 py-2">
//                   {exhibit.curators.map((curator) => curator.name).join(', ')}
//                 </td>
//                 <td className="border px-4 py-2">{exhibit.status}</td>
//                 <td className="border px-4 py-2">{new Date(exhibit.createdAt).toLocaleDateString()}</td>
//                 <td className="border px-4 py-2">
//                   <Link to={`edit-exhibit/${exhibit._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
//                     View and Edit
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="block md:hidden">
//         {/* Card view for mobile */}
//         {filteredExhibitions.map((exhibit) => (
//           <div key={exhibit._id} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
//             <h3 className="font-bold text-lg">{exhibit.name}</h3>
//             <p className="text-sm"><strong>Museum:</strong> {exhibit.museum.name}</p>
//             <p className="text-sm"><strong>Curators:</strong> {exhibit.curators.map((curator) => curator.name).join(', ')}</p>
//             <p className="text-sm"><strong>Status:</strong> {exhibit.status}</p>
//             <Link to={`edit-exhibit/${exhibit._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 mt-2 block">
//               View and Edit
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminExhibitList;



import React, { useState } from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { useThemeMode } from '../../contexts/DarkModeContext';
import { useLang } from '../../contexts/LangContext'; // Import the language context

const AdminExhibitList = () => {
  const { isDarkMode } = useThemeMode();
  const { language } = useLang(); // Get the current language
  const isHebrew = language === 'he'; // Check if the language is Hebrew
  const { exhibitionsData } = useAdminContext();
  const { exhibitions, isLoading, error } = exhibitionsData;
  const [filter, setFilter] = useState("all");

  if (isLoading) return <div>{isHebrew ? 'טוען...' : 'Loading...'}</div>;
  if (error) return <div style={{ color: 'red' }}>{isHebrew ? `שגיאה: ${error}` : `Error: ${error}`}</div>;

  // Function to filter exhibitions based on status
  const filterExhibitions = () => {
    switch (filter) {
      case "open":
        return exhibitions.filter((exhibit) => exhibit.status === "open");
      case "closed":
        return exhibitions.filter((exhibit) => exhibit.status === "closed");
      case "all":
      default:
        return exhibitions;
    }
  };

  const filteredExhibitions = filterExhibitions();

  return (
    <div className="p-4"  dir={isHebrew ? "rtl" : "ltr"}>
      <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
        {isHebrew ? 'תערוכות' : 'Exhibitions'}
      </h2>

      {/* Filter buttons - Reverse order for Hebrew */}
      <div className={`flex justify-center mb-4 `}>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          {isHebrew ? 'הצג הכל' : 'Show All'}
        </button>
        <button
          onClick={() => setFilter("open")}
          className={`px-4 py-2 mx-2 ${filter === "open" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          {isHebrew ? 'הצג תערוכות פתוחות' : 'Show Open Exhibits'}
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 ${filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          {isHebrew ? 'הצג תערוכות סגורות' : 'Show Closed Exhibits'}
        </button>
      </div>

      {/* Table view for desktop */}
      <div className="hidden md:block overflow-x-auto" >
        <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
            <tr className={`${isHebrew ? 'flex-row-reverse' : ''}`}>
              <th className="w-1/7 py-2 px-4 border">{isHebrew ? 'שם התערוכה' : 'Exhibit Name'}</th>
              <th className="w-1/7 py-2 px-4 border">{isHebrew ? 'מוזיאון' : 'Museum'}</th>
              <th className="w-1/7 py-2 px-4 border">{isHebrew ? 'אוצרים' : 'Curators'}</th>
              <th className="w-1/7 py-2 px-4 border">{isHebrew ? 'סטטוס' : 'Status'}</th>
              <th className="w-1/7 py-2 px-4 border">{isHebrew ? 'נוצר ב-' : 'Created at'}</th>
              <th className="w-1/7 py-2 px-4 border">{isHebrew ? 'פעולות' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredExhibitions.map((exhibit) => (
              <tr key={exhibit._id} className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${isHebrew ? 'flex-row-reverse' : ''}`}>
                <td className="border px-4 py-2">{exhibit.name}</td>
                <td className="border px-4 py-2">{exhibit.museum.name}</td>
                <td className="border px-4 py-2">{exhibit.curators.map((curator) => curator.name).join(', ')}</td>
                <td className="border px-4 py-2">{exhibit.status}</td>
                <td className="border px-4 py-2">{new Date(exhibit.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  <Link to={`edit-exhibit/${exhibit._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
                    {isHebrew ? 'צפה וערוך' : 'View and Edit'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="block md:hidden">
        {filteredExhibitions.map((exhibit) => (
          <div key={exhibit._id} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
            <h3 className="font-bold text-lg">{exhibit.name}</h3>
            <p className="text-sm"><strong>{isHebrew ? 'מוזיאון:' : 'Museum:'}</strong> {exhibit.museum.name}</p>
            <p className="text-sm"><strong>{isHebrew ? 'אוצרים:' : 'Curators:'}</strong> {exhibit.curators.map((curator) => curator.name).join(', ')}</p>
            <p className="text-sm"><strong>{isHebrew ? 'סטטוס:' : 'Status:'}</strong> {exhibit.status}</p>
            <Link to={`edit-exhibit/${exhibit._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 mt-2 block">
              {isHebrew ? 'צפה וערוך' : 'View and Edit'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExhibitList;
