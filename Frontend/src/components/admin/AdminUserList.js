import React from 'react';
import useUser from '../../hooks/useUser';


const AdminUserList = () => {
    const { users, loading, error, updateUser, deleteUser } = useUser();

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-5">Users</h2>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/4 py-2">Name</th>
                        <th className="w-1/4 py-2">Museum</th>
                        <th className="w-1/4 py-2">Email</th>
                        <th className="w-1/4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.name} {user.lastName}</td>
                            <td className="border px-4 py-2">{user.museumName || 'N/A'}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => updateUser(user._id, { ...user, name: 'Updated Name' })}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserList;
