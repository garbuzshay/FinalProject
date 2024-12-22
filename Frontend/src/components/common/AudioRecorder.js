// import React, { useState, useRef } from "react";
// import { storage } from '../../configuration/firebaseConfig';
// import { ref as storageRef, uploadBytes } from "firebase/storage";


// const AudioRecorder = () => {
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

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
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
//     audioPlayerRef.current.play()
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
//   };

//   const handleUpload = () => {
//     if (!audioBlob) {
//       alert("No recording available to upload");
//       return;
//     }

//     const fileRef = storageRef(storage, `audio/${new Date().getTime()}-recording.webm`);
//     uploadBytes(fileRef, audioBlob).then((snapshot) => {
//       console.log('Uploaded a blob or file!', snapshot);
//       alert("Upload successful!");
//     }).catch((error) => {
//       console.error("Error uploading file:", error);
//       alert("Upload failed!");
//     });
//   };

//   const handleSave = () => {
//     handleUpload();
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
//           <button onClick={handleSave} style={{ marginLeft: "10px" }}>
//             Save to Cloud
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;



// src/components/AudioRecorder.js
import React, { useState, useRef } from "react";

const AudioRecorder = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
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

      mediaRecorderRef.current.onstop = () => {
        const completeBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(completeBlob);
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
    if (!audioBlob) return;
    stopPlayback();
    const audioURL = URL.createObjectURL(audioBlob);
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
    onAudioReady(null); // Let the parent know we've removed the audio
  };

  // Instead of uploading to Firebase, this "Save to Cloud" button
  // just sends the blob up to the parent (the form) for future upload
  const handleSaveLocally = () => {
    if (!audioBlob) {
      alert("No recording available to save");
      return;
    }
    // Let parent know that we have a final audio blob
    onAudioReady(audioBlob);
    alert("Audio is ready to be uploaded when you submit the form!");
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

      {audioBlob && !isRecording && (
        <div style={{ marginTop: "10px" }}>
          {!isPlaying ? (
            <button onClick={handlePlay}>Play</button>
          ) : (
            <button onClick={stopPlayback}>Stop</button>
          )}
          <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete
          </button>
          <button onClick={handleSaveLocally} style={{ marginLeft: "10px" }}>
            Save to Cloud
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
