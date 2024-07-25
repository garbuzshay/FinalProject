
// import React from "react";
// import useUser from "../../hooks/useUser";

// const MuseumOwnerList = ({ users, updateUser, deleteUser }) => (
//   <div className="p-4">
//     <h2 className="text-2xl font-semibold mb-5">Museum Owners</h2>
//     <table className="min-w-full bg-white">
//       <thead className="bg-gray-800 text-white">
//         <tr>
//           <th className="w-1/5 py-2">Name</th>
//           <th className="w-1/5 py-2">Museum Name</th>
//           <th className="w-1/5 py-2">Email</th>
//           <th className="w-1/5 py-2">Phone Number</th>
//           <th className="w-1/5 py-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id}>
//             <td className="border px-4 py-2">
//               {user.name} {user.lastName}
//             </td>
//             <td className="border px-4 py-2">{user.museum?.name || "N/A"}</td>
//             <td className="border px-4 py-2">{user.email}</td>
//             <td className="border px-4 py-2">{user.phoneNumber}</td>
//             <td className="border px-4 py-2">
//               <button
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//                 onClick={() => deleteUser(user._id)}
//               >
//                 Block User
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const CuratorList = ({ users, updateUser, deleteUser }) => (
//   <div className="p-4">
//     <h2 className="text-2xl font-semibold mb-5">Curators</h2>
//     <table className="min-w-full bg-white">
//       <thead className="bg-gray-800 text-white">
//         <tr>
//           <th className="w-1/4 py-2">Name</th>
//           <th className="w-1/4 py-2">Email</th>
//           <th className="w-1/4 py-2">Phone Number</th>
//           <th className="w-1/4 py-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id}>
//             <td className="border px-4 py-2">
//               {user.name} {user.lastName}
//             </td>
//             <td className="border px-4 py-2">{user.email}</td>
//             <td className="border px-4 py-2">{user.phoneNumber}</td>
//             <td className="border px-4 py-2">
//               <button
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//                 onClick={() => deleteUser(user._id)}
//               >
//                 Block User
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const AdminUserList = () => {
//   const { users, loading, error, updateUser, deleteUser } = useUser();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;
//   console.log(users);

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
import useUser from "../../hooks/useUser";
import FormConfirmButton from "../common/FormConfirmButton";
import ConfirmationDialog from "../common/ConfirmationDialog";

const MuseumOwnerList = ({ users, updateUser, deleteUser }) => {
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
      <h2 className="text-2xl font-semibold mb-5">Museum Owners</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Museum Name</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Phone Number</th>
            <th className="w-1/5 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">
                {user.name} {user.lastName}
              </td>
              <td className="border px-4 py-2">{user.museum?.name || "N/A"}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Block User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to block this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const CuratorList = ({ users, updateUser, deleteUser }) => {
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
      <h2 className="text-2xl font-semibold mb-5">Curators</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/4 py-2">Name</th>
            <th className="w-1/4 py-2">Email</th>
            <th className="w-1/4 py-2">Phone Number</th>
            <th className="w-1/4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">
                {user.name} {user.lastName}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Block User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to block this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const AdminUserList = () => {
  const { users, loading, error, updateUser, deleteUser } = useUser();

  if (loading) return <div>Loading...</div>;
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
