const blogModel = require("../models/blog-model");

//create blog controller

const create = async (req, res) => {
  try {
    const { imgUrl, title, content, author } = req.body;
    //basic validation
    if (!imgUrl || !title || !content || !author) {
      return res.status(409).json({ message: "All fields are required" });
    }

    //create blog
    const blog = await blogModel.create({ imgUrl, title, content, author });
    const data = {
      imgUrl: blog.imgUrl,
      title: blog.title,
      content: blog.content,
      author: blog.author,
    };
    return res.status(201).json({ message: "Blog is created!", data: data });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

//fetch all blog controller

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    if (blogs.length === 0) {
      return res.status(401).json({ message: "No records..." });
    }

    return res.status(200).json({ message: "all blogs", data: blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//single blog fetch controller
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const getblog = await blogModel.findById(id);
    if (!getblog) {
      return res.status(409).json({ message: "no blog found" });
    }
    return res.status(200).json({ message: "fetch blog", data: getblog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// update blog details controller

const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const editBlogData = req.body;
    const updatedBlog = await blogModel.findByIdAndUpdate(id, editBlogData, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(409).json({ message: "Something wrong.." });
    }
    return res.status(200).json({ message: "Blog Updated...", editBlogData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// delete blog controller
const deleteBlog = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteData = await blogModel.findByIdAndDelete(id)
    if(!deleteData){
      return res.status(404).json({message:"blog is not deleted"})
    }
    return res.status(200).json({message:"successful deleted..."})
  } catch (error) {
    return res.status(500).json({message:"Internal server error"})
  }
};
module.exports = { create, getAllBlogs, getSingleBlog, editBlog, deleteBlog };
