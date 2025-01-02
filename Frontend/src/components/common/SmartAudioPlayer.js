import React, { useEffect, useState } from "react";

const SmartAudioPlayer = ({ audioUrl, isDarkMode, t }) => {
  const [processedAudioUrl, setProcessedAudioUrl] = useState(audioUrl);
  const [error, setError] = useState("");
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const convertAudioToWav = async (url) => {
      try {
        // Fetch the original audio file
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        // Decode audio data
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Create offline context for rendering
        const offlineContext = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate
        );

        // Create buffer source and render to WAV
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(offlineContext.destination);
        source.start();

        const renderedBuffer = await offlineContext.startRendering();
        const wavBlob = audioBufferToWav(renderedBuffer);
        const wavUrl = URL.createObjectURL(wavBlob);

        setProcessedAudioUrl(wavUrl);
      } catch (err) {
        console.error("Error converting audio to WAV:", err);
        setError(t.errorAccessMic || "Failed to process audio.");
      }
    };

    // Check if the device is iOS and apply conversion if needed
    if (isIOS && audioUrl) {
      convertAudioToWav(audioUrl);
    }
  }, [audioUrl, isIOS, t]);

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

    return new Blob([wav], { type: "audio/wav" });
  };

  return (
    <div className="mb-4 text-center font-bold">
      {error && (
        <p className="text-red-500">{error}</p>
      )}
      {!error && processedAudioUrl && (
        <>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            {t.existingAudio}
          </p>
          <audio controls src={processedAudioUrl} className="mt-2 mx-auto">
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </div>
  );
};

export default SmartAudioPlayer;
