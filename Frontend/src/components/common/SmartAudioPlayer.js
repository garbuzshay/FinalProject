// import React, { useEffect, useState } from "react";

// const SmartAudioPlayer = ({ audioUrl, isDarkMode, t }) => {
//   const [processedAudioUrl, setProcessedAudioUrl] = useState(audioUrl);
//   const [error, setError] = useState("");
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//   useEffect(() => {
//     const convertAudioToWav = async (url) => {
//       try {
//         // Fetch the original audio file
//         const response = await fetch(url);
//         const arrayBuffer = await response.arrayBuffer();

//         // Decode audio data
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

//         // Create offline context for rendering
//         const offlineContext = new OfflineAudioContext(
//           audioBuffer.numberOfChannels,
//           audioBuffer.length,
//           audioBuffer.sampleRate
//         );

//         // Create buffer source and render to WAV
//         const source = offlineContext.createBufferSource();
//         source.buffer = audioBuffer;
//         source.connect(offlineContext.destination);
//         source.start();

//         const renderedBuffer = await offlineContext.startRendering();
//         const wavBlob = audioBufferToWav(renderedBuffer);
//         const wavUrl = URL.createObjectURL(wavBlob);

//         setProcessedAudioUrl(wavUrl);
//       } catch (err) {
//         console.error("Error converting audio to WAV:", err);
//         setError(t.errorAccessMic || "Failed to process audio.");
//       }
//     };

//     // Check if the device is iOS and apply conversion if needed
//     if (isIOS && audioUrl) {
//       convertAudioToWav(audioUrl);
//     }
//   }, [audioUrl, isIOS, t]);

//   // Helper function to convert AudioBuffer to WAV format
//   const audioBufferToWav = (buffer) => {
//     const numChannels = buffer.numberOfChannels;
//     const sampleRate = buffer.sampleRate;
//     const format = 1; // PCM
//     const bitDepth = 16;

//     const bytesPerSample = bitDepth / 8;
//     const blockAlign = numChannels * bytesPerSample;

//     const wav = new ArrayBuffer(44 + buffer.length * bytesPerSample);
//     const view = new DataView(wav);

//     // Write WAV header
//     const writeString = (view, offset, string) => {
//       for (let i = 0; i < string.length; i++) {
//         view.setUint8(offset + i, string.charCodeAt(i));
//       }
//     };

//     writeString(view, 0, "RIFF");
//     view.setUint32(4, 36 + buffer.length * bytesPerSample, true);
//     writeString(view, 8, "WAVE");
//     writeString(view, 12, "fmt ");
//     view.setUint32(16, 16, true);
//     view.setUint16(20, format, true);
//     view.setUint16(22, numChannels, true);
//     view.setUint32(24, sampleRate, true);
//     view.setUint32(28, sampleRate * blockAlign, true);
//     view.setUint16(32, blockAlign, true);
//     view.setUint16(34, bitDepth, true);
//     writeString(view, 36, "data");
//     view.setUint32(40, buffer.length * bytesPerSample, true);

//     const channels = [];
//     for (let i = 0; i < numChannels; i++) {
//       channels.push(buffer.getChannelData(i));
//     }

//     let offset = 44;
//     for (let i = 0; i < buffer.length; i++) {
//       for (let channel = 0; channel < numChannels; channel++) {
//         const sample = Math.max(-1, Math.min(1, channels[channel][i]));
//         view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
//         offset += 2;
//       }
//     }

//     return new Blob([wav], { type: "audio/wav" });
//   };

//   return (
//     <div className="mb-4 text-center font-bold">
//       {error && (
//         <p className="text-red-500">{error}</p>
//       )}
//       {!error && processedAudioUrl && (
//         <>
//           <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
//             {t.existingAudio}
//           </p>
//           <audio controls src={processedAudioUrl} className="mt-2 mx-auto">
//             Your browser does not support the audio element.
//           </audio>
//         </>
//       )}
//     </div>
//   );
// };

// export default SmartAudioPlayer;


// import React, { useEffect, useState } from "react";

// const SmartAudioPlayer = ({ audioUrl, isDarkMode, t }) => {
//   const [processedAudioUrl, setProcessedAudioUrl] = useState(audioUrl);
//   const [error, setError] = useState("");
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//   useEffect(() => {
//     const convertAudioToWav = async (url) => {
//       try {
//         // Fetch the original audio file
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch audio file: ${response.statusText}`);
//         }

//         const arrayBuffer = await response.arrayBuffer();

//         // Decode audio data
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

//         // Create offline context for rendering
//         const offlineContext = new OfflineAudioContext(
//           audioBuffer.numberOfChannels,
//           audioBuffer.length,
//           audioBuffer.sampleRate
//         );

//         // Create buffer source and render to WAV
//         const source = offlineContext.createBufferSource();
//         source.buffer = audioBuffer;
//         source.connect(offlineContext.destination);
//         source.start();

//         const renderedBuffer = await offlineContext.startRendering();
//         const wavBlob = audioBufferToWav(renderedBuffer);
//         const wavUrl = URL.createObjectURL(wavBlob);

//         setProcessedAudioUrl(wavUrl);
//       } catch (err) {
//         console.error("Error converting audio to WAV:", err);
//         setError(t.errorAccessMic || "Failed to process audio. Please try again.");
//       }
//     };

//     // Check if the device is iOS and apply conversion if needed
//     if (isIOS && audioUrl) {
//       convertAudioToWav(audioUrl);
//     }
//   }, [audioUrl, isIOS, t]);

//   // Helper function to convert AudioBuffer to WAV format
//   const audioBufferToWav = (buffer) => {
//     const numChannels = buffer.numberOfChannels;
//     const sampleRate = buffer.sampleRate;
//     const format = 1; // PCM
//     const bitDepth = 16;

//     const bytesPerSample = bitDepth / 8;
//     const blockAlign = numChannels * bytesPerSample;

//     const wav = new ArrayBuffer(44 + buffer.length * bytesPerSample);
//     const view = new DataView(wav);

//     // Write WAV header
//     const writeString = (view, offset, string) => {
//       for (let i = 0; i < string.length; i++) {
//         view.setUint8(offset + i, string.charCodeAt(i));
//       }
//     };

//     writeString(view, 0, "RIFF");
//     view.setUint32(4, 36 + buffer.length * bytesPerSample, true);
//     writeString(view, 8, "WAVE");
//     writeString(view, 12, "fmt ");
//     view.setUint32(16, 16, true);
//     view.setUint16(20, format, true);
//     view.setUint16(22, numChannels, true);
//     view.setUint32(24, sampleRate, true);
//     view.setUint32(28, sampleRate * blockAlign, true);
//     view.setUint16(32, blockAlign, true);
//     view.setUint16(34, bitDepth, true);
//     writeString(view, 36, "data");
//     view.setUint32(40, buffer.length * bytesPerSample, true);

//     const channels = [];
//     for (let i = 0; i < numChannels; i++) {
//       channels.push(buffer.getChannelData(i));
//     }

//     let offset = 44;
//     for (let i = 0; i < buffer.length; i++) {
//       for (let channel = 0; channel < numChannels; channel++) {
//         const sample = Math.max(-1, Math.min(1, channels[channel][i]));
//         view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
//         offset += 2;
//       }
//     }

//     return new Blob([wav], { type: "audio/wav" });
//   };

//   return (
//     <div className="mb-4 text-center font-bold">
//       {error && (
//         <p className="text-red-500">{error}</p>
//       )}
//       {!error && processedAudioUrl && (
//         <>
//           <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
//             {t.existingAudio}
//           </p>
//           <audio controls src={processedAudioUrl} className="mt-2 mx-auto">
//             Your browser does not support the audio element.
//           </audio>
//         </>
//       )}
//     </div>
//   );
// };

// export default SmartAudioPlayer;

// import React, { useEffect, useState, useRef } from "react";

// const SmartAudioPlayer = ({ audioUrl, isDarkMode, t }) => {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const audioRef = useRef(null);
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//   useEffect(() => {
//     // Capture the current audio element at the start of the effect
//     const audioElement = audioRef.current;
//     let isMounted = true;
//     let objectUrl = null;

//     const setupAudio = async () => {
//       if (!audioElement) return;

//       try {
//         setIsLoading(true);
//         setError("");

//         if (isIOS) {
//           const response = await fetch(audioUrl);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
          
//           const blob = await response.blob();
//           objectUrl = URL.createObjectURL(
//             new Blob([blob], { type: 'audio/mpeg' })
//           );
          
//           if (isMounted) {
//             audioElement.src = objectUrl;
//           }
//         } else {
//           if (isMounted) {
//             audioElement.src = audioUrl;
//           }
//         }
//       } catch (err) {
//         console.error("Error setting up audio:", err);
//         if (isMounted) {
//           setError(t?.errorAccessMic || "Failed to load audio. Please try again.");
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     if (audioUrl) {
//       setupAudio();
//     }

//     // Cleanup function using the captured audioElement
//     return () => {
//       isMounted = false;
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl);
//       }
//       if (audioElement) {
//         audioElement.src = "";
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
//       {error && (
//         <p className="text-red-500 font-bold">{error}</p>
//       )}
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
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const currentAudioElement = audioRef.current;
    let isMounted = true;

    const setupAudio = async () => {
      if (!currentAudioElement) return;

      try {
        setIsLoading(true);
        setError("");

        // Clean up any existing objectUrl
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }

        if (isIOS) {
          const response = await fetch(audioUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const blob = await response.blob();
          const newObjectUrl = URL.createObjectURL(
            new Blob([blob], { type: 'audio/mpeg' })
          );
          
          objectUrlRef.current = newObjectUrl;
          
          if (isMounted && currentAudioElement) {
            currentAudioElement.src = newObjectUrl;
          }
        } else {
          if (isMounted && currentAudioElement) {
            currentAudioElement.src = audioUrl;
          }
        }
      } catch (err) {
        console.error("Error setting up audio:", err);
        if (isMounted) {
          setError(t?.errorAccessMic || "Failed to load audio. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (audioUrl) {
      setupAudio();
    }

    // Cleanup function
    return () => {
      isMounted = false;

      // Clean up object URL if it exists
      const currentObjectUrl = objectUrlRef.current;
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
        objectUrlRef.current = null;
      }

      // Clean up audio element
      if (currentAudioElement) {
        currentAudioElement.pause();
        currentAudioElement.src = "";
        currentAudioElement.load();
      }
    };
  }, [audioUrl, isIOS, t]);

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
      {error && (
        <p className="text-red-500 font-bold">{error}</p>
      )}
      {isLoading && !error && (
        <p className={`font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Loading audio...
        </p>
      )}
      {!error && (
        <>
          <p className={`font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
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