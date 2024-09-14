import React, { useState, useEffect } from 'react';
import termsOfUseApi from '../../api/TermsOfUseApi';

const AdminTermsOfUse = () => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the current terms of use when the component mounts
    const fetchTermsOfUse = async () => {
      try {
        const response = await termsOfUseApi.getTermsOfUse();
        setContent(response.content); // Assuming the API returns content field
      } catch (error) {
        setMessage('Error fetching terms of use');
      }
    };
    fetchTermsOfUse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await termsOfUseApi.updateTermsOfUse({ content });
      setMessage('Terms of use updated successfully');
    } catch (error) {
      setMessage('Error updating terms of use');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Edit Terms of Use</h2>
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full border rounded p-2"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Terms of Use
        </button>
      </form>
    </div>
  );
};

export default AdminTermsOfUse;
