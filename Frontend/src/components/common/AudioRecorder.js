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
      
      // Check if MediaRecorder supports MP4
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4') 
        ? 'audio/mp4' 
        : MediaRecorder.isTypeSupported('audio/aac')
          ? 'audio/aac'
          : 'audio/webm';

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000
      });

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const completeBlob = new Blob(chunks, { type: mimeType });
        setAudioBlob(completeBlob);
        
        // Convert to MP4/AAC if not already
        if (mimeType === 'audio/webm') {
          convertToMP4(completeBlob);
        } else {
          onAudioReady(completeBlob);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      stopPlayback();
    } catch (err) {
      setErrorMessage("Error: Could not access microphone.");
      console.error(err);
    }
  };

  const convertToMP4 = async (webmBlob) => {
    try {
      // Create an audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Convert blob to array buffer
      const arrayBuffer = await webmBlob.arrayBuffer();
      
      // Decode the audio
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Create media stream destination
      const destination = audioContext.createMediaStreamDestination();
      
      // Create buffer source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(destination);
      
      // Create new MediaRecorder with MP4/AAC format
      const newRecorder = new MediaRecorder(destination.stream, {
        mimeType: 'audio/mp4'
      });
      
      const chunks = [];
      newRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      newRecorder.onstop = () => {
        const mp4Blob = new Blob(chunks, { type: 'audio/mp4' });
        setAudioBlob(mp4Blob);
        onAudioReady(mp4Blob);
      };
      
      // Start recording and playing
      newRecorder.start();
      source.start(0);
      
      // Stop after the duration of the original audio
      setTimeout(() => {
        newRecorder.stop();
        source.stop();
      }, audioBuffer.duration * 1000);
    } catch (error) {
      console.error('Error converting to MP4:', error);
      // Fallback: use original webm blob
      onAudioReady(webmBlob);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
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
    audioPlayerRef.current.play()
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
    onAudioReady(null);
  };

  const handleSaveLocally = () => {
    if (!audioBlob) {
      alert("No recording available to save");
      return;
    }
    onAudioReady(audioBlob);
    alert("Audio is ready to be uploaded when you submit the form!");
  };

  return (
    <div className="max-w-sm mx-auto p-5 font-sans">
      <h2 className="text-lg font-semibold mb-4">Audio Recorder</h2>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <div className="space-y-4">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            disabled={isPlaying}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Stop Recording
          </button>
        )}

        {audioBlob && !isRecording && (
          <div className="flex space-x-2">
            <button
              onClick={isPlaying ? stopPlayback : handlePlay}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isPlaying ? 'Stop' : 'Play'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={handleSaveLocally}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Save to Cloud
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;