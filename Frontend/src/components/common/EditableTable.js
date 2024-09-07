import React, { useState } from "react";

const EditableTable = ({ columns, data, actions }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(data[index]);
  };

  const handleChange = (e, field) => {
    setEditingData({ ...editingData, [field]: e.target.value });
  };

  const handleSave = async () => {
    await actions.onSave(editingData);
    setEditingIndex(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  return (
    <table className="min-w-full bg-white mb-5">
      <thead className="bg-gray-800 text-white">
        <tr>
          {columns.map((col) => (
            <th className="py-2" key={col.field}>
              {col.label}
            </th>
          ))}
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) =>
          editingIndex === index ? (
            <tr key={index}>
              {columns.map((col) => (
                <td className="border px-4 py-2" key={col.field}>
                  <input
                    className="w-full px-2 py-1 border rounded"
                    type={col.type || "text"}
                    value={editingData[col.field]}
                    onChange={(e) => handleChange(e, col.field)}
                  />
                </td>
              ))}
              <td className="border px-4 py-2 flex">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={index} onClick={() => handleEdit(index)}>
              {columns.map((col) => (
                <td className="border px-4 py-2" key={col.field}>
                  {row[col.field]}
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.onDelete(row._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default EditableTable;
