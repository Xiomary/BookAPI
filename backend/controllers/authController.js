const User = require("../models/userModel");

// Create a new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Failed to create user" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  //get all users
  const users = await User.find();
  res.status(200).json(users);
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Failed to get all users" });
  }
};

// Get single user
const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user

// Delete user

module.exports = {
  createUser,
  getAllUsers,
};
