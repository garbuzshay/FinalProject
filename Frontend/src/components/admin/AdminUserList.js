
// import React, { useState } from "react";
// import { useAdminContext } from "../../contexts/AdminContext";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// const MuseumOwnerList = ({ users, updateUser, deleteUser }) => {
//   const { museumsData } = useAdminContext();
//   const {museums} = museumsData;

//   const getMuseumNameByOwnerId = (ownerId) => {

//     const museum = museums.find((museum) => museum.owner._id === ownerId);
//     return museum ? museum.name : "N/A";
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-5">Museum Owners</h2>
//       <table className="min-w-full bg-white">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="w-1/5 py-2">Name</th>
//             <th className="w-1/5 py-2">Museum Name</th>
//             <th className="w-1/5 py-2">Email</th>
//             <th className="w-1/5 py-2">Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="border px-4 py-2">
//                 {user.name} {user.lastName}
//               </td>
//               <td className="border px-4 py-2">{getMuseumNameByOwnerId(user._id)}</td>
//               {/* <td className="border px-4 py-2">{user.museum?.name || "N/A"}</td> */}
//               <td className="border px-4 py-2">{user.email}</td>
//               <td className="border px-4 py-2">{user.phoneNumber}</td>
             
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const CuratorList = ({ users, updateUser, deleteUser }) => {
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleDeleteUser = (userId) => {
//     setSelectedUser(userId);
//     setShowConfirmDialog(true);
//   };

//   const handleConfirmDelete = () => {
//     deleteUser(selectedUser);
//     setShowConfirmDialog(false);
//   };

//   const handleCancelDelete = () => {
//     setShowConfirmDialog(false);
//     setSelectedUser(null);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-5">Curators</h2>
//       <table className="min-w-full bg-white">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="w-1/4 py-2">Name</th>
//             <th className="w-1/4 py-2">Email</th>
//             <th className="w-1/4 py-2">Phone Number</th>
//             <th className="w-1/4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="border px-4 py-2">
//                 {user.name} {user.lastName}
//               </td>
//               <td className="border px-4 py-2">{user.email}</td>
//               <td className="border px-4 py-2">{user.phoneNumber}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-red-900 text-white px-2 py-1 rounded"
//                   onClick={() => handleDeleteUser(user._id)}
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {showConfirmDialog && (
//         <ConfirmationDialog
//           message="Are you sure you want to delete this user from the system permanently?"
//           onConfirm={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//         />
//       )}
//     </div>
//   );
// };

// const AdminUserList = () => {
//   const { usersData } = useAdminContext();
//   const { users, isLoading, error, updateUser, deleteUser } = usersData;

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   const museumOwners = users.filter(user => user.role.roleName === 'MuseumOwner');
//   const curators = users.filter(user => user.role.roleName === 'Curator');

//   return (
//     <div>
//       <MuseumOwnerList users={museumOwners} updateUser={updateUser} deleteUser={deleteUser} />
//       <CuratorList users={curators} updateUser={updateUser} deleteUser={deleteUser} />
//     </div>
//   );
// };

// export default AdminUserList;
import React, { useState } from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useThemeMode } from '../../contexts/DarkModeContext';

const MuseumOwnerList = ({ users, updateUser, deleteUser }) => {
  const { isDarkMode } = useThemeMode();
  const { museumsData } = useAdminContext();
  const { museums } = museumsData;

  const getMuseumNameByOwnerId = (ownerId) => {
    const museum = museums.find((museum) => museum.owner._id === ownerId);
    return museum ? museum.name : "N/A";
  };

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Museum Owners</h2>
      
      <div className="hidden md:block overflow-x-auto">
        {/* Table view for desktop */}
        <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
            <tr>
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Museum Name</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="border px-4 py-2">
                  {user.name} {user.lastName}
                </td>
                <td className="border px-4 py-2">{getMuseumNameByOwnerId(user._id)}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {/* Card view for mobile */}
        {users.map((user) => (
          <div key={user._id} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
            <h3 className="font-bold text-lg">{user.name} {user.lastName}</h3>
            <p className="text-sm"><strong>Museum:</strong> {getMuseumNameByOwnerId(user._id)}</p>
            <p className="text-sm"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm"><strong>Phone Number:</strong> {user.phoneNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CuratorList = ({ users, updateUser, deleteUser }) => {
  const { isDarkMode } = useThemeMode();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (userId) => {
    setSelectedUser(userId);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(selectedUser);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Curators</h2>

      <div className="hidden md:block overflow-x-auto">
        {/* Table view for desktop */}
        <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-white'}`}>
            <tr>
              <th className="w-1/4 py-2">Name</th>
              <th className="w-1/4 py-2">Email</th>
              <th className="w-1/4 py-2">Phone Number</th>
              <th className="w-1/4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="border px-4 py-2">
                  {user.name} {user.lastName}
                </td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-900 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {/* Card view for mobile */}
        {users.map((user) => (
          <div key={user._id} className={`border rounded-lg mb-4 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
            <h3 className="font-bold text-lg">{user.name} {user.lastName}</h3>
            <p className="text-sm"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm"><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <button
              className="bg-red-900 text-white px-2 py-1 rounded mt-2"
              onClick={() => handleDeleteUser(user._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this user from the system permanently?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const AdminUserList = () => {
  const { usersData } = useAdminContext();
  const { users, isLoading, error, updateUser, deleteUser } = usersData;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const museumOwners = users.filter(user => user.role.roleName === 'MuseumOwner');
  const curators = users.filter(user => user.role.roleName === 'Curator');

  return (
    <div>
      <MuseumOwnerList users={museumOwners} updateUser={updateUser} deleteUser={deleteUser} />
      <CuratorList users={curators} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  );
};

export default AdminUserList;
