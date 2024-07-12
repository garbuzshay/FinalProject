import UserModel from '../Models/User.js';

export const getUsers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json({
        message: 'Users retrieved successfully',
        success: true,
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };
  export const getUserById = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          success: false,
        });
      }
      res.status(200).json({
        message: 'User retrieved successfully',
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };
  export const updateUser = async (req, res) => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          success: false,
        });
      }
      res.status(200).json({
        message: 'User updated successfully',
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };
  export const deleteUser = async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          success: false,
        });
      }
      res.status(200).json({
        message: 'User deleted successfully',
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };