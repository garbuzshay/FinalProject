import React from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import FormConfirmButton from '../common/FormConfirmButton'; // Adjust the path as needed
import { useThemeMode } from '../../contexts/DarkModeContext';

const AdminRequestsManagement = () => {
  const { isDarkMode } = useThemeMode();
  const { requestsData, fetchData } = useAdminContext();
  const { requests, isLoading, error, updateRequestStatus } = requestsData;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const sortedRequests = requests.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const pendingRequests = sortedRequests.filter(
    (request) => request.status === 'Pending'
  );
  const answeredRequests = sortedRequests.filter(
    (request) => request.status !== 'Pending'
  );

  const handleApprove = async (id) => {
    await updateRequestStatus(id, 'Approved');
    await fetchData();
  };

  const handleReject = async (id) => {
    await updateRequestStatus(id, 'Rejected');
  };

  const renderRequestRows = (request) => {
    const date = new Date(request.createdAt);
    const formattedDate = date.toLocaleDateString();

    return (
      <tr key={request._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <td className="border px-4 py-2">{request.museumName}</td>
        <td className="border px-4 py-2">{request.user?.name}</td>
        <td className="border px-4 py-2">{request.type}</td>
        <td className="border px-4 py-2">{request.status}</td>
        <td className="border px-4 py-2">{formattedDate}</td>
        {request.status === 'Pending' && (
          <td className="border px-6 ">
            <FormConfirmButton
              onSubmit={() => handleApprove(request._id)}
              buttonText="Approve"
              dialogMessage="Are you sure you want to approve this request?"
            />
            <FormConfirmButton
              onSubmit={() => handleReject(request._id)}
              buttonText="Reject"
              dialogMessage="Are you sure you want to reject this request?"
            />
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Requests Management</h2>

      <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Pending Requests</h3>
      <div className="hidden md:block overflow-x-auto">
        {/* Table view for desktop */}
        <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'} mb-5`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
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
      </div>

      <div className="block md:hidden">
        {/* Card view for mobile */}
        {pendingRequests.map((request) => (
          <div key={request._id} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
            <h3 className="font-bold text-lg">{request.museumName}</h3>
            <p className="text-sm"><strong>Requestor:</strong> {request.user?.name}</p>
            <p className="text-sm"><strong>Type:</strong> {request.type}</p>
            <p className="text-sm"><strong>Status:</strong> {request.status}</p>
            <p className="text-sm"><strong>Created At:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
            {request.status === 'Pending' && (
              <div className="mt-2">
                <FormConfirmButton
                  onSubmit={() => handleApprove(request._id)}
                  buttonText="Approve"
                  dialogMessage="Are you sure you want to approve this request?"
                />
                <FormConfirmButton
                  onSubmit={() => handleReject(request._id)}
                  buttonText="Reject"
                  dialogMessage="Are you sure you want to reject this request?"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Answered Requests</h3>
      <div className="hidden md:block overflow-x-auto">
        {/* Table view for desktop */}
        <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
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

      <div className="block md:hidden">
        {/* Card view for mobile */}
        {answeredRequests.map((request) => (
          <div key={request._id} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
            <h3 className="font-bold text-lg">{request.museumName}</h3>
            <p className="text-sm"><strong>Requestor:</strong> {request.user?.name}</p>
            <p className="text-sm"><strong>Type:</strong> {request.type}</p>
            <p className="text-sm"><strong>Status:</strong> {request.status}</p>
            <p className="text-sm"><strong>Created At:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRequestsManagement;
