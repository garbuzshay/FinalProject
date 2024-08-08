import { useState, useEffect } from "react";
import UsersApi from "../api/UsersApi";

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await UsersApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      const newUser = await UsersApi.createUser(userData);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again later.");
    }
  };

  const updateUser = async (id, updatedUserData) => {
    try {
      const updatedUser = await UsersApi.updateUser(id, updatedUserData);
      setUsers(users.map((user) => (user._id === id ? updatedUser : user)));
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again later.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await UsersApi.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again later.");
    }
  };

  return { users, loading, error, createUser, updateUser, deleteUser, fetchUsers };
};

export default useUser;
