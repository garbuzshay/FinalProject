// Set the base URL for API requests
const config = {
  // apiBaseUrl: "http://localhost:8000/api",
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  // apiBaseUrl: 'https://final-project-plum-omega.vercel.app/api'
};

export default config;
