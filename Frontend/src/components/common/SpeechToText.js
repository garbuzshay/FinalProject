import React from "react";
import useSpeechToText from "../../hooks/useSpeechToText";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpeechToText = ({ finalTranscript, setFinalTranscript }) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    language,
    setLanguage,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechToText("en-US");

  const [showTranscriptBox, setShowTranscriptBox] = React.useState(false);
  const [confirmMove, setConfirmMove] = React.useState(false);

  const handleListen = () => {
    if (isListening) {
      stopListening();
      setShowTranscriptBox(true);
      setConfirmMove(true);
    } else {
      setShowTranscriptBox(true);
      startListening();
    }
  };

  const handleMoveToEditable = () => {
    // Ensure we're appending the transcript to the current description content
    const newTranscript = `${finalTranscript} ${transcript} ${interimTranscript}`.trim();
    setFinalTranscript(newTranscript);  // Append the text to the existing content
    clearTranscript();
    setShowTranscriptBox(false);
    setConfirmMove(false);
  };

  const handleCancelMove = () => {
    clearTranscript();
    setShowTranscriptBox(false);
    setConfirmMove(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl w-full mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Please select a language you would like to record in</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          disabled={isListening}
        >
         <option value="en-US">English (United States)</option>
                        <option value="es-ES">Spanish (Spain)</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                        <option value="ru-RU">Russian</option>
                        <option value="he-IL">Hebrew</option>
                        <option value="ar-SA">Arabic (Saudi Arabia)</option>
                        <option value="ja-JP">Japanese</option>
                        <option value="zh-CN">Chinese (Mandarin)</option>
                        <option value="ko-KR">Korean</option>
                        <option value="pt-BR">Portuguese (Brazil)</option>
                        <option value="th-TH">Thai</option>
                        <option value="sv-SE">Swedish</option>
                        <option value="it-IT">Italian</option>
                        <option value="fi-FI">Finnish</option>
                        <option value="da-DK">Danish</option>
                        <option value="no-NO">Norwegian</option>
                        <option value="hi-IN">Hindi</option>
                        <option value="pl-PL">Polish</option>
                        <option value="nl-NL">Dutch</option>

        </select>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-200 ${
          isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={handleListen}
      >
        <FontAwesomeIcon
          icon={isListening ? faMicrophoneSlash : faMicrophone}
          className="mr-2"
        />
        {isListening ? "Stop Recording" : "Start Recording"}
      </button>

      {showTranscriptBox && (
        <textarea
          className="w-full h-40 p-3 mt-4 border border-gray-300 rounded-lg"
          placeholder="Speech will appear here..."
          value={transcript + interimTranscript}
          readOnly
        ></textarea>
      )}

      {confirmMove && (
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="w-1/2 mr-2 px-4 py-3 text-white bg-blue-500 hover:bg-blue-600"
            onClick={handleMoveToEditable}
          >
            Use it and edit
          </button>
          <button
            type="button"
            className="w-1/2 ml-2 px-4 py-3 text-white bg-gray-500 hover:bg-gray-600"
            onClick={handleCancelMove}
          >
            No. clear it.
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
