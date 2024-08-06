// // src/components/CardArtwork.js
// import React from 'react';

// const CardArtwork = ({ imageUrl, title, artist, description, createdDate }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl max-w-xs mx-auto">
//       <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded-lg shadow-sm" />
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="mb-2"><strong>Artist:</strong> {artist}</p>
//       <p className="mb-2"><strong>Description:</strong> {description}</p>
//       <p className="mb-2"><strong>Created Date:</strong> {new Date(createdDate).toLocaleDateString()}</p>
//     </div>
//   );
// };

// export default CardArtwork;

// src/components/CardArtwork.js
import React from 'react';
import { useInView } from 'react-intersection-observer';

const CardArtwork = ({ imageUrl, title, artist, description, createdDate }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`bg-white p-4 rounded-lg shadow-lg transition duration-500 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } max-w-xs mx-auto`}
    >
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded-lg shadow-sm" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-2"><strong>Artist:</strong> {artist}</p>
      <p className="mb-2"><strong>Description:</strong> {description}</p>
      <p className="mb-2"><strong>Created Date:</strong> {new Date(createdDate).toLocaleDateString()}</p>
    </div>
  );
};

export default CardArtwork;
