const mongoose = require('mongoose');
const { Schema } = mongoose;  // Destructure Schema from mongoose

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date
  },
  genre: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
