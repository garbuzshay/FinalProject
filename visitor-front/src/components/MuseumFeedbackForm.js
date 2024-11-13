import React, { useState } from "react";
import { useMuseum } from "../contexts/MuseumContext";
import useFeedback from "../hooks/useFeedback";

// Custom Button Component
const Button = ({ type, children, disabled }) => (
  <button
    type={type}
    disabled={disabled}
    className={`w-full py-2 px-4 ${
      disabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
    } text-white font-semibold rounded-lg transition`}
  >
    {children}
  </button>
);

// Custom Rating Component
const Rating = ({ value, onValueChange, max = 5 }) => (
  <div className="flex">
    {[...Array(max)].map((_, i) => (
      <svg
        key={i}
        onClick={() => onValueChange(i + 1)}
        className={`w-6 h-6 cursor-pointer ${
          i < value ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27l5.18 3.04-1.64-6.82L21 9.24l-7.19-.61L12 2.5 10.19 8.63 3 9.24l5.46 4.25-1.63 6.82L12 17.27z" />
      </svg>
    ))}
  </div>
);

export default function MuseumFeedbackForm({ onSubmit }) {
  const { museumData, exhibitions } = useMuseum();
  const { submitFeedback, loading } = useFeedback(museumData?._id);
  
  const [exhibitionRatings, setExhibitionRatings] = useState(
    exhibitions.reduce((acc, exhibition) => ({
      ...acc,
      [exhibition._id]: 0
    }), {})
  );
  const [overallRating, setOverallRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleExhibitionRating = (exhibitionId, rating) => {
    setExhibitionRatings(prev => ({
      ...prev,
      [exhibitionId]: rating
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await submitFeedback(overallRating, exhibitionRatings);
    
    if (success) {
      setShowThankYou(true);
      
      // Reset form
      setExhibitionRatings(
        exhibitions.reduce((acc, exhibition) => ({
          ...acc,
          [exhibition._id]: 0
        }), {})
      );
      setOverallRating(0);

      // Trigger logout after delay
      setTimeout(() => {
        setShowThankYou(false);
        if (onSubmit) onSubmit();
      }, 1500);
    }
  };

  const isFormValid = overallRating > 0 && 
    Object.values(exhibitionRatings).some(rating => rating > 0);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-2xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md"
    >
      {showThankYou ? (
        <p className="text-center text-lg font-semibold">
          Thank you for your feedback!
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">
            Museum Visit Feedback
          </h2>
          {museumData && (
            <p className="text-center text-lg font-medium text-gray-700 mb-6">
              {museumData.name}
            </p>
          )}

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Exhibition Ratings</h3>
            {exhibitions.map((exhibition) => (
              <div
                key={exhibition._id}
                className="flex items-center text-left justify-between"
              >
                <span className="text-sm font-medium">{exhibition.name}</span>
                <Rating
                  value={exhibitionRatings[exhibition._id]}
                  onValueChange={(value) =>
                    handleExhibitionRating(exhibition._id, value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Overall Museum Experience</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-left font-medium">
                Rate your overall experience
              </span>
              <Rating value={overallRating} onValueChange={setOverallRating} />
            </div>
          </div>

          <Button type="submit" disabled={loading || !isFormValid}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </>
      )}
    </form>
  );
}