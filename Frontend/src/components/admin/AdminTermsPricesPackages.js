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
// import { useThemeMode } from "../../contexts/DarkModeContext"; // For dark mode

// const AdminTermsPricesPackages = () => {
//   const { isDarkMode } = useThemeMode(); // Dark mode toggle from context
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

//   // Fetch the current terms of use when the component mounts
//   useEffect(() => {
//     fetchTermsOfUse();
//   }, [fetchTermsOfUse]);

//   // Sync the fetched terms with the local state for editing
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
//       // Optionally, you can show a success message or handle errors here
//     } catch (error) {
//       console.error("Failed to delete the plan:", error);
//       // Optionally, handle the error (e.g., show a notification)
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div
//       className={`p-4 ${
//         isDarkMode ? "bg-gray-900 text-gray-300" : "text-gray-900"
//       }`}
//     >
//       <h2 className="text-2xl font-semibold mb-5">Prices and Packages</h2>

//       {/* Plan Form */}
//       {isAdding ? (
//         <form onSubmit={handleAddPlan} className="mb-5">
//           {["name", "maxExhibitions", "maxArtWorks", "features", "price"].map(
//             (field, index) => (
//               <div className="mb-4" key={index}>
//                 <label
//                   className={`block mb-2 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-700"
//                   }`}
//                   htmlFor={field}
//                 >
//                   {field.charAt(0).toUpperCase() + field.slice(1)}
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
//           <button
//             className="w-full bg-green-500 text-white px-4 py-2 rounded"
//             type="submit"
//           >
//             Add Plan
//           </button>
//           <button
//             className="w-full bg-red-500 text-white px-4 py-2 rounded mt-2"
//             type="button"
//             onClick={() => setIsAdding(false)}
//           >
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded mb-5"
//           onClick={() => setIsAdding(true)}
//         >
//           Add Plan
//         </button>
//       )}

//       {/* Responsive Table */}
//       <div className="overflow-x-auto">
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
//             <tr>
//               <th className="w-1/6 py-2">Package</th>
//               <th className="w-1/6 py-2">Exhibitions</th>
//               <th className="w-1/6 py-2 ">Artworks</th>
//               <th className="w-1/6 py-2 ">Features</th>
//               <th className="w-1/6 py-2 ">Price</th>
//               <th className="w-1/6 py-2 ">Actions</th>
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
//                         className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                         onClick={handleSavePlan}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded mr-2"
//                         onClick={handleCancelEdit}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => handleDeletePlan(plan._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr
//                     className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
//                     onClick={() => handleEditPlan(index)}
//                   >
//                     <td className="border px-4 py-2">{plan.name}</td>
//                     <td className="border px-4 py-2">
//                       {plan.maxExhibitions === null
//                         ? "Unlimited exhibitions"
//                         : `Up to ${plan.maxExhibitions} exhibitions`}
//                     </td>
//                     <td className="border px-4 py-2">
//                       {plan.maxArtWorks === null
//                         ? "Unlimited artworks"
//                         : `Manage up to ${plan.maxArtWorks} artworks`}
//                     </td>
//                     <td className="border px-4 py-2">{plan.features}</td>
//                     <td className="border px-4 py-2">{plan.price}$</td>
//                     <td className="border px-4 py-2">Edit</td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Button to Open Terms Modal */}
//       <h2 className="text-2xl font-semibold mb-5">Manage Terms of Use</h2>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleOpenTermsModal}
//       >
//         Open and Edit Terms
//       </button>

//       {/* Terms Modal */}
//       <Dialog
//         open={openTermsModal}
//         onClose={handleCloseTermsModal}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Edit Terms and Conditions</DialogTitle>
//         <DialogContent>
//           {/* No dark mode styles applied here, keeping the original style */}
//           <TextField
//             label="Terms and Conditions"
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
//             Close
//           </Button>
//           <Button onClick={handleSaveTerms} color="primary" variant="contained">
//             Save
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
import { useThemeMode } from "../../contexts/DarkModeContext"; // For dark mode
import { useLang } from "../../contexts/LangContext"; // For language context

const AdminTermsPricesPackages = () => {
  const { isDarkMode } = useThemeMode(); // Dark mode toggle from context
  const { language } = useLang(); // Get the current language
  const isHebrew = language === "he"; // Check if the language is Hebrew

  const { plansData, termsOfUseData } = useAdminContext();
  const { plans, loading, error, updatePlan, addPlan, deletePlan } = plansData;
  const { termsOfUse, updateTermsOfUse, fetchTermsOfUse } = termsOfUseData;

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

  // Fetch the current terms of use when the component mounts
  useEffect(() => {
    fetchTermsOfUse();
  }, [fetchTermsOfUse]);

  // Sync the fetched terms with the local state for editing
  useEffect(() => {
    if (termsOfUse) {
      setNewTerms(termsOfUse);
    }
  }, [termsOfUse]);

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
    setNewPlanData(plans[index]);
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

  if (loading) return <p>{isHebrew ? 'טוען...' : 'Loading...'}</p>;
  if (error) return <p>{isHebrew ? `שגיאה: ${error}` : `Error: ${error}`}</p>;

  return (
    <div className={`p-4 ${isDarkMode ? "bg-gray-900 text-gray-300" : "text-gray-900"}`}>
      <h2 className="text-2xl font-semibold mb-5">
        {isHebrew ? "מחירים וחבילות" : "Prices and Packages"}
      </h2>

      {/* Plan Form */}
      {isAdding ? (
        <form onSubmit={handleAddPlan} className="mb-5">
          {["name", "maxExhibitions", "maxArtWorks", "features", "price"].map(
            (field, index) => (
              <div className="mb-4" key={index}>
                <label
                  className={`block mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
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
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
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
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded" type="submit">
            {isHebrew ? "הוסף חבילה" : "Add Plan"}
          </button>
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded mt-2"
            type="button"
            onClick={() => setIsAdding(false)}
          >
            {isHebrew ? "בטל" : "Cancel"}
          </button>
        </form>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => setIsAdding(true)}
        >
          {isHebrew ? "הוסף חבילה" : "Add Plan"}
        </button>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className={`min-w-full mb-5 ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}>
          <thead className={`${isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-800 text-white"}`}>
            <tr className={isHebrew ? "flex-row-reverse" : ""}>
              <th className="w-1/6 py-2">{isHebrew ? "חבילה" : "Package"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "תערוכות" : "Exhibitions"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "יצירות אמנות" : "Artworks"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "תכונות" : "Features"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "מחיר" : "Price"}</th>
              <th className="w-1/6 py-2">{isHebrew ? "פעולות" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <React.Fragment key={index}>
                {editingPlanIndex === index ? (
                  <tr>
                    {["name", "maxExhibitions", "maxArtWorks", "features", "price"].map(
                      (field, i) => (
                        <td key={i} className="border px-4 py-2">
                          <input
                            className={`w-full px-2 py-1 border rounded ${
                              isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
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
                      )
                    )}
                    <td className="border">
                      <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleSavePlan}>
                        {isHebrew ? "שמור" : "Save"}
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded mr-2" onClick={handleCancelEdit}>
                        {isHebrew ? "בטל" : "Cancel"}
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeletePlan(plan._id)}>
                        {isHebrew ? "מחק" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${isHebrew ? "flex-row-reverse" : ""}`}
                    onClick={() => handleEditPlan(index)}
                  >
                    <td className="border px-4 py-2">{plan.name}</td>
                    <td className="border px-4 py-2">
                      {plan.maxExhibitions === null
                        ? isHebrew ? "תערוכות ללא הגבלה" : "Unlimited exhibitions"
                        : `${isHebrew ? 'עד ' : 'Up to '} ${plan.maxExhibitions} ${isHebrew ? 'תערוכות' : 'exhibitions'}`}
                    </td>
                    <td className="border px-4 py-2">
                      {plan.maxArtWorks === null
                        ? isHebrew ? "יצירות ללא הגבלה" : "Unlimited artworks"
                        : `${isHebrew ? 'עד ' : 'Up to '} ${plan.maxArtWorks} ${isHebrew ? 'יצירות' : 'artworks'}`}
                    </td>
                    <td className="border px-4 py-2">{plan.features}</td>
                    <td className="border px-4 py-2">{`${plan.price}$`}</td>
                    <td className="border px-4 py-2">{isHebrew ? "ערוך" : "Edit"}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to Open Terms Modal */}
      <h2 className="text-2xl font-semibold mb-5">{isHebrew ? "נהל את תנאי השימוש" : "Manage Terms of Use"}</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpenTermsModal}>
        {isHebrew ? "פתח וערוך תנאים" : "Open and Edit Terms"}
      </button>

      {/* Terms Modal */}
      <Dialog open={openTermsModal} onClose={handleCloseTermsModal} fullWidth maxWidth="md">
        <DialogTitle>{isHebrew ? "ערוך את תנאי השימוש" : "Edit Terms and Conditions"}</DialogTitle>
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
