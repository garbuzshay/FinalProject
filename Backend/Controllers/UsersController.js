import UsersService from '../Services/UsersService.js';

/**
 * Creates a new user.
 */
export const createUser = async (req, res) => {
  try {
    const user = await UsersService.createUser(req.body);
    res.status(201).json({
      message: 'User created successfully',
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

/**
 * Retrieves all users.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await UsersService.getUsers(req.user?._id);
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

/**
 * Retrieves a user by ID.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await UsersService.getUserByUid(req.params.id);
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

/**
 * Updates a user by ID.
 */
export const updateUser = async (req, res) => {
  try {
    const user = await UsersService.updateUser(req.params.id, req.body);
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

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await UsersService.deleteUser(req.params.id);
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
