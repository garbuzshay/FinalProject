import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMuseumApi } from '../hooks/useMuseumApi';
import { useMuseum } from '../contexts/MuseumContext';

const MuseumLoginPage = () => {
  const [museumName, setMuseumName] = useState('');
  const [password, setPassword] = useState('');
  const { verifyPassword } = useMuseumApi();
  const { setMuseum, setExhibitions } = useMuseum();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyPassword(museumName, password);
      setMuseum(data);
      setExhibitions(data.exhibitions);
      navigate(`/${data.name}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login to Museum</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Museum Name"
            value={museumName}
            onChange={(e) => setMuseumName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default MuseumLoginPage;
