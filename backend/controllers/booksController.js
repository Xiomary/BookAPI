const Book = require("../models/booksModel");

// GET all books 
const getAllBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
};

// GET single book
const getBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "No such book" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE book
const createBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const newBook = await Book.create({ title: title, author: author, genre: genre });
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE book// UPDATE book
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre } = req.body;
  console.log("Request body data", req.body);

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if required fields are present in the request body
    if (!title || !author || !genre) {
      return res.status(400).json({ error: 'Title, author, and genre are required' });
    }

    // Update book properties
    book.title = title;
    book.author = author;
    book.genre = genre;

    // Save the updated document
    await book.save();

    res.status(200).json({ message: 'Book successfully updated', book });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  getBook,
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
}