const mongoose = require("mongoose");

// define Blog Schema
const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    minlength: 4,
    maxlength: 30,
    required: true,
  },
  title: {
    type: String,
    minlength: 4,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 4,
    maxlength: 500,
    required: true,
  },
  detail: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
  },
});

// Model 
const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;