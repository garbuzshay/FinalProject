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
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

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
      return new Blob([wav], { type: 'audio/wav' });
    } catch (error) {
      console.error('Error converting audio for playback:', error);
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
    
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.length * bytesPerSample, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
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
      audioPlayerRef.current.onended = () => setIsPlaying(false);
      
      await audioPlayerRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      setErrorMessage("Error playing audio.");
      console.error(err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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