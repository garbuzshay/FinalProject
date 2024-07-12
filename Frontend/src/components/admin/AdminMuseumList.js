// src/components/AdminMuseumList.js
import React from 'react';
import museumsData from '../../data/museumsData';

const AdminMuseumList = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-5">Museums</h2>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/3 py-2">Name</th>
                        <th className="w-1/3 py-2">Location</th>
                        <th className="w-1/3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {museumsData.map((museum, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{museum.name}</td>
                            <td className="border px-4 py-2">{museum.location}</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500 hover:text-blue-700">View and Edit</button>
                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMuseumList;
