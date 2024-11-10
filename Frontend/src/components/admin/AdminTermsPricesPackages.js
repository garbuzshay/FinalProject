
// // export default AdminTermsPricesPackages;
// import React, { useState, useEffect } from "react";
// import { useAdminContext } from "../../contexts/AdminContext";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import { useLang } from "../../contexts/LangContext";

// const AdminTermsPricesPackages = () => {
//   const { isDarkMode } = useThemeMode();
//   const { language } = useLang();
//   const isHebrew = language === "he";

//   const { plansData, termsOfUseData } = useAdminContext();
//   const { plans, loading, error, updatePlan, addPlan, deletePlan } = plansData;
//   const { termsOfUse, updateTermsOfUse, fetchTermsOfUse } = termsOfUseData;

//   const [editingPlanIndex, setEditingPlanIndex] = useState(null);
//   const [newPlanData, setNewPlanData] = useState({});
//   const [isAdding, setIsAdding] = useState(false);
//   const [newPlan, setNewPlan] = useState({
//     name: "",
//     maxExhibitions: "",
//     maxArtWorks: "",
//     features: "",
//     price: "",
//   });

//   const [newTerms, setNewTerms] = useState("");
//   const [openTermsModal, setOpenTermsModal] = useState(false);

//   useEffect(() => {
//     fetchTermsOfUse();
//   }, [fetchTermsOfUse]);

//   useEffect(() => {
//     if (termsOfUse) {
//       setNewTerms(termsOfUse);
//     }
//   }, [termsOfUse]);

//   const handleOpenTermsModal = () => setOpenTermsModal(true);
//   const handleCloseTermsModal = () => {
//     setOpenTermsModal(false);
//     setNewTerms(termsOfUse);
//   };

//   const handleSaveTerms = async (e) => {
//     e.preventDefault();
//     await updateTermsOfUse(newTerms);
//     setOpenTermsModal(false);
//   };

//   const handleEditPlan = (index) => {
//     setEditingPlanIndex(index);
//     setNewPlanData(plans[index]);
//   };

//   const handleSavePlan = async (e) => {
//     e.preventDefault();
//     await updatePlan(newPlanData._id, newPlanData);
//     setEditingPlanIndex(null);
//     setNewPlanData({});
//   };

//   const handleCancelEdit = () => {
//     setEditingPlanIndex(null);
//     setNewPlanData({});
//   };

//   const handleAddPlan = async (e) => {
//     e.preventDefault();
//     await addPlan(newPlan);
//     setIsAdding(false);
//     setNewPlan({
//       name: "",
//       maxExhibitions: "",
//       maxArtWorks: "",
//       features: "",
//       price: "",
//     });
//   };

//   const handleDeletePlan = async (id) => {
//     try {
//       await deletePlan(id);
//       setEditingPlanIndex(null);
//     } catch (error) {
//       console.error("Failed to delete the plan:", error);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center py-4">{isHebrew ? "טוען..." : "Loading..."}</p>
//     );
//   if (error)
//     return (
//       <p className="text-center py-4 text-red-500">
//         {isHebrew ? `שגיאה: ${error}` : `Error: ${error}`}
//       </p>
//     );

//   return (
//     <div
//       className={`p-4 ${
//         isDarkMode ? "bg-gray-900 text-gray-300" : " text-gray-900"
//       }`}
//       dir={isHebrew ? "rtl" : "ltr"}
//     >
//       <h2 className="text-2xl font-semibold mb-5 text-center">
//         {isHebrew ? "מחירים וחבילות" : "Prices and Packages"}
//       </h2>

//       {/* Add Plan Button */}
//       <button
//         className="w-full md:w-auto bg-green-500 text-white  px-4 py-2 rounded mb-5"
//         onClick={() => setIsAdding(true)}
//       >
//         {isHebrew ? "הוסף חבילה" : "Add Plan"}
//       </button>

//       {/* Add Plan Form */}
//       {isAdding && (
//         <form onSubmit={handleAddPlan} className="mb-5 space-y-4">
//           {["name", "maxExhibitions", "maxArtWorks", "features", "price"].map(
//             (field) => (
//               <div key={field}>
//                 <label
//                   className={`block mb-2 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-700"
//                   }`}
//                   htmlFor={field}
//                 >
//                   {isHebrew
//                     ? {
//                         name: "שם",
//                         maxExhibitions: "מקסימום תערוכות",
//                         maxArtWorks: "מקסימום יצירות אמנות",
//                         features: "תכונות",
//                         price: "מחיר",
//                       }[field]
//                     : field.charAt(0).toUpperCase() + field.slice(1)}
//                 </label>
//                 <input
//                   className={`w-full px-2 py-1 border rounded ${
//                     isDarkMode
//                       ? "bg-gray-800 text-gray-300"
//                       : "bg-white text-gray-900"
//                   }`}
//                   type={field === "price" ? "number" : "text"}
//                   id={field}
//                   value={newPlan[field]}
//                   onChange={(e) =>
//                     setNewPlan({ ...newPlan, [field]: e.target.value })
//                   }
//                 />
//               </div>
//             )
//           )}
//           <div
//             className={`flex-col ${
//               isHebrew ? "space-x-reverse space-x-2" : "space-x-2"
//             }`}
//             dir={isHebrew ? "rtl" : "ltr"}
//           >
//             <button
//               className="flex-1 bg-green-500 text-white px-4 py-2 rounded"
//               type="submit"
//             >
//               {isHebrew ? "הוסף" : "Add"}
//             </button>
            
//             <button
//               className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
//               type="button"
//               onClick={() => setIsAdding(false)}
//             >
//               {isHebrew ? "בטל" : "Cancel"}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Responsive Table/Cards */}
//       <div className="hidden md:block overflow-x-auto">
//         <table
//           className={`min-w-full mb-5 ${
//             isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
//           }`}
//         >
//           <thead
//             className={`${
//               isDarkMode
//                 ? "bg-gray-900 text-gray-300"
//                 : "bg-gray-800 text-white"
//             }`}
//           >
//             <tr className={isHebrew ? "flex-row-reverse" : ""}>
//               <th className="w-1/6 py-2">{isHebrew ? "חבילה" : "Package"}</th>
//               <th className="w-1/6 py-2">
//                 {isHebrew ? "תערוכות" : "Exhibitions"}
//               </th>
//               <th className="w-1/6 py-2">
//                 {isHebrew ? "יצירות אמנות" : "Artworks"}
//               </th>
//               <th className="w-1/6 py-2">{isHebrew ? "תכונות" : "Features"}</th>
//               <th className="w-1/6 py-2">{isHebrew ? "מחיר" : "Price"}</th>
//               <th className="w-1/6 py-2">{isHebrew ? "פעולות" : "Actions"}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plans.map((plan, index) => (
//               <React.Fragment key={index}>
//                 {editingPlanIndex === index ? (
//                   <tr>
//                     {[
//                       "name",
//                       "maxExhibitions",
//                       "maxArtWorks",
//                       "features",
//                       "price",
//                     ].map((field, i) => (
//                       <td key={i} className="border px-4 py-2">
//                         <input
//                           className={`w-full px-2 py-1 border rounded ${
//                             isDarkMode
//                               ? "bg-gray-800 text-gray-300"
//                               : "bg-white text-gray-900"
//                           }`}
//                           type={field === "price" ? "number" : "text"}
//                           value={newPlanData[field]}
//                           onChange={(e) =>
//                             setNewPlanData({
//                               ...newPlanData,
//                               [field]: e.target.value,
//                             })
//                           }
//                         />
//                       </td>
//                     ))}
//                     <td className="border">
//                       <button
//                         className={`bg-green-500 text-white px-2 py-1 rounded ${
//                           isHebrew ? "ml-2" : "mr-2"
//                         }`}
//                         onClick={handleSavePlan}
//                       >
//                         {isHebrew ? "שמור" : "Save"}
//                       </button>
//                       <button
//                         className={`bg-red-500 text-white px-2 py-1 rounded ${
//                           isHebrew ? "ml-2" : "mr-2"
//                         }`}
//                         onClick={handleCancelEdit}
//                       >
//                         {isHebrew ? "בטל" : "Cancel"}
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => handleDeletePlan(plan._id)}
//                       >
//                         {isHebrew ? "מחק" : "Delete"}
//                       </button>
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr
//                     className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                       isHebrew ? "flex-row-reverse " : ""
//                     }`}
//                     onClick={() => handleEditPlan(index)}
//                   >
//                     <td className="border px-4 py-2">{plan.name}</td>
//                     <td className="border px-4 py-2">
//                       {plan.maxExhibitions === null
//                         ? isHebrew
//                           ? "תערוכות ללא הגבלה"
//                           : "Unlimited exhibitions"
//                         : `${isHebrew ? "עד " : "Up to "} ${
//                             plan.maxExhibitions
//                           } ${isHebrew ? "תערוכות" : "exhibitions"}`}
//                     </td>
//                     <td className="border px-4 py-2">
//                       {plan.maxArtWorks === null
//                         ? isHebrew
//                           ? "יצירות ללא הגבלה"
//                           : "Unlimited artworks"
//                         : `${isHebrew ? "עד " : "Up to "} ${plan.maxArtWorks} ${
//                             isHebrew ? "יצירות" : "artworks"
//                           }`}
//                     </td>
//                     <td className="border px-4 py-2">{plan.features}</td>
//                     <td className="border px-4 py-2">{`${plan.price}$`}</td>
//                     <td className="border px-4 py-2">
//                       {isHebrew ? "ערוך" : "Edit"}
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {plans.map((plan, index) => (
//           <div
//             key={index}
//             className={`p-4 rounded-lg shadow-md ${
//               isDarkMode ? "bg-gray-800" : "bg-white"
//             }`}
//           >
//             {editingPlanIndex === index ? (
//               <form onSubmit={handleSavePlan} className="space-y-4">
//                 {[
//                   "name",
//                   "maxExhibitions",
//                   "maxArtWorks",
//                   "features",
//                   "price",
//                 ].map((field) => (
//                   <div key={field}>
//                     <label
//                       className={`block mb-2 ${
//                         isDarkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       {isHebrew
//                         ? {
//                             name: "שם",
//                             maxExhibitions: "מקסימום תערוכות",
//                             maxArtWorks: "מקסימום יצירות אמנות",
//                             features: "תכונות",
//                             price: "מחיר",
//                           }[field]
//                         : field.charAt(0).toUpperCase() + field.slice(1)}
//                     </label>
//                     <input
//                       className={`w-full px-2 py-1 border rounded ${
//                         isDarkMode
//                           ? "bg-gray-700 text-gray-300"
//                           : "bg-white text-gray-900"
//                       }`}
//                       type={field === "price" ? "number" : "text"}
//                       value={newPlanData[field]}
//                       onChange={(e) =>
//                         setNewPlanData({
//                           ...newPlanData,
//                           [field]: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 ))}
//                 <div className="flex space-x-2">
//                   <button
//                     type="submit"
//                     className="flex-1 bg-green-500 text-white px-4 py-2 rounded"
//                   >
//                     {isHebrew ? "שמור" : "Save"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     {isHebrew ? "בטל" : "Cancel"}
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
//                 <p>
//                   <strong>{isHebrew ? "תערוכות" : "Exhibitions"}:</strong>{" "}
//                   {plan.maxExhibitions === null
//                     ? isHebrew
//                       ? "ללא הגבלה"
//                       : "Unlimited"
//                     : `${isHebrew ? "עד " : "Up to "} ${plan.maxExhibitions}`}
//                 </p>
//                 <p>
//                   <strong>{isHebrew ? "יצירות אמנות" : "Artworks"}:</strong>{" "}
//                   {plan.maxArtWorks === null
//                     ? isHebrew
//                       ? "ללא הגבלה"
//                       : "Unlimited"
//                     : `${isHebrew ? "עד " : "Up to "} ${plan.maxArtWorks}`}
//                 </p>
//                 <p>
//                   <strong>{isHebrew ? "תכונות" : "Features"}:</strong>{" "}
//                   {plan.features}
//                 </p>
//                 <p>
//                   <strong>{isHebrew ? "מחיר" : "Price"}:</strong> ${plan.price}
//                 </p>
//                 <div
//                   className={`mt-4 flex ${
//                     isHebrew ? "space-x-reverse space-x-2" : "space-x-2"
//                   }`}
//                 >
//                   <button
//                     onClick={() => handleEditPlan(index)}
//                     className="flex-1 bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     {isHebrew ? "ערוך" : "Edit"}
//                   </button>
//                   <button
//                     onClick={() => handleDeletePlan(plan._id)}
//                     className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     {isHebrew ? "מחק" : "Delete"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Terms of Use Section */}
//       <h2 className="text-2xl font-semibold my-5 text-center">
//         {isHebrew ? "נהל את תנאי השימוש" : "Manage Terms of Use"}
//       </h2>
//       <button
//         className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleOpenTermsModal}
//       >
//         {isHebrew ? "פתח וערוך תנאים" : "Open and Edit Terms"}
//       </button>

//       {/* Terms Modal */}
//       <Dialog
//         open={openTermsModal}
//         onClose={handleCloseTermsModal}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           {isHebrew ? "ערוך את תנאי השימוש" : "Edit Terms and Conditions"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             label={isHebrew ? "תנאים והגבלות" : "Terms and Conditions"}
//             multiline
//             rows={10}
//             fullWidth
//             variant="outlined"
//             value={newTerms}
//             onChange={(e) => setNewTerms(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseTermsModal} color="secondary">
//             {isHebrew ? "סגור" : "Close"}
//           </Button>
//           <Button onClick={handleSaveTerms} color="primary" variant="contained">
//             {isHebrew ? "שמור" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminTermsPricesPackages;

import React, { useState, useEffect } from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext";

const AdminTermsPricesPackages = () => {
  const { isDarkMode } = useThemeMode();
  const { language } = useLang();
  const isHebrew = language === "he";

  const { plansData, termsOfUseData } = useAdminContext();
  const { plans, loading, error, updatePlan, addPlan, deletePlan } = plansData;
  const { termsOfUse, updateTermsOfUse, fetchTermsOfUse } = termsOfUseData;

  const [sortedPlans, setSortedPlans] = useState([]);
  const [editingPlanIndex, setEditingPlanIndex] = useState(null);
  const [newPlanData, setNewPlanData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    maxExhibitions: "",
    maxArtWorks: "",
    features: "",
    price: "",
  });

  const [newTerms, setNewTerms] = useState("");
  const [openTermsModal, setOpenTermsModal] = useState(false);

  useEffect(() => {
    fetchTermsOfUse();
  }, [fetchTermsOfUse]);

  useEffect(() => {
    if (termsOfUse) {
      setNewTerms(termsOfUse);
    }
  }, [termsOfUse]);

  // Sort plans by price in ascending order whenever plans data changes
  useEffect(() => {
    const sorted = [...plans].sort((a, b) => a.price - b.price);
    setSortedPlans(sorted);
  }, [plans]);

  const handleOpenTermsModal = () => setOpenTermsModal(true);
  const handleCloseTermsModal = () => {
    setOpenTermsModal(false);
    setNewTerms(termsOfUse);
  };

  const handleSaveTerms = async (e) => {
    e.preventDefault();
    await updateTermsOfUse(newTerms);
    setOpenTermsModal(false);
  };

  const handleEditPlan = (index) => {
    setEditingPlanIndex(index);
    setNewPlanData(sortedPlans[index]);
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();
    await updatePlan(newPlanData._id, newPlanData);
    setEditingPlanIndex(null);
    setNewPlanData({});
  };

  const handleCancelEdit = () => {
    setEditingPlanIndex(null);
    setNewPlanData({});
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    await addPlan(newPlan);
    setIsAdding(false);
    setNewPlan({
      name: "",
      maxExhibitions: "",
      maxArtWorks: "",
      features: "",
      price: "",
    });
  };

  const handleDeletePlan = async (id) => {
    try {
      await deletePlan(id);
      setEditingPlanIndex(null);
    } catch (error) {
      console.error("Failed to delete the plan:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center py-4">{isHebrew ? "טוען..." : "Loading..."}</p>
    );
  if (error)
    return (
      <p className="text-center py-4 text-red-500">
        {isHebrew ? `שגיאה: ${error}` : `Error: ${error}`}
      </p>
    );

  return (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-gray-900 text-gray-300" : " text-gray-900"
      }`}
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <h2 className="text-2xl font-semibold mb-5 text-center">
        {isHebrew ? "מחירים וחבילות" : "Prices and Packages"}
      </h2>

      {/* Add Plan Button */}
      <button
        className="w-full md:w-auto bg-green-500 text-white  px-4 py-2 rounded mb-5"
        onClick={() => setIsAdding(true)}
      >
        {isHebrew ? "הוסף חבילה" : "Add Plan"}
      </button>

      {/* Add Plan Form */}
      {isAdding && (
        <form onSubmit={handleAddPlan} className="mb-5 space-y-4">
          {["name", "maxExhibitions", "maxArtWorks", "features", "price"].map(
            (field) => (
              <div key={field}>
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  htmlFor={field}
                >
                  {isHebrew
                    ? {
                        name: "שם",
                        maxExhibitions: "מקסימום תערוכות",
                        maxArtWorks: "מקסימום יצירות אמנות",
                        features: "תכונות",
                        price: "מחיר",
                      }[field]
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  className={`w-full px-2 py-1 border rounded ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-900"
                  }`}
                  type={field === "price" ? "number" : "text"}
                  id={field}
                  value={newPlan[field]}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, [field]: e.target.value })
                  }
                />
              </div>
            )
          )}
          <div
            className={`flex-col ${
              isHebrew ? "space-x-reverse space-x-2" : "space-x-2"
            }`}
            dir={isHebrew ? "rtl" : "ltr"}
          >
            <button
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              {isHebrew ? "הוסף" : "Add"}
            </button>
            <button
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
              type="button"
              onClick={() => setIsAdding(false)}
            >
              {isHebrew ? "בטל" : "Cancel"}
            </button>
          </div>
        </form>
      )}

      {/* Responsive Table/Cards */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className={`min-w-full mb-5 ${
            isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
          }`}
        >
          <thead
            className={`${
              isDarkMode
                ? "bg-gray-900 text-gray-300"
                : "bg-gray-800 text-white"
            }`}
          >
            <tr className={isHebrew ? "flex-row-reverse" : ""}>
              <th className="w-1/6 py-2">{isHebrew ? "חבילה" : "Package"}</th>
              <th className="w-1/6 py-2">
                {isHebrew ? "תערוכות" : "Exhibitions"}
              </th>
              <th className="w-1/6 py-2">
                {isHebrew ? "יצירות אמנות" : "Artworks"}
              </th>
              <th className="w-1/6 py-2">{isHebrew ? "תכונות" : "Features"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "מחיר" : "Price"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "פעולות" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlans.map((plan, index) => (
              <React.Fragment key={index}>
                {editingPlanIndex === index ? (
                  <tr>
                    {[
                      "name",
                      "maxExhibitions",
                      "maxArtWorks",
                      "features",
                      "price",
                    ].map((field, i) => (
                      <td key={i} className="border px-4 py-2">
                        <input
                          className={`w-full px-2 py-1 border rounded ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-300"
                              : "bg-white text-gray-900"
                          }`}
                          type={field === "price" ? "number" : "text"}
                          value={newPlanData[field]}
                          onChange={(e) =>
                            setNewPlanData({
                              ...newPlanData,
                              [field]: e.target.value,
                            })
                          }
                        />
                      </td>
                    ))}
                    <td className="border">
                      <button
                        className={`bg-green-500 text-white px-2 py-1 rounded ${
                          isHebrew ? "ml-2" : "mr-2"
                        }`}
                        onClick={handleSavePlan}
                      >
                        {isHebrew ? "שמור" : "Save"}
                      </button>
                      <button
                        className={`bg-red-500 text-white px-2 py-1 rounded ${
                          isHebrew ? "ml-2" : "mr-2"
                        }`}
                        onClick={handleCancelEdit}
                      >
                        {isHebrew ? "בטל" : "Cancel"}
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeletePlan(plan._id)}
                      >
                        {isHebrew ? "מחק" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isHebrew ? "flex-row-reverse " : ""
                    }`}
                    onClick={() => handleEditPlan(index)}
                  >
                    <td className="border px-4 py-2">{plan.name}</td>
                    <td className="border px-4 py-2">
                      {plan.maxExhibitions === null
                        ? isHebrew
                          ? "תערוכות ללא הגבלה"
                          : "Unlimited exhibitions"
                        : `${isHebrew ? "עד " : "Up to "} ${
                            plan.maxExhibitions
                          } ${isHebrew ? "תערוכות" : "exhibitions"}`}
                    </td>
                    <td className="border px-4 py-2">
                      {plan.maxArtWorks === null
                        ? isHebrew
                          ? "יצירות ללא הגבלה"
                          : "Unlimited artworks"
                        : `${isHebrew ? "עד " : "Up to "} ${plan.maxArtWorks} ${
                            isHebrew ? "יצירות" : "artworks"
                          }`}
                    </td>
                    <td className="border px-4 py-2">{plan.features}</td>
                    <td className="border px-4 py-2">{`${plan.price}$`}</td>
                    <td className="border px-4 py-2">
                      {isHebrew ? "ערוך" : "Edit"}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedPlans.map((plan, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {editingPlanIndex === index ? (
              <form onSubmit={handleSavePlan} className="space-y-4">
                {[
                  "name",
                  "maxExhibitions",
                  "maxArtWorks",
                  "features",
                  "price",
                ].map((field) => (
                  <div key={field}>
                    <label
                      className={`block mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {isHebrew
                        ? {
                            name: "שם",
                            maxExhibitions: "מקסימום תערוכות",
                            maxArtWorks: "מקסימום יצירות אמנות",
                            features: "תכונות",
                            price: "מחיר",
                          }[field]
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      className={`w-full px-2 py-1 border rounded ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-white text-gray-900"
                      }`}
                      type={field === "price" ? "number" : "text"}
                      value={newPlanData[field]}
                      onChange={(e) =>
                        setNewPlanData({
                          ...newPlanData,
                          [field]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {isHebrew ? "שמור" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    {isHebrew ? "בטל" : "Cancel"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p>
                  <strong>{isHebrew ? "תערוכות" : "Exhibitions"}:</strong>{" "}
                  {plan.maxExhibitions === null
                    ? isHebrew
                      ? "ללא הגבלה"
                      : "Unlimited"
                    : `${isHebrew ? "עד " : "Up to "} ${plan.maxExhibitions}`}
                </p>
                <p>
                  <strong>{isHebrew ? "יצירות אמנות" : "Artworks"}:</strong>{" "}
                  {plan.maxArtWorks === null
                    ? isHebrew
                      ? "ללא הגבלה"
                      : "Unlimited"
                    : `${isHebrew ? "עד " : "Up to "} ${plan.maxArtWorks}`}
                </p>
                <p>
                  <strong>{isHebrew ? "תכונות" : "Features"}:</strong>{" "}
                  {plan.features}
                </p>
                <p>
                  <strong>{isHebrew ? "מחיר" : "Price"}:</strong> ${plan.price}
                </p>
                <div
                  className={`mt-4 flex ${
                    isHebrew ? "space-x-reverse space-x-2" : "space-x-2"
                  }`}
                >
                  <button
                    onClick={() => handleEditPlan(index)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {isHebrew ? "ערוך" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    {isHebrew ? "מחק" : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Terms of Use Section */}
      <h2 className="text-2xl font-semibold my-5 text-center">
        {isHebrew ? "נהל את תנאי השימוש" : "Manage Terms of Use"}
      </h2>
      <button
        className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleOpenTermsModal}
      >
        {isHebrew ? "פתח וערוך תנאים" : "Open and Edit Terms"}
      </button>

      {/* Terms Modal */}
      <Dialog
        open={openTermsModal}
        onClose={handleCloseTermsModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isHebrew ? "ערוך את תנאי השימוש" : "Edit Terms and Conditions"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={isHebrew ? "תנאים והגבלות" : "Terms and Conditions"}
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={newTerms}
            onChange={(e) => setNewTerms(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsModal} color="secondary">
            {isHebrew ? "סגור" : "Close"}
          </Button>
          <Button onClick={handleSaveTerms} color="primary" variant="contained">
            {isHebrew ? "שמור" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminTermsPricesPackages;
