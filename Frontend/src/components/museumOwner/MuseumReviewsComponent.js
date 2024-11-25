import React from "react";
import useMuseumReviews from "../../hooks/useMuseumReviews";
import { Star, Loader2 } from "lucide-react";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext"; // Import Lang Context


const MuseumReviewsComponent = ({ museumId }) => {
  const { reviews, loading } = useMuseumReviews(museumId);
  const { isDarkMode } = useThemeMode();
  const { language } = useLang(); // Get current language
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  const translations = {
    en: {
      museumRating: "Museum Rating",
      exhibitionRating: "Exhibition Rating",
      noReviews: "No reviews available yet.",
      review: "review",
      reviews: "reviews",
      exhibition: "exhibition",
      exhibitions: "exhibitions",
    },
    he: {
      museumRating: "דירוג מוזיאון",
      exhibitionRating: "דירוג תערוכה",
      noReviews: "עדיין אין ביקורות.",
      review: "ביקורת",
      reviews: "ביקורות",
      exhibition: "תערוכה",
      exhibitions: "תערוכות",
    },
  };

  const t = translations[language];


  const museumScores = reviews?.museumScores || [];
  const totalMuseumScores = museumScores.length;
  const averageMuseumScore = totalMuseumScores
    ? (
        museumScores.reduce((sum, score) => sum + score, 0) / totalMuseumScores
      ).toFixed(2)
    : "N/A";

  const renderStars = (score) => {
    const starCount = Math.round(parseFloat(score));
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < starCount
                ? "text-yellow-400 fill-current"
                : isDarkMode
                ? "text-gray-600"
                : "text-gray-300"
            }`}
          />
        ))}
        <span
          className={`ml-2 text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          ({score})
        </span>
      </div>
    );
  };

  return  (
    <div className="mx-auto pb-6 space-y-8" dir={language === "he" ? "rtl" : "ltr"}>
      <div className="space-y-3">
        <h2
          className={`text-lg font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {t.museumRating} ({totalMuseumScores}{" "}
          {totalMuseumScores === 1 ? t.review : t.reviews})
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}
          >
            {renderStars(averageMuseumScore)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2
          className={`text-lg font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {t.exhibitionRating} ({reviews?.exhibitions?.length || 0}{" "}
          {reviews?.exhibitions?.length === 1 ? t.exhibition : t.exhibitions})
        </h2>
        {reviews && reviews.exhibitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.exhibitions.map((exhibition) => {
              const { exhibitionScores } = exhibition;
              const totalExhibitionScores = exhibitionScores.length;
              const averageExhibitionScore = totalExhibitionScores
                ? (
                    exhibitionScores.reduce((sum, score) => sum + score, 0) /
                    totalExhibitionScores
                  ).toFixed(2)
                : "N/A";

              return (
                <div
                key={exhibition.exhibitionId}
                dir={language === "he" ? "rtl" : "ltr"} // Dynamically set text direction
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200`}
              >

                  <h3
                    className={`text-md font-semibold ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    } mb-4`}
                  >
                    {exhibition.exhibitionId.name.charAt(0).toUpperCase() +
                      exhibition.exhibitionId.name.slice(1)}{" "}
                    ({totalExhibitionScores}{" "}
                    {totalExhibitionScores === 1 ? t.review : t.reviews})
                  </h3>
                  {renderStars(averageExhibitionScore)}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            } rounded-lg p-8 text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <p className="text-lg">{t.noReviews}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumReviewsComponent;