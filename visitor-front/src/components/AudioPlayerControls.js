


import React from 'react';
import { Play, Pause, Square, Loader2 } from 'lucide-react';

export default function AudioPlayerControls({ isPlaying = false, isPaused = false, play, pause, stop }) {
  return (
  <div className="flex items-center justify-center py-2">
    <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-200 to-gray-300 p-4 rounded-full shadow-lg">
      <button
        onClick={play}
        className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
        aria-label={isPlaying ? 'Playing' : isPaused ? 'Resume' : 'Play'}
      >
        {isPlaying ? (
          <Loader2 className="h-6 w-6 text-gray-600 animate-spin" />
        ) : (
          <Play className="h-6 w-6 text-gray-600" />
        )}
      </button>

      <button
        onClick={pause}
        className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isPlaying}
        aria-label="Pause"
      >
        <Pause className="h-6 w-6 text-gray-600" />
      </button>

      <button
        onClick={stop}
        className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
        aria-label="Stop"
      >
        <Square className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  </div>
);
}