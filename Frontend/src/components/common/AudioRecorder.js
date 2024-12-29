// // src/components/AudioRecorder.js

// import React, { useState, useRef } from "react";

// const AudioRecorder = ({ onAudioReady }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const mediaRecorderRef = useRef(null);
//   const audioPlayerRef = useRef(null);

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
//         const completeBlob = new Blob(chunks, { type: "audio/wav" });
//         // const completeBlob = new Blob(chunks, { type: "audio/webm" });
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

//   const handleStopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handlePlay = () => {
//     if (!audioBlob) return;
//     stopPlayback();
//     const audioURL = URL.createObjectURL(audioBlob);
//     audioPlayerRef.current = new Audio(audioURL);
//     audioPlayerRef.current.onended = () => setIsPlaying(false);
//     audioPlayerRef.current
//       .play()
//       .then(() => setIsPlaying(true))
//       .catch((err) => {
//         setErrorMessage("Error playing audio.");
//         console.error(err);
//       });
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
//     onAudioReady(null); // Let the parent know we've removed the audio
//   };

//   // Instead of uploading to Firebase, this "Save to Cloud" button
//   // just sends the blob up to the parent (the form) for future upload
//   const handleSaveLocally = () => {
//     if (!audioBlob) {
//       alert("No recording available to save");
//       return;
//     }
//     // Let parent know that we have a final audio blob
//     onAudioReady(audioBlob);
//     alert("Audio is ready to be uploaded when you submit the form!");
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "300px",
//         margin: "auto",
//         padding: "20px",
//         fontFamily: "sans-serif",
//       }}
//     >
//       <h2>Audio Recorder</h2>

//       {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

//       {!isRecording && (
//         <button onClick={handleStartRecording} disabled={isPlaying}>
//           Start Recording
//         </button>
//       )}
//       {isRecording && (
//         <button onClick={handleStopRecording}>Stop Recording</button>
//       )}

//       {audioBlob && !isRecording && (
//         <div style={{ marginTop: "10px" }}>
//           {!isPlaying ? (
//             <button onClick={handlePlay}>Play</button>
//           ) : (
//             <button onClick={stopPlayback}>Stop</button>
//           )}
//           <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
//             Delete
//           </button>
//           <button onClick={handleSaveLocally} style={{ marginLeft: "10px" }}>
//             Save to Cloud
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;

import React, { useState, useRef } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

const AudioRecorder = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [setAudioBlob] = useState(null);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);

  const handleStartRecording = async () => {
    setErrorMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const completeBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(completeBlob);

        // Convert the recorded audio to MP3
        const mp3Blob = await convertToMP3(completeBlob);
        setConvertedBlob(mp3Blob); // Store the converted MP3 blob
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      stopPlayback();
    } catch (err) {
      setErrorMessage("Error: Could not access microphone.");
      console.error(err);
    }
  };

  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlay = () => {
    if (!convertedBlob) return;
    stopPlayback();
    const audioURL = URL.createObjectURL(convertedBlob);
    audioPlayerRef.current = new Audio(audioURL);
    audioPlayerRef.current.onended = () => setIsPlaying(false);
    audioPlayerRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        setErrorMessage("Error playing audio.");
        console.error(err);
      });
  };

  const stopPlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
      setIsPlaying(false);
    }
  };

  const handleDelete = () => {
    stopPlayback();
    setAudioBlob(null);
    setConvertedBlob(null);
    onAudioReady(null); // Let the parent know we've removed the audio
  };

  const convertToMP3 = async (wavBlob) => {
    try {
      if (!ffmpeg.isLoaded()) await ffmpeg.load();

      const wavArray = new Uint8Array(await wavBlob.arrayBuffer());
      ffmpeg.FS("writeFile", "input.wav", wavArray);

      await ffmpeg.run("-i", "input.wav", "output.mp3");

      const mp3Data = ffmpeg.FS("readFile", "output.mp3");
      return new Blob([mp3Data.buffer], { type: "audio/mp3" });
    } catch (error) {
      console.error("Error converting to MP3", error);
      setErrorMessage("Error: Failed to convert audio.");
      return null;
    }
  };

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Audio Recorder</h2>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      {!isRecording && (
        <button onClick={handleStartRecording} disabled={isPlaying}>
          Start Recording
        </button>
      )}
      {isRecording && (
        <button onClick={handleStopRecording}>Stop Recording</button>
      )}

      {convertedBlob && !isRecording && (
        <div style={{ marginTop: "10px" }}>
          {!isPlaying ? (
            <button onClick={handlePlay}>Play</button>
          ) : (
            <button onClick={stopPlayback}>Stop</button>
          )}
          <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
