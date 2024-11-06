// // src/hooks/useTextToSpeech.js
// import { useState, useEffect } from "react";

// const useTextToSpeech = (text) => {
//   const [isPaused, setIsPaused] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [utterance, setUtterance] = useState(null);

//   useEffect(() => {
//     const synth = window.speechSynthesis;
//     const newUtterance = new SpeechSynthesisUtterance(text);
//     setUtterance(newUtterance);

//     // Cleanup on unmount or text change
//     return () => {
//       synth.cancel();
//       setIsPaused(false);
//       setIsPlaying(false);
//     };
//   }, [text]);

//   const play = () => {
//     const synth = window.speechSynthesis;
//     if (isPaused) {
//       synth.resume();
//     } else {
//       synth.speak(utterance);
//     }
//     setIsPlaying(true);
//     setIsPaused(false);
//   };

//   const pause = () => {
//     if (isPlaying) {
//       window.speechSynthesis.pause();
//       setIsPaused(true);
//       setIsPlaying(false);
//     }
//   };

//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setIsPaused(false);
//     setIsPlaying(false);
//   };

//   return { play, pause, stop, isPlaying, isPaused };
// };

// export default useTextToSpeech;


import { useState, useEffect } from 'react';

const useTextToSpeech = (text) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const newUtterance = new SpeechSynthesisUtterance(text);

    // Set up the utterance with the `onend` event listener
    newUtterance.onend = () => {
      setIsPlaying(false);  // Stop showing "Playing" when text is finished
    };

    setUtterance(newUtterance);

    // Cleanup on unmount or text change
    return () => {
      synth.cancel();
      setIsPaused(false);
      setIsPlaying(false);
    };
  }, [text]);

  const play = () => {
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utterance);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPaused(false);
    setIsPlaying(false);
  };

  return { play, pause, stop, isPlaying, isPaused };
};

export default useTextToSpeech;
