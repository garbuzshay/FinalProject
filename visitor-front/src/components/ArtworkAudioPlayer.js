// // ArtworkAudioPlayer.js
// import React, { useEffect, useState } from "react";

// const ArtworkAudioPlayer = ({ audioUrl }) => {
//   const [audioObj, setAudioObj] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Initialize a new Audio object whenever audioUrl changes
//   useEffect(() => {
//     if (!audioUrl) return; // no audio to play

//     const newAudio = new Audio(audioUrl);
//     setAudioObj(newAudio);

//     // Cleanup: pause and unload the audio when unmounted or url changes
//     return () => {
//       newAudio.pause();
//       newAudio.src = "";
//     };
//   }, [audioUrl]);

//   const handlePlay = () => {
//     if (!audioObj) return;
//     audioObj.play().catch((err) => console.error("Play error:", err));
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     if (!audioObj) return;
//     audioObj.pause();
//     setIsPlaying(false);
//   };

//   const handleStop = () => {
//     if (!audioObj) return;
//     audioObj.pause();
//     audioObj.currentTime = 0; // reset to start
//     setIsPlaying(false);
//   };

//   if (!audioUrl) return null; // No audio, no player

//   return (
//     <div className=" p-2 border border-gray-300 rounded-md">
//       <p className="text-lg font-semibold mb-2">The story of the exhibition curator</p>
//       <div className="flex gap-2">
//         {/* Show Play if NOT playing, otherwise show Pause */}
//         {!isPlaying ? (
//           <button
//             onClick={handlePlay}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
//           >
//             Play
//           </button>
//         ) : (
//           <button
//             onClick={handlePause}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded"
//           >
//             Pause
//           </button>
//         )}

//         <button
//           onClick={handleStop}
//           className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
//         >
//           Stop
//         </button>
//       </div>
//       {isPlaying && <p className="text-sm text-gray-600 mt-2">Playing...</p>}
//     </div>
//   );
// };

// export default ArtworkAudioPlayer;

// import React, { useEffect, useState } from "react";

// const ArtworkAudioPlayer = ({ audioUrl }) => {
//   const [audioObj, setAudioObj] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     if (!audioUrl) return;

//     const newAudio = new Audio(audioUrl);
//     setAudioObj(newAudio);

//     return () => {
//       newAudio.pause();
//       newAudio.src = "";
//     };
//   }, [audioUrl]);

//   const handlePlay = () => {
//     if (!audioObj) return;
//     audioObj.play().catch((err) => console.error("Play error:", err));
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     if (!audioObj) return;
//     audioObj.pause();
//     setIsPlaying(false);
//   };

//   const handleStop = () => {
//     if (!audioObj) return;
//     audioObj.pause();
//     audioObj.currentTime = 0;
//     setIsPlaying(false);
//   };

//   if (!audioUrl) return null;

//   return (
//     <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4 tracking-tight">
//         The story of the exhibition curator
//       </h3>
//       <div className="flex items-center gap-3">
//         {!isPlaying ? (
//           <button
//             onClick={handlePlay}
//             className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white font-medium transition-all duration-300 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-md active:shadow-sm transform active:scale-95"
//           >
//             Play
//           </button>
//         ) : (
//           <button
//             onClick={handlePause}
//             className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white font-medium transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 shadow-md active:shadow-sm transform active:scale-95"
//           >
//             Pause
//           </button>
//         )}

//         <button
//           onClick={handleStop}
//           className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white font-medium transition-all duration-300 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg hover:from-rose-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 shadow-md active:shadow-sm transform active:scale-95"
//         >
//           Stop
//         </button>
//       </div>
//       {isPlaying && (
//         <div className="mt-4 flex items-center gap-2">
//           <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
//           <span className="text-sm text-gray-600 font-medium">Playing...</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArtworkAudioPlayer;

import React, { useEffect, useState } from "react";

const ArtworkAudioPlayer = ({ audioUrl }) => {
  const [audioObj, setAudioObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioUrl) return;

    const newAudio = new Audio(audioUrl);
    setAudioObj(newAudio);

    // When the audio ends naturally, reset isPlaying to false
    const handleEnded = () => {
      setIsPlaying(false);
    };
    newAudio.addEventListener("ended", handleEnded);

    // Cleanup: pause and unload the audio, remove the event listener
    return () => {
      newAudio.removeEventListener("ended", handleEnded);
      newAudio.pause();
      newAudio.src = "";
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (!audioObj) return;
    audioObj.play().catch((err) => console.error("Play error:", err));
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!audioObj) return;
    audioObj.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!audioObj) return;
    audioObj.pause();
    audioObj.currentTime = 0;
    setIsPlaying(false);
  };

  if (!audioUrl) return null;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50  rounded-xl  ">
      <h3 className="font-bold text-lg mb-2">
        To hear the curator's commentary, press 'Play'
      </h3>
      <div className="flex  items-center gap-3">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white font-medium transition-all duration-300 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-md active:shadow-sm transform active:scale-95"
          >
            Play
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white font-medium transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 shadow-md active:shadow-sm transform active:scale-95"
          >
            Pause
          </button>
        )}

        {isPlaying && (
          <button
            onClick={handleStop}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white font-medium transition-all duration-300 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg hover:from-rose-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 shadow-md active:shadow-sm transform active:scale-95"
          >
            Stop
          </button>
        )}
      </div>
      {isPlaying && (
        <div className="mt-4 flex  items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 font-medium">Playing...</span>
        </div>
      )}
    </div>
  );
};

export default ArtworkAudioPlayer;
