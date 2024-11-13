import React, { useState } from "react";
import { useMuseum } from "../contexts/MuseumContext";

// Custom Button Component
const Button = ({ type, children }) => (
  <button
    type={type}
    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
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
  const [exhibitionRatings, setExhibitionRatings] = useState(
    exhibitions.reduce(
      (acc, exhibition) => ({ ...acc, [exhibition.name]: 0 }),
      {}
    )
  );
  const [overallRating, setOverallRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleExhibitionRating = (exhibition, rating) => {
    setExhibitionRatings((prev) => ({ ...prev, [exhibition]: rating }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted feedback");
    console.log(
      museumData.name,
      "ID:",
      museumData._id,
      "Overall Experience Rating:",
      overallRating
    );

    exhibitions.forEach((exhibition) => {
      console.log(
        `${exhibition.name}, ID: ${exhibition._id}, Rating: ${
          exhibitionRatings[exhibition.name]
        }`
      );
    });

    // Display thank you message
    setShowThankYou(true);

    // Clear form values
    setExhibitionRatings(
      exhibitions.reduce(
        (acc, exhibition) => ({ ...acc, [exhibition.name]: 0 }),
        {}
      )
    );
    setOverallRating(0);

    // Log user out after a delay
    setTimeout(() => {
      setShowThankYou(false);
      onSubmit(); // Trigger logout after displaying thank you message
    }, 1500); // Adjust the delay as needed
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-2xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md"
    >
      {showThankYou ? (
        <p className="text-center text-lg font-semibold ">
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
                key={exhibition.name}
                className="flex items-center text-left justify-between"
              >
                <span className="text-sm font-medium">{exhibition.name}</span>
                <Rating
                  value={exhibitionRatings[exhibition.name]}
                  onValueChange={(value) =>
                    handleExhibitionRating(exhibition.name, value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Overall Museum Experience</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Rate your overall experience
              </span>
              <Rating value={overallRating} onValueChange={setOverallRating} />
            </div>
          </div>

          <Button type="submit">Submit Feedback</Button>
        </>
      )}
    </form>
  );
}
