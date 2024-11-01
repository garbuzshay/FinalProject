
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import { useForm } from "react-hook-form";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
import { useLang } from "../../contexts/LangContext"; // Import Language Context
import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed

const AdminEditMuseum = () => {
  const { id } = useParams();
  const { museumsData, plansData } = useAdminContext();
  const { museums, updateMuseum, isLoading, error } = museumsData;
  const { plans } = plansData;
  const navigate = useNavigate();
  const { language } = useLang(); // Get the current language
  const isHebrew = language === "he"; // Check if the language is Hebrew

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

  useEffect(() => {
    const selectedMuseum = museums.find((museum) => museum._id === id);
    if (selectedMuseum) {
      setValue("status", selectedMuseum.status);
      setValue("plan", selectedMuseum.plan._id); // Set the plan ID in the form
    }
  }, [museums, id, setValue]);

  const onSubmit = async (data) => {
    await updateMuseum(id, { status: data.status, plan: data.plan });
    navigate("/admin/museums");
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-semibold">
          {isHebrew ? "טוען..." : "Loading..."}
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-red-500" : "bg-white text-red-500"
        }`}
      >
        <h1 className="text-2xl font-semibold">
          {isHebrew ? `שגיאה: ${error}` : `Error: ${error}`}
        </h1>
      </div>
    );
  }

  const museum = museums.find((museum) => museum._id === id);

  const museumUrl = `https://mensch-visitors.vercel.app/?museumName=${encodeURIComponent(museum?.name)}&password=${encodeURIComponent(museum?.password)}`;

  return (
    <div>
      <h3
        className={`text-2xl font-semibold mt-5 text-center ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {isHebrew ? "ערוך מוזיאון" : "Edit Museum"}
      </h3>
      <a
        href={museumUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${
          isDarkMode
            ? "text-blue-400 hover:text-blue-500 underline block text-center mt-2"
            : "text-blue-600 hover:text-blue-800 underline block text-center mt-2"
        }`}
      >
        {isHebrew ? "בקר במוזיאון" : "Visit the museum"}
      </a>
      {museum && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mx-auto space-y-6"
        >
          {/* Name Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="name"
            >
              {isHebrew ? "שם" : "Name"}
            </label>
            <input
              type="text"
              value={museum.name}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Address Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="address"
            >
              {isHebrew ? "כתובת" : "Address"}
            </label>
            <input
              type="text"
              value={museum.address}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* City Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="city"
            >
              {isHebrew ? "עיר" : "City"}
            </label>
            <input
              type="text"
              value={museum.city}
              readOnly
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Plan Selection */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="plan"
            >
              {isHebrew ? "תוכנית" : "Plan"}
            </label>
            <select
              {...register("plan")}
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            >
              {plans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name} ({plan.exhibitions}, {plan.artworks})
                </option>
              ))}
            </select>
          </div>

          {/* Status Selection */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="status"
            >
              {isHebrew ? "סטטוס" : "Status"}
            </label>
            <select
              {...register("status")}
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
            >
              <option value="open">{isHebrew ? "פתוח" : "Open"}</option>
              <option value="closed">{isHebrew ? "סגור" : "Closed"}</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex  items-center">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-4 py-2 mr-3 rounded-md shadow ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              } transition-colors duration-300`}
            >
              {isHebrew ? "חזור" : "Back"}
            </button>

            {/* Save Changes Button */}
            <FormConfirmButton
              buttonText={isHebrew ? "שמור שינויים" : "Save Changes"}
              onSubmit={handleSubmit(onSubmit)}
              dialogMessage={
                isHebrew
                  ? "האם אתה בטוח שברצונך לשנות את פרטי המוזיאון?"
                  : "Are you sure you want to edit the museum's details?"
              }
              isDarkMode={isDarkMode} // Pass isDarkMode as a prop for styling
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminEditMuseum;
