// src/services/auth.js
import { auth } from '../configuration/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export const subscribeToAuthChanges = (onAuthChange) => {
  return onAuthStateChanged(auth, onAuthChange);
};

export const loginWithEmailPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const idTokenResult = await user.getIdTokenResult();
  const userWithRole = { ...user, role: idTokenResult.claims.role };
  localStorage.setItem('userToken', await user.getIdToken(true));
  
  return userWithRole;
};

export const logoutUser = async () => {
  await auth.signOut();
  localStorage.removeItem('userToken');
};
