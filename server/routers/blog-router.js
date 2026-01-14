const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth-middleware");
const isAdmin = require('../middleware/admin-middleware')
const {
  create,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteBlog
} = require("../controllers/blog-controller");

router.route("/create/blog").post(isAuth,isAdmin, create);
router.route("/blogs").get(isAuth,getAllBlogs);
router.route("/blog/:id").get(isAuth,getSingleBlog);
router.route("/blog/:id").put(isAuth,isAdmin, editBlog);
router.route("/blog/:id").delete(isAuth,isAdmin, deleteBlog);

module.exports = router;
