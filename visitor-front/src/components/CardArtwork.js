// import React, { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';

// const CardArtwork = ({ imageUrl, title, artist, description, createdDate, isOpen, onClick }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth] = useState(window.speechSynthesis);
//   const [voices, setVoices] = useState([]);
//   const [utterances, setUtterances] = useState([]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const availableVoices = synth.getVoices();
//       setVoices(availableVoices);
//     };
    
//     synth.onvoiceschanged = loadVoices;
//     loadVoices();
//   }, [synth]);

//   useEffect(() => {
//     if (voices.length > 0) {
//       const selectedVoice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0];

//       const utterancesArray = [
//         new SpeechSynthesisUtterance(`${title}`),
//         new SpeechSynthesisUtterance(`${description} made by ${artist}`),
//         new SpeechSynthesisUtterance(`Created at ${new Date(createdDate).toLocaleDateString()}`)
//       ];

//       utterancesArray.forEach(utterance => {
//         utterance.voice = selectedVoice;
//         utterance.rate = 1; // Normal rate
//       });

//       setUtterances(utterancesArray);
//     }
//   }, [voices, title, artist, description, createdDate]);

//   const startSpeaking = () => {
//     if (synth.speaking) {
//       synth.cancel();
//     }
    
//     utterances.forEach((utterance, index) => {
//       utterance.onend = () => {
//         if (index < utterances.length - 1) {
//           setTimeout(() => synth.speak(utterances[index + 1]), 1000); // 1 second pause
//         } else {
//           setIsSpeaking(false);
//         }
//       };
//     });

//     if (utterances.length > 0) {
//       synth.speak(utterances[0]);
//       setIsSpeaking(true);
//     }
//   };

//   const stopSpeaking = () => {
//     synth.cancel();
//     setIsSpeaking(false);
//   };

//   return (
//     <div
//       ref={ref}
//       className={`bg-white p-4 rounded-lg shadow-lg transition-all duration-500 transform cursor-pointer max-w-xs mx-auto ${
//         isOpen ? 'max-h-full' : 'max-h-[400px]'
//       }`}
//       onClick={onClick} // Handle click to toggle
//     >
//       {/* Always display the image and title */}
//       <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded-lg shadow-sm" />
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>

//       {/* Display details if card is open */}
//       {isOpen && (
//         <div>
//           <p className="mb-2"><strong>Artist:</strong> {artist}</p>
//           <p className="mb-2"><strong>Description:</strong> {description}</p>
//           <p className="mb-2"><strong>Created Date:</strong> {new Date(createdDate).toLocaleDateString()}</p>
//           <div className="mt-4">
//             <button
//               onClick={startSpeaking}
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//               disabled={isSpeaking}
//             >
//               Listen
//             </button>
//             <button
//               onClick={stopSpeaking}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Stop
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardArtwork;
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CardArtwork = ({ imageUrl, title, artist, description, createdDate, isOpen, onClick }) => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth] = useState(window.speechSynthesis);
  const [voices, setVoices] = useState([]);
  const [utterances, setUtterances] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    
    synth.onvoiceschanged = loadVoices;
    loadVoices();
  }, [synth]);

  useEffect(() => {
    if (voices.length > 0) {
      const selectedVoice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0];

      const utterancesArray = [
        new SpeechSynthesisUtterance(`${title}`),
        new SpeechSynthesisUtterance(`${description} made by ${artist}`),
        new SpeechSynthesisUtterance(`Created at ${new Date(createdDate).toLocaleDateString()}`)
      ];

      utterancesArray.forEach(utterance => {
        utterance.voice = selectedVoice;
        utterance.rate = 1; // Normal rate
      });

      setUtterances(utterancesArray);
    }
  }, [voices, title, artist, description, createdDate]);

  const startSpeaking = () => {
    if (synth.speaking) {
      synth.cancel();
    }
    
    utterances.forEach((utterance, index) => {
      utterance.onend = () => {
        if (index < utterances.length - 1) {
          setTimeout(() => synth.speak(utterances[index + 1]), 1000); // 1 second pause
        } else {
          setIsSpeaking(false);
        }
      };
    });

    if (utterances.length > 0) {
      synth.speak(utterances[0]);
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    synth.cancel();
    setIsSpeaking(false);
  };

  return (
    <div ref={ref} className="max-w-xs mx-auto">
      {/* Card Container */}
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg transition-all duration-500 cursor-pointer"
        onClick={onClick}
      >
        <img src={imageUrl} alt={title} className="w-64 h-64 mb-4 rounded-lg shadow-sm" />
        {/* Always display title and artist */}
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {artist}</p>
      </div>

      {/* Expanded details below the card */}
      <div
        className={`bg-gray-100 p-4 mt-2 rounded-lg shadow-lg transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        {isOpen && (
          <div className='max-w-64'>
            <p className="mb-2"><strong>Description:</strong> {description}</p>
            <p className="mb-2"><strong>Created Date:</strong> {new Date(createdDate).toLocaleDateString()}</p>
            <div className="mt-4">
              <button
                onClick={startSpeaking}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                disabled={isSpeaking}
              >
                Listen
              </button>
              <button
                onClick={stopSpeaking}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardArtwork;
