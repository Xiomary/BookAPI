const express = require('express')
const router = express.Router()
const {
    createBook,
    getBook,
    getAllBooks,
    deleteBook,
    updateBook,
} = require('../controllers/booksController')

// GET a single book
router.get('/:id', getBook)

// POST a new book
router.post('/', createBook)

// GET all books
router.get('/', getAllBooks)

// DELETE a book
router.delete('/:id', deleteBook)

// UPDATE a book
router.put('/:id',updateBook)
module.exports = router