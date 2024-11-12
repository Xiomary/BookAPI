const Book = require('../models/booksModel')

const create  = require('../controllers/booksController');
const { request } = require('express');
const app = require('../server');  // Import the app (Express instance)

// test my post request
describe('Creating a new book', () => {
    it.only("Should create a new book and return the book details", async () => {
        const newBook = {
            title: "The Alchemist",
            author: "Paulo Coelho",
            genre: "Nonfiction"
        };
        //const response = await Book.create(newBook);
        const response = await request(app)
        .post('/api/books')
        .send(newBook)
        .set('Content-Type', 'application/json'); // Set content-type header

        // expect 
        

    })
})

