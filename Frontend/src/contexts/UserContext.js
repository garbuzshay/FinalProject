// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { subscribeToAuthChanges, loginWithEmailPassword, logoutUser } from '../utils/auth';
// import { rolePaths } from '../data/rolePaths';
// import usersApi from '../api/UsersApi'; // Import the UsersApi

// // Create a context for the user
// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchUserFromDB = async () => {
//     try {
//       const userData = await usersApi.getCurrentUser();
//       return userData;
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
//       if (firebaseUser) {
//         const idTokenResult = await firebaseUser.getIdTokenResult();
//         const userWithRole = { ...firebaseUser, role: idTokenResult.claims.role };

//         try {
//           const userData = await fetchUserFromDB();
//           setUser({ ...userWithRole, ...userData });
//           localStorage.setItem('userToken', await firebaseUser.getIdToken(true));
//         } catch (error) {
//           console.error('Error setting user:', error);
//           setUser(null);
//           localStorage.removeItem('userToken');
//         }
//       } else {
//         setUser(null);
//         localStorage.removeItem('userToken');
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const firebaseUser = await loginWithEmailPassword(email, password);
//       const userData = await fetchUserFromDB();
//       setUser({ ...firebaseUser, ...userData });

//       // Redirect based on role
//       const rolePath = rolePaths[firebaseUser.role]?.dashboard || '/unauthorized';
//       navigate(rolePath);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//       setUser(null);
//       navigate('/login');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user,setUser, login, logout, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };


// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAuthChanges, loginWithEmailPassword, logoutUser } from '../utils/auth';
import { rolePaths } from '../data/rolePaths';
import usersApi from '../api/UsersApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserFromDB = async () => {
    try {
      const userData = await usersApi.getCurrentUser();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idTokenResult = await firebaseUser.getIdTokenResult();
          const userRole = idTokenResult.claims.role;
          const userData = await fetchUserFromDB();

          setUser({ ...firebaseUser, role: userRole, ...userData });
          localStorage.setItem('userToken', await firebaseUser.getIdToken(true));

          // Redirect based on role
          const rolePath = rolePaths[userRole]?.dashboard || rolePaths.Unauthorized.dashboard;
          navigate(rolePath);
        } catch (error) {
          console.error('Error setting user:', error);
          setUser(null);
          localStorage.removeItem('userToken');
        }
      } else {
        setUser(null);
        localStorage.removeItem('userToken');
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const firebaseUser = await loginWithEmailPassword(email, password);
      const userData = await fetchUserFromDB();
      const userRole = userData.role;

      setUser({ ...firebaseUser, role: userRole, ...userData });
      localStorage.setItem('userToken', await firebaseUser.getIdToken(true));

      // Redirect based on role
      const rolePath = rolePaths[userRole]?.dashboard || rolePaths.Unauthorized.dashboard;
      navigate(rolePath);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('userToken');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
