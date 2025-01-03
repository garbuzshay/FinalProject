
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useVisitor } from "../contexts/VisitorContext";
  import SymbolMuseum from '../assets/MusuemSymbol.png';
  const MuseumLoginPage = () => {
    const [museumName, setMuseumName] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useVisitor();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState("");

    // Auto-login if URL contains museumName and password
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const autoMuseumName = params.get("museumName");
      const autoPassword = params.get("password");

      if (autoMuseumName && autoPassword) {
        setMuseumName(autoMuseumName);
        setPassword(autoPassword);

        // Trigger login with URL parameters
        handleAutoLogin(autoMuseumName, autoPassword);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAutoLogin = async (autoMuseumName, autoPassword) => {
      try {
        await login(autoMuseumName, autoPassword);
        navigate(`/${autoMuseumName}`);
      } catch (err) {
        setLocalError("Auto-login failed. Please enter your credentials manually.");
      }
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await login(museumName, password);
        navigate(`/${museumName}`);
      } catch (err) {
        setLocalError("Failed to log in. Please check your museum name and password.");
      }
    };

    return (

      <div className="relative w-full min-h-screen bg-gradient-to-t from-[#cfd7f7] via-white to-[#dfe4f9] flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-35">
        <div className="floating-squares" />
        <div className="gradient-overlay" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-6 bg-white bg-opacity-30  p-8 rounded-lg shadow-lg md:max-w-md">
      <div className="flex justify-center mb-3">
        <img src={SymbolMuseum} alt="Museum Symbol" className="w-36 h-36 object-contain" />
      </div>
        <h1 className="text-3xl font-bold mb-4 text-center ">
          Login to Museum
        </h1>
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 bg-opacity-55 text-white py-2 rounded-lg hover:bg-blue-600 duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {localError && <p className="text-red-500 mt-4">{localError}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-8 p-6 bg-white bg-opacity-80 rounded-xl text-gray-700 shadow-lg backdrop-blur-sm border border-gray-100">
  <div className="flex flex-col items-center space-y-4">
    <h3 className="font-semibold text-lg text-gray-800">Need Help?</h3>
    <div className="w-16 h-0.5 bg-blue-200 rounded-full"></div>
    <p className="text-center max-w-sm">
      Don't have your login details?
    </p>
    <p className="text-center text-sm text-gray-600">
      No problem! You can either:
    </p>
    <div className="flex flex-col space-y-2 text-center">
      <span className="flex items-center text-sm">
        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
        Scan the QR code at the museum entrance
      </span>
      <span className="flex items-center text-sm">
        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
        Ask any museum staff member for assistance
      </span>
    </div>
  </div>
</div>
      </div>

      <style>{`
        .floating-squares {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #38bdf8 1px, transparent 1px) 0 0,
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px) 0 0;
          background-size: 40px 40px;
          animation: square-animation 20s linear infinite;
          z-index: 0;
          opacity: 0.7;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1), #0f172a 70%);
          z-index: 1;
        }

        @keyframes square-animation {
          0% {
            transform: perspective(500px) rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: perspective(500px) rotateX(360deg) rotateY(360deg);
          }
        }
      `}</style>
      
    </div>
    );
  };

  export default MuseumLoginPage;
