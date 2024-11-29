const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,

} = require('../controllers/userController')

// POST a new user 
router.post('/signup', createUser)

// GET a list of users 
router.get('/', getAllUsers)

// GET a single user
router.get('/:id', getUser)

// UPDATE a user 
router.put('/:id',updateUser)

// DELETE a user 
router.delete('/:id/delete',deleteUser)

module.exports = router
