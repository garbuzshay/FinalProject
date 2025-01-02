// import React, { useEffect, useState, useRef } from "react";

// const SmartAudioPlayer = ({ audioUrl, isDarkMode, t }) => {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const audioRef = useRef(null);
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//   useEffect(() => {
//     let isMounted = true;
//     const currentAudioElement = audioRef.current;

//     const setupAudio = () => {
//       if (!audioUrl) {
//         setError(t?.errorAccessMic || "Audio URL is not provided.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setError("");

//         if (isMounted && currentAudioElement) {
//           currentAudioElement.src = audioUrl;

//           if (isIOS) {
//             // iOS requires user interaction to play audio
//             const enablePlayback = () => {
//               currentAudioElement
//                 .play()
//                 .catch((err) => console.warn("Playback error on iOS:", err.message));
//               document.removeEventListener("click", enablePlayback);
//             };
//             document.addEventListener("click", enablePlayback);
//           }
//         }
//       } catch (err) {
//         console.error("Error setting up audio:", err.message);
//         if (isMounted) {
//           setError(
//             t?.errorAccessMic ||
//               `Failed to load audio. Error: ${err.message || "Unknown error"}`
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     setupAudio();

//     return () => {
//       isMounted = false;

//       // Clean up audio element
//       if (currentAudioElement) {
//         currentAudioElement.pause();
//         currentAudioElement.src = "";
//         currentAudioElement.load();
//       }
//     };
//   }, [audioUrl, isIOS, t]);

//   const handleLoadedData = () => {
//     setIsLoading(false);
//     setError("");
//   };

//   const handleError = () => {
//     setError(t?.errorAccessMic || "Failed to load audio. Please try again.");
//     setIsLoading(false);
//   };

//   return (
//     <div className="mb-4 text-center">
//       {error && <p className="text-red-500 font-bold">{error}</p>}
//       {isLoading && !error && (
//         <p className={`font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//           Loading audio...
//         </p>
//       )}
//       {!error && (
//         <>
//           <p className={`font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//             {t?.existingAudio}
//           </p>
//           <audio
//             ref={audioRef}
//             controls
//             className="mt-2 mx-auto"
//             onLoadedData={handleLoadedData}
//             onError={handleError}
//             playsInline
//           >
//             Your browser does not support the audio element.
//           </audio>
//         </>
//       )}
//     </div>
//   );
// };

// export default SmartAudioPlayer;

import React, { useEffect, useState, useRef } from "react";

const SmartAudioPlayer = ({ audioUrl, isDarkMode, t }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    let isMounted = true;
    const currentAudioElement = audioRef.current;

    const setupAudio = () => {
      if (!audioUrl) {
        setError(t?.errorAccessMic || "Audio URL is not provided.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        if (isMounted && currentAudioElement) {
          currentAudioElement.src = audioUrl;
        }
      } catch (err) {
        console.error("Error setting up audio:", err.message);
        if (isMounted) {
          setError(
            t?.errorAccessMic ||
              `Failed to load audio. Error: ${err.message || "Unknown error"}`
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    setupAudio();

    return () => {
      isMounted = false;

      // Clean up audio element
      if (currentAudioElement) {
        currentAudioElement.pause();
        currentAudioElement.src = "";
        currentAudioElement.load();
      }
    };
  }, [audioUrl, isIOS, setIsPlaying, t]);

  const handleLoadedData = () => {
    setIsLoading(false);
    setError("");
  };

  const handleError = () => {
    setError(t?.errorAccessMic || "Failed to load audio. Please try again.");
    setIsLoading(false);
  };

  return (
    <div className="mb-4 text-center">
      {error && <p className="text-red-500 font-bold">{error}</p>}
      {isLoading && !error && (
        <p
          className={`font-bold ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Loading audio...
        </p>
      )}
      {!error && (
        <>
          <p
            className={`font-bold ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t?.existingAudio}
          </p>
          <audio
            ref={audioRef}
            controls
            className="mt-2 mx-auto"
            onLoadedData={handleLoadedData}
            onError={handleError}
            playsInline
          >
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </div>
  );
};

export default SmartAudioPlayer;
