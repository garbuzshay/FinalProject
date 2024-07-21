import UserModel from '../Models/User.js';
import ExhibitionModelonModel from '../Models/Exhibition.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: 'User already exists, you can login', success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: 'Signup successful',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password', success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password', success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    
    res.status(200).json({
      message: 'Login successful',
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

///
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    const userRole = req.userRole;
    const museum = req.museum;

    let responseData = {
      name: user.name,
      role: userRole,
    };

    if (userRole === 'museumOwner') {
      responseData.museumName = museum?.name;
    } else if (userRole === 'curator') {
      responseData.museumName = museum?.name;
      responseData.exhibitName = 'ExhibitName'; // Adjust accordingly if you have an exhibit service
      // responseData.museumName = (await ExhibitionModelonModel.find({ curators: user._id }).populate('museum'));
    }

    res.status(200).json({
      message: 'User details retrieved successfully',
      success: true,
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

////