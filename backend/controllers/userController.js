const User = require("../models/userModel");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = {email: '', password: ''}

  // validation errors
  if(err.message.includes('user validation failed')) {
    console.log(err);
  }
}

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
      res.status(200).json({user});
    }
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};

// Delete user
const deleteUser = async(req,res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({message: 'User deleted successfully'});
    }catch(error) {
        res.status(500).json({message: 'Could not delete user'});
    }
}

// Update user
const updateUser = async(req,res) => {
    const userId = req.params.id;
    const {username, email, password} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        res.status(200).json({message: 'User updated succesfully'});
        
    }catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
