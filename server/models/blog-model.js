const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      minlength: 10,
    },

    author: {
      type: String,
      required: true,
      minelength: 3,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
