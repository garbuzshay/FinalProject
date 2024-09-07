
import { useState, useEffect, useRef } from 'react';

const useSpeechToText = (initialLanguage = 'en-US') => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [language, setLanguage] = useState(initialLanguage);
    const recognition = useRef(null);

    useEffect(() => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            alert('Speech Recognition API is not supported in this browser.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = language;

        recognition.current.onresult = (event) => {
            let finalText = '';
            let interimText = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalText += transcriptPart + ' ';
                } else {
                    interimText += transcriptPart;
                }
            }

            setTranscript((prev) => prev + finalText);
            setInterimTranscript(interimText);
        };

        recognition.current.onerror = (event) => {
            console.error(event.error);
            setIsListening(false);
        };

        return () => {
            if (recognition.current) {
                recognition.current.stop();
                recognition.current.onresult = null;
                recognition.current.onerror = null;
            }
        };
    }, []);

    useEffect(() => {
        if (recognition.current) {
            recognition.current.lang = language;
        }
    }, [language]);

    const startListening = () => {
        if (!isListening && recognition.current) {
            recognition.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (isListening && recognition.current) {
            recognition.current.stop();
            setIsListening(false);
            setInterimTranscript('');
        }
    };

    // Function to clear the transcript only (not the editable text area)
    const clearTranscript = () => {
        setTranscript('');
        setInterimTranscript('');
    };

    return {
        isListening,
        transcript,
        interimTranscript,
        language,
        setLanguage,
        startListening,
        stopListening,
        clearTranscript, // Expose the clearTranscript function
    };
};

export default useSpeechToText;
