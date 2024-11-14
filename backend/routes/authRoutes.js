const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
} = require('../controllers/authController')



// POST a new user 
router.post('/signup', createUser)

// GET a list of users 
router.get('/', getAllUsers)

// GET a single user
router.get('/:id', getUser)

// UPDATE a user 

// DELETE a user 
router.delete('/:id/delete',deleteUser)

// UPDATE a user

module.exports = router
