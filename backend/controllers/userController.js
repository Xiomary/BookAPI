const { HttpStatusCode } = require("axios");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const hashPassword = require('../utils/passwordUtils'); 
//const createToken = require('../utils/tokenUtils');

// // handle errors
// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let errors = { email: "", password: "" };

//   // Log validation errors if they exist
//   if (err.message.includes("user validation failed")) {
//     Object.values(err.errors).forEach((properties) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email) return res.status(400).send("Invalid email");
    if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters");

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).send("Email is already taken");

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    console.log("Saved user", user);
    

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000});
    console.log(res.getHeaders()['set-cookie']); 
   // Send back a response
    res.status(201).json({ message: "User created successfully", userId: user._id });

  } catch (error) {
    console.log("Error", error);
    return res.status(500).send("Error. Try again");
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  //get all users
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
    if (user) {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete user" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email;
    user.password = password;
    await user.save();
    res.status(200).json({ message: "User updated succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
