// import React from 'react';
// import useRequests from '../../hooks/useRequests';

// const AdminRequestsManagement = () => {
//   const { requests, loading, error, updateRequestStatus } = useRequests();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>{error}</div>;
//   }

//   const sortedRequests = requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   const pendingRequests = sortedRequests.filter(request => request.status === 'Pending');
//   const answeredRequests = sortedRequests.filter(request => request.status !== 'Pending');

//   const handleApprove = (id) => {
//     updateRequestStatus(id, 'Approved');
//   };

//   const handleReject = (id) => {
//     updateRequestStatus(id, 'Rejected');
//   };

//   const renderRequestRows = (request) => {
//     const date = new Date(request.createdAt);
//     const formattedDate = date.toLocaleDateString();

//     return (
//       <tr key={request._id}>
//         <td className="border px-4 py-2">{request.user?.name}</td>
//         <td className="border px-4 py-2">{request.type}</td>
//         <td className="border px-4 py-2">{request.status}</td>
//         <td className="border px-4 py-2">{formattedDate}</td>
//         {request.status === 'Pending' && (
//           <td className="border px-4 py-2">
//             <button
//               className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//               onClick={() => handleApprove(request._id)}
//             >
//               Approve
//             </button>
//             <button
//               className="bg-red-500 text-white px-2 py-1 rounded"
//               onClick={() => handleReject(request._id)}
//             >
//               Reject
//             </button>
//           </td>
//         )}
//       </tr>
//     );
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-5">Requests Management</h2>
//       <h3 className="text-xl font-semibold mb-3">Pending Requests</h3>
//       <table className="min-w-full bg-white mb-5">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="w-1/4 py-2">Requestor</th>
//             <th className="w-1/4 py-2">Type</th>
//             <th className="w-1/4 py-2">Status</th>
//             <th className="w-1/4 py-2">Created At</th>
//             <th className="w-1/4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingRequests.map(renderRequestRows)}
//         </tbody>
//       </table>
//       <h3 className="text-xl font-semibold mb-3">Answered Requests</h3>
//       <table className="min-w-full bg-white">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="w-1/4 py-2">Requestor</th>
//             <th className="w-1/4 py-2">Type</th>
//             <th className="w-1/4 py-2">Status</th>
//             <th className="w-1/4 py-2">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {answeredRequests.map(renderRequestRows)}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminRequestsManagement;

import React from "react";
import useRequests from "../../hooks/useRequests";

const AdminRequestsManagement = () => {
  const { requests, loading, error, updateRequestStatus } = useRequests();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  const sortedRequests = requests.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const pendingRequests = sortedRequests.filter(
    (request) => request.status === "Pending"
  );
  const answeredRequests = sortedRequests.filter(
    (request) => request.status !== "Pending"
  );

  const handleApprove = (id) => {
    updateRequestStatus(id, "Approved");
  };

  const handleReject = (id) => {
    updateRequestStatus(id, "Rejected");
  };

  const renderRequestRows = (request) => {
    const date = new Date(request.createdAt);
    const formattedDate = date.toLocaleDateString();

    return (
      <tr key={request._id}>
        <td className="border px-4 py-2">{request.museumName}</td>
        <td className="border px-4 py-2">{request.user?.name}</td>
        <td className="border px-4 py-2">{request.type}</td>
        <td className="border px-4 py-2">{request.status}</td>
        <td className="border px-4 py-2">{formattedDate}</td>

        {request.status === "Pending" && (
          <td className="border px-4 py-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleApprove(request._id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleReject(request._id)}
            >
              Reject
            </button>
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Requests Management</h2>
      <h3 className="text-xl font-semibold mb-3">Pending Requests</h3>
      <table className="min-w-full bg-white mb-5">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">Museum Name</th>
            <th className="w-1/6 py-2">Requestor</th>
            <th className="w-1/6 py-2">Type</th>
            <th className="w-1/6 py-2">Status</th>
            <th className="w-1/6 py-2">Created At</th>

            <th className="w-1/6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>{pendingRequests.map(renderRequestRows)}</tbody>
      </table>
      <h3 className="text-xl font-semibold mb-3">Answered Requests</h3>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">Museum Name</th>
            <th className="w-1/6 py-2">Requestor</th>
            <th className="w-1/6 py-2">Type</th>
            <th className="w-1/6 py-2">Status</th>
            <th className="w-1/6 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>{answeredRequests.map(renderRequestRows)}</tbody>
      </table>
    </div>
  );
};

export default AdminRequestsManagement;
