const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/", blogController.createBlog);         // POST /api/blogs
router.get("/", blogController.getAllBlogs);         // GET /api/blogs
router.get("/:id", blogController.getBlogById);      // GET /api/blogs/:id
router.put("/:id", blogController.updateBlog);       // PUT /api/blogs/:id
router.delete("/:id", blogController.deleteBlog);    // DELETE /api/blogs/:id

module.exports = router;

