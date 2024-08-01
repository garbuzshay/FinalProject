// Frontend/src/components/common/FloatingActionButton.js
import React from 'react';

const FloatingActionButton = ({ onEdit, onBlock, onView }) => {
  return (
    <div className="group fixed bottom-0 right-0 p-2 flex items-end justify-end w-24 h-24">
      {/* Main Button */}
      <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition transition-all duration-[0.6s]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      {/* Edit Button */}
      <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16 flex p-2 hover:p-3 bg-yellow-300 hover:bg-yellow-400 text-white">
        <button onClick={onEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.488l3.65 3.65m-3.65-3.65L14.74 2.117a1.875 1.875 0 00-2.648 0l-8.4 8.4a4.5 4.5 0 00-1.05 2.183L2.103 17.07a.75.75 0 00.879.88l4.371-.54a4.5 4.5 0 002.183-1.05l8.4-8.4a1.875 1.875 0 000-2.648l-2.122-2.122z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 16.5h.008v.008H5.25V16.5zm1.5 0h.008v.008H6.75V16.5zm1.5 0h.008v.008H8.25V16.5zm1.5 0h.008v.008H9.75V16.5zm1.5 0h.008v.008h-.008V16.5z" />
          </svg>
        </button>
      </div>
      {/* Block Button */}
      <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16 flex p-2 hover:p-3 bg-red-300 hover:bg-red-400 text-white">
        <button onClick={onBlock}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75l-7.5 7.5m0-7.5l7.5 7.5M12 4.5v15" />
          </svg>
        </button>
      </div>
      {/* View Button */}
      <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14 flex p-2 hover:p-3 bg-green-300 hover:bg-green-400 text-white">
        <button onClick={onView}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75l8.25-8.25m0 0l8.25 8.25m-8.25-8.25V21" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;
