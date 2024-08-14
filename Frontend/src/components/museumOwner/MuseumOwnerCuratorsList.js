// import React from 'react';

// import { useMuseumContext } from '../../contexts/MuseumContext';


// const MuseumOwnerCuratorsList = () => {
//   const { museum, loading } = useMuseumContext();
//   const exhibitions = museum?.exhibitions;

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const curatorsMap = new Map();

//   exhibitions?.forEach((exhibition) => {
//     exhibition.curators.forEach((curator) => {
//       if (!curatorsMap.has(curator._id)) {
//         curatorsMap.set(curator._id, {
//           ...curator,
//           exhibitions: [],
//         });
//       }
//       curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
//     });
//   });

//   const curators = Array.from(curatorsMap.values());

//   return (
//     <div className="mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Curators</h1>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Full Name</th>
//             <th className="py-2 px-4 border-b">Email</th>
//             <th className="py-2 px-4 border-b">Phone</th>
//             <th className="py-2 px-4 border-b">Exhibitions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {curators.map((curator) => (
//             <tr key={curator._id}>
//               <td className="py-2 px-4 border-b">{`${curator.name} ${curator.lastName}`}</td>
//               <td className="py-2 px-4 border-b">{curator.email}</td>
//               <td className="py-2 px-4 border-b">{curator.phoneNumber}</td>
//               <td className="py-2 px-4 border-b">
//                 {curator.exhibitions.join(', ')}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MuseumOwnerCuratorsList;


import React from 'react';
import { useMuseumContext } from '../../contexts/MuseumContext';

const MuseumOwnerCuratorsList = () => {
  const { museum, loading } = useMuseumContext();
  const exhibitions = museum?.exhibitions;

  if (loading) {
    return <div>Loading...</div>;
  }

  const curatorsMap = new Map();

  exhibitions?.forEach((exhibition) => {
    exhibition.curators.forEach((curator) => {
      if (!curatorsMap.has(curator._id)) {
        curatorsMap.set(curator._id, {
          ...curator,
          exhibitions: [],
        });
      }
      curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
    });
  });

  const curators = Array.from(curatorsMap.values());

  return (
    <div className="mx-auto p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Curators</h1>
      <div className="hidden md:block">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Exhibitions</th>
            </tr>
          </thead>
          <tbody>
            {curators.map((curator) => (
              <tr key={curator._id}>
                <td className="py-2 px-4 border-b">{`${curator.name} ${curator.lastName}`}</td>
                <td className="py-2 px-4 border-b">{curator.email}</td>
                <td className="py-2 px-4 border-b">{curator.phoneNumber}</td>
                <td className="py-2 px-4 border-b">
                  {curator.exhibitions.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" md:hidden">
        {curators.map((curator) => (
          <div key={curator._id} className="mb-4 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">
              {`${curator.name} ${curator.lastName}`}
            </h2>
            <p className="mb-1">
              <strong>Email:</strong> {curator.email}
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> {curator.phoneNumber}
            </p>
            <p>
              <strong>Exhibitions:</strong> {curator.exhibitions.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuseumOwnerCuratorsList;
