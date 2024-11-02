
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext"; // Import User Context
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
import { useLang } from "../../contexts/LangContext"; // Import Lang Context
import FormConfirmButton from "../common/FormConfirmButton";
import { useNavigate } from "react-router-dom";
import usersApi from "../../api/UsersApi"; // Import Users API

const CuratorEditInfo = () => {
  const { user, loading, setUser } = useUserContext(); // Access user data and setUser to update context
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeMode();
  const { language } = useLang();
  const isHebrew = language === "he";

  // Translation object for both English and Hebrew
  const translations = {
    en: {
      editInfoTitle: "Edit Your Information",
      firstName: "First Name",
      lastName: "Last Name",
      phoneNumber: "Phone Number",
      saveChanges: "Save Changes",
      confirmationMessage: "Are you sure you want to save these changes?",
      requiredField: "This field is required",
    },
    he: {
      editInfoTitle: "ערוך את המידע שלך",
      firstName: "שם פרטי",
      lastName: "שם משפחה",
      phoneNumber: "מספר טלפון",
      saveChanges: "שמור שינויים",
      confirmationMessage: "האם אתה בטוח שברצונך לשמור את השינויים?",
      requiredField: "שדה זה הוא חובה",
    },
  };

  const t = translations[language];

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("lastName", user.lastName);
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [user, setValue]);
  const onSubmit = async (data) => {
    try {
      await usersApi.updateUser(user._id, data); // Update user info in the database
      // Refetch updated user info
      const updatedUser = await usersApi.getCurrentUser();
      setUser(updatedUser); // Update context with the refetched data
      navigate("/curator");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update user information. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`container mx-auto my-8  transition-colors duration-300 ${
        isHebrew ? "rtl" : "ltr"
      }`}
    >
      <div dir={isHebrew ? "rtl" : "ltr"}>
        <h1
          className={`text-4xl font-poppins font-bold tracking-wide mb-6 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {t.editInfoTitle}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 gap-6">
            {/* First Name */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="firstName"
              >
                {t.firstName}
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="lastName"
              >
                {t.lastName}
              </label>
              <input
                type="text"
                {...register("lastName", { required: true })}
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="phoneNumber"
              >
                {t.phoneNumber}
              </label>
              <input
                type="text"
                {...register("phoneNumber", { required: true })}
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>
          </div>

          {/* Form Confirm Button */}
          <FormConfirmButton
            onSubmit={handleSubmit(onSubmit)}
            buttonText={t.saveChanges}
            dialogMessage={t.confirmationMessage}
            isDarkMode={isDarkMode}
          />
        </form>
      </div>
    </div>
  );
};

export default CuratorEditInfo;
