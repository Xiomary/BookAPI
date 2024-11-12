const Book = require("../models/booksModel");

// get all books
const getAllBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(books);
};

// Get a single book
const getBook = async (req, res) => {
  const { id } = req.params; // Extracting the book ID from the request parameters
  // second comment 
  try {
    const book = await Book.findById(id); // Fetch the book from the database

    if (!book) {
      return res.status(404).json({ error: "No such book" }); // Not found
    }
    res.status(200).json(book); // Send back the found book with a 200 status
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" }); // Handle server errors
  }
};

// create book
const createBook = async (req, res) => {
  const { title, author, genre } = req.body; // Access data from req.body

  const newBook = await Book.create({
    title: title,
    author: author,
    genre: genre,
  });

  try {
    await newBook.save();
    console.log(newBook.title, newBook.author, newBook.genre);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete book
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
      res.status(500).json({ error: error.message }); // Use 500 for server-related errors
    }
  };
  
module.exports = {
  getBook,
  getAllBooks,
  createBook,
  deleteBook,
};
