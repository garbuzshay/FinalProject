import React from "react";
import useMuseumReviews from "../../hooks/useMuseumReviews";
import { Star, Loader2 } from "lucide-react";

const MuseumReviewsComponent = ({ museumId }) => {
  const { reviews, loading } = useMuseumReviews(museumId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg">
//         <AlertCircle className="w-6 h-6 mr-2" />
//         <p>Error loading reviews: {error.message}</p>
//       </div>
//     );
//   }

  const museumScores = reviews?.museumScores || [];
  const totalMuseumScores = museumScores.length;
  const averageMuseumScore = totalMuseumScores
    ? (museumScores.reduce((sum, score) => sum + score, 0) / totalMuseumScores).toFixed(2)
    : "N/A";

  const renderStars = (score) => {
    const starCount = Math.round(parseFloat(score));
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < starCount ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({score})</span>
      </div>
    );
  };

  return (
    <div className="mx-auto pb-6 space-y-8">
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">
          Museum Rating ({totalMuseumScores} {totalMuseumScores === 1 ? "review" : "reviews"})
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            {renderStars(averageMuseumScore)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">
          Exhibition Rating ({reviews?.exhibitions?.length || 0} {reviews?.exhibitions?.length === 1 ? "exhibition" : "exhibitions"})
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
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 text-left"
                >
                  <h3 className="text-md font-semibold text-gray-800 mb-4">
                    {exhibition.exhibitionId.name} ({totalExhibitionScores} {totalExhibitionScores === 1 ? "review" : "reviews"})
                  </h3>
                  {renderStars(averageExhibitionScore)}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            <p className="text-lg">No reviews available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumReviewsComponent;