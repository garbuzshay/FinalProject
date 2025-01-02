// import React, { useState, useRef } from "react";

// const AudioRecorder = ({ onAudioReady }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const mediaRecorderRef = useRef(null);
//   const audioPlayerRef = useRef(null);
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  
//   const handleStartRecording = async () => {
//     setErrorMessage("");
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       const chunks = [];
//       mediaRecorderRef.current.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const completeBlob = new Blob(chunks, { type: "audio/webm" });
//         setAudioBlob(completeBlob);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       stopPlayback();
//     } catch (err) {
//       setErrorMessage("Error: Could not access microphone.");
//       console.error(err);
//     }
//   };

//   const convertBlobForPlayback = async (originalBlob) => {
//     if (!isIOS) return originalBlob;

//     try {
//       // Create an audio context
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
//       // Convert blob to array buffer
//       const arrayBuffer = await originalBlob.arrayBuffer();
      
//       // Decode the audio data
//       const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
//       // Create offline context for rendering
//       const offlineContext = new OfflineAudioContext(
//         audioBuffer.numberOfChannels,
//         audioBuffer.length,
//         audioBuffer.sampleRate
//       );
      
//       // Create buffer source
//       const source = offlineContext.createBufferSource();
//       source.buffer = audioBuffer;
//       source.connect(offlineContext.destination);
//       source.start();
      
//       // Render audio
//       const renderedBuffer = await offlineContext.startRendering();
      
//       // Convert to WAV format
//       const wav = audioBufferToWav(renderedBuffer);
//       return new Blob([wav], { type: 'audio/wav' });
//     } catch (error) {
//       console.error('Error converting audio for playback:', error);
//       return originalBlob;
//     }
//   };

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
    
//     writeString(view, 0, 'RIFF');
//     view.setUint32(4, 36 + buffer.length * bytesPerSample, true);
//     writeString(view, 8, 'WAVE');
//     writeString(view, 12, 'fmt ');
//     view.setUint32(16, 16, true);
//     view.setUint16(20, format, true);
//     view.setUint16(22, numChannels, true);
//     view.setUint32(24, sampleRate, true);
//     view.setUint32(28, sampleRate * blockAlign, true);
//     view.setUint16(32, blockAlign, true);
//     view.setUint16(34, bitDepth, true);
//     writeString(view, 36, 'data');
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
    
//     return wav;
//   };

//   const handlePlay = async () => {
//     if (!audioBlob) return;
//     stopPlayback();
    
//     try {
//       // Convert blob for iOS if needed
//       const playableBlob = await convertBlobForPlayback(audioBlob);
//       const audioURL = URL.createObjectURL(playableBlob);
//       audioPlayerRef.current = new Audio(audioURL);
//       audioPlayerRef.current.onended = () => setIsPlaying(false);
      
//       await audioPlayerRef.current.play();
//       setIsPlaying(true);
//     } catch (err) {
//       setErrorMessage("Error playing audio.");
//       console.error(err);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const stopPlayback = () => {
//     if (audioPlayerRef.current) {
//       audioPlayerRef.current.pause();
//       audioPlayerRef.current.currentTime = 0;
//       audioPlayerRef.current = null;
//       setIsPlaying(false);
//     }
//   };

//   const handleDelete = () => {
//     stopPlayback();
//     setAudioBlob(null);
//     onAudioReady(null);
//   };

//   const handleSaveLocally = () => {
//     if (!audioBlob) {
//       alert("No recording available to save");
//       return;
//     }
//     onAudioReady(audioBlob);
//     alert("Audio is ready to be uploaded when you submit the form!");
//   };

//   return (
//     <div>
//       {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}

//       {!isRecording && (
//         <button
//           type="button" // Specify type to prevent form submission
//           onClick={handleStartRecording}
//           disabled={isPlaying}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
//         >
//           Start Recording
//         </button>
//       )}
//       {isRecording && (
//         <button
//           type="button" // Specify type to prevent form submission
//           onClick={handleStopRecording}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Stop Recording
//         </button>
//       )}

//       {audioBlob && !isRecording && (
//         <div className="mt-4 items-center mx-auto space-x-2">
//           {!isPlaying ? (
//             <button
//               type="button" // Specify type to prevent form submission
//               onClick={handlePlay}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Play
//             </button>
//           ) : (
//             <button
//               type="button" // Specify type to prevent form submission
//               onClick={stopPlayback}
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             >
//               Stop
//             </button>
//           )}
//           <button
//             type="button" // Specify type to prevent form submission
//             onClick={handleDelete}
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Delete
//           </button>
//           <button
//             type="button" // Specify type to prevent form submission
//             onClick={handleSaveLocally}
//             className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//           >
//             Use this Record
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;


import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../contexts/LangContext"; // Ensure this path is correct

const AudioRecorder = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const streamRef = useRef(null); // To keep track of the media stream
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Translation object
  const translations = {
    en: {
      errorAccessMic: "Error: Could not access microphone.",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      play: "Play",
      stop: "Stop",
      delete: "Delete",
      useThisRecord: "Use this Record",
      noRecording: "No recording available to save",
      audioReady: "Audio is ready to be uploaded when you submit the form!",
      confirmOverwrite: "A recording already exists. Do you want to overwrite it?",
      confirmDelete: "Are you sure you want to delete this recording?",
    },
    he: {
      errorAccessMic: "שגיאה: לא ניתן לגשת למיקרופון.",
      startRecording: "התחל הקלטה",
      stopRecording: "הפסק הקלטה",
      play: "נגן",
      stop: "הפסק",
      delete: "מחק",
      useThisRecord: " שמור הקלטה",
      noRecording: " הקלטה זו אינה זמינה לשמירה",
      audioReady: "ההקלטה מוכנה להעלאה ותעלה מיד לאחר שתאשר את הטופס!",
      confirmOverwrite: "הקלטה כבר קיימת. האם ברצונך להחליפה?",
      confirmDelete: "האם אתה בטוח שברצונך למחוק הקלטה זו?",
    },
  };

  const { language } = useLang(); // Get current language from context
  const t = translations[language] || translations.en; // Fallback to English

  // Determine text direction based on language
  const isRTL = language === "he";

  const handleStartRecording = async () => {
    // If there's an existing recording, confirm overwrite
    if (audioBlob) {
      const confirmOverwrite = window.confirm(t.confirmOverwrite);
      if (!confirmOverwrite) return;
      // If confirmed, delete the existing recording
      handleDelete(false); // Pass false to skip delete confirmation
    }

    setErrorMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; // Save the stream to stop it later
      mediaRecorderRef.current = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const completeBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(completeBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      stopPlayback();
    } catch (err) {
      setErrorMessage(t.errorAccessMic);
      console.error(err);
    }
  };

  const convertBlobForPlayback = async (originalBlob) => {
    if (!isIOS) return originalBlob;

    try {
      // Create an audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Convert blob to array buffer
      const arrayBuffer = await originalBlob.arrayBuffer();

      // Decode the audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Create offline context for rendering
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      // Create buffer source
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start();

      // Render audio
      const renderedBuffer = await offlineContext.startRendering();

      // Convert to WAV format
      const wav = audioBufferToWav(renderedBuffer);
      return new Blob([wav], { type: "audio/wav" });
    } catch (error) {
      console.error("Error converting audio for playback:", error);
      return originalBlob;
    }
  };

  // Helper function to convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;

    const wav = new ArrayBuffer(44 + buffer.length * bytesPerSample);
    const view = new DataView(wav);

    // Write WAV header
    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + buffer.length * bytesPerSample, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, "data");
    view.setUint32(40, buffer.length * bytesPerSample, true);

    const channels = [];
    for (let i = 0; i < numChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, channels[channel][i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return wav;
  };

  const handlePlay = async () => {
    if (!audioBlob) return;
    stopPlayback();

    try {
      // Convert blob for iOS if needed
      const playableBlob = await convertBlobForPlayback(audioBlob);
      const audioURL = URL.createObjectURL(playableBlob);
      audioPlayerRef.current = new Audio(audioURL);
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioURL); // Revoke URL after playback
      };

      await audioPlayerRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      setErrorMessage(t.errorAccessMic); // Or another appropriate message
      console.error(err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to release the microphone
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  const stopPlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
      setIsPlaying(false);
    }
  };

  const handleDelete = (confirm = true) => {
    if (confirm) {
      const confirmDelete = window.confirm(t.confirmDelete);
      if (!confirmDelete) return;
    }

    stopPlayback();
    setAudioBlob(null);
    onAudioReady(null);
  };

  const handleSaveLocally = () => {
    if (!audioBlob) {
      alert(t.noRecording);
      return;
    }
    onAudioReady(audioBlob);
    alert(t.audioReady);
  };

  // Cleanup audio object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.src = "";
      }
      // Stop any ongoing recording if component unmounts
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`flex justify-center items-center ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}

      {/* Show Start Recording button only when not recording and no audioBlob */}
      {!isRecording && !audioBlob && (
        <button
          type="button" // Prevent form submission
          onClick={handleStartRecording}
          disabled={isPlaying}
          className="px-4  py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {t.startRecording}
        </button>
      )}

      {/* Show Stop Recording button only when recording */}
      {isRecording && (
        <button
          type="button" // Prevent form submission
          onClick={handleStopRecording}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {t.stopRecording}
        </button>
      )}

      {/* Show Play, Delete, Use this Record buttons only when audioBlob exists and not recording */}
      {audioBlob && !isRecording && (
        <div
          className={` flex justify-center items-center ${
            isRTL ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
        >
          {!isPlaying ? (
            <button
              type="button" // Prevent form submission
              onClick={handlePlay}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {t.play}
            </button>
          ) : (
            <button
              type="button" // Prevent form submission
              onClick={stopPlayback}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              {t.stop}
            </button>
          )}
          <button
            type="button" // Prevent form submission
            onClick={() => handleDelete(true)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t.delete}
          </button>
          <button
            type="button" // Prevent form submission
            onClick={handleSaveLocally}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {t.useThisRecord}
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
