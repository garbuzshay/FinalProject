import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMuseumContext } from "../../contexts/MuseumContext";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
import { useLang } from "../../contexts/LangContext"; // Import Lang Context
import FormConfirmButton from "../common/FormConfirmButton";
import { useNavigate } from "react-router-dom";
import QRCodeGenerator from "./QRCodeGenerator";

const MuseumOwnerEditDetails = () => {
  const { museum, updateMuseumDetails } = useMuseumContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const imageUrl = watch("imageUrl", museum?.imageUrl || "");
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
  const { language } = useLang(); // Get current language
  const isHebrew = language === "he"; // Check if the current language is Hebrew

  // Translation object for both English and Hebrew
  const translations = {
    en: {
      editDetailsTitle: "Edit Museum Details",
      visitMuseum: "Visit your museum",
      museumName: "Museum Name",
      address: "Address",
      city: "City",
      state: "State",
      zipcode: "Zipcode",
      phoneNumber: "Phone Number",
      email: "Email",
      imageUrl: "Image URL",
      password: "Password",
      generatePassword: "Generate Password",
      saveChanges: "Save Changes",
      confirmationMessage: "Are you sure you want to save these changes?",
      requiredField: "This field is required",
      invalidImageUrl: "Invalid Image URL",
      plan: "Plan",
      exhibitions: "Exhibitions", // New translation for exhibitions
      artworks: "Artworks", // New translation for artworks
    },
    he: {
      editDetailsTitle: "ערוך פרטי מוזיאון",
      visitMuseum: "בקר במוזיאון שלך",
      museumName: "שם המוזיאון",
      address: "כתובת",
      city: "עיר",
      state: "מדינה",
      zipcode: "מיקוד",
      phoneNumber: "מספר טלפון",
      email: "אימייל",
      imageUrl: "כתובת תמונה",
      password: "סיסמה",
      generatePassword: "צור סיסמה",
      saveChanges: "שמור שינויים",
      confirmationMessage: "האם אתה בטוח שברצונך לשמור את השינויים?",
      requiredField: "שדה זה הוא חובה",
      invalidImageUrl: "כתובת תמונה לא חוקית",
      plan: "חבילה",
      exhibitions: "תערוכות", // New translation for exhibitions
      artworks: "יצירות אמנות", // New translation for artworks
    },
  };

  const t = translations[language]; // Select the correct translation based on the current language

  useEffect(() => {
    if (museum) {
      for (const key in museum) {
        setValue(key, museum[key]);
      }
    }
  }, [museum, setValue]);

  const onSubmit = (data) => {
    updateMuseumDetails(data);
    setTimeout(() => {
      navigate("/owner");
    }, 1000); // 1 second delay
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setValue("password", randomPassword);
  };

  // const museumUrl = `https://mensch-visitors.vercel.app/${encodeURIComponent(
  //   museum?.name
  // )}`;

  const museumUrl = `https://mensch-visitors.vercel.app/?museumName=${encodeURIComponent(
    museum?.name
  )}&password=${encodeURIComponent(museum?.password)}`;
  // const museumUrl = `http://localhost:3001/?museumName=${encodeURIComponent(museum?.name)}&password=${encodeURIComponent(museum?.password)}`;

  return (
    <div
      className={`container mx-auto my-8 min-h-screen transition-colors duration-300 ${
        isHebrew ? "rtl" : "ltr"
      }`}
    >
      <div dir={isHebrew ? "rtl" : "ltr"}>
        {" "}
        {/* Maintain text direction */}
        <h1
          className={`text-4xl font-poppins font-bold tracking-wide mb-6 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {t.editDetailsTitle}
        </h1>
        <a
          href={museumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            isDarkMode
              ? "text-blue-400 hover:text-blue-500 underline block text-center mb-4"
              : "text-blue-600 hover:text-blue-800 underline block text-center mb-4"
          }`}
        >
          {t.visitMuseum}
        </a>
       
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="name"
              >
                {t.museumName}
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                defaultValue={museum?.name}
                readOnly
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

            {/* Address */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="address"
              >
                {t.address}
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                defaultValue={museum?.address}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="city"
              >
                {t.city}
              </label>
              <input
                type="text"
                {...register("city", { required: true })}
                defaultValue={museum?.city}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="state"
              >
                {t.state}
              </label>
              <input
                type="text"
                {...register("state", { required: true })}
                defaultValue={museum?.state}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>

            {/* Zipcode */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="zipcode"
              >
                {t.zipcode}
              </label>
              <input
                type="text"
                {...register("zipcode", { required: true })}
                defaultValue={museum?.zipcode}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.zipcode && (
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
                defaultValue={museum?.phoneNumber}
                readOnly
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

            {/* Email */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="email"
              >
                {t.email}
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                defaultValue={museum?.email}
                readOnly
                className={`my-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
              )}
            </div>
            {/* Plan */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="plan"
              >
                {t.plan}
              </label>
              <input
                type="text"
                value={
                  isHebrew
                    ? `${museum?.plan?.name || ""}\n - ${t.exhibitions} ${
                        museum?.plan?.maxExhibitions || 0
                      }, ${t.artworks} ${museum?.plan?.maxArtWorks || 0}`
                    : `${museum?.plan?.name || ""}\n - ${
                        museum?.plan?.maxExhibitions || 0
                      } ${t.exhibitions}, ${museum?.plan?.maxArtWorks || 0} ${
                        t.artworks
                      }`
                }
                readOnly
                className={`mt-2 w-full text-sm p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
            </div>
          </div>

          {/* Image URL and Preview */}
          <div className="mb-6">
            <label
              className={`block text-lg font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="imageUrl"
            >
              {t.imageUrl}
            </label>
            <div
              className={`flex items-center space-x-4 ${
                isHebrew ? "space-x-reverse" : ""
              } mt-2`}
            >
              <input
                type="text"
                {...register("imageUrl")}
                defaultValue={museum?.imageUrl}
                className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Current"
                  className="w-20 h-20 object-cover rounded-md shadow-lg"
                />
              )}
            </div>
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{t.invalidImageUrl}</p>
            )}
          </div>

          {/* Password and Generate Button */}
          <div className="mb-6">
            <label
              className={`block text-lg font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="password"
            >
              {t.password}
            </label>
            <div
              className={`flex items-center space-x-4 ${
                isHebrew ? "space-x-reverse" : ""
              } mt-2`}
            >
              <input
                type="text"
                {...register("password")}
                defaultValue={museum?.password}
                className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={generateRandomPassword}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md ${
                  isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-500"
                } focus:outline-none focus:ring-2 transition-colors duration-300`}
              >
                {t.generatePassword}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>
            )}
          </div>

          {/* Form Confirm Button */}
          <FormConfirmButton
            onSubmit={handleSubmit(onSubmit)}
            buttonText={t.saveChanges}
            dialogMessage={t.confirmationMessage}
            isDarkMode={isDarkMode} // Pass isDarkMode as a prop for styling
          />
        </form>
         {/* QR Code */}
         <div className="flex justify-center mb-8">
          <QRCodeGenerator url={museumUrl} fileName={museum?.name} />
        </div>
      </div>
    </div>
  );
};

export default MuseumOwnerEditDetails;
