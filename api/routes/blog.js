import express from "express";
import {
  Deleteblog,
  createBlog,
  getblogbyId,
  getblogs,
  updateBlog,
} from "../controller/Blog.js";
const router = express.Router();

router.post("/create", createBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", Deleteblog);
router.get("/get", getblogs);
router.get("/get/:id", getblogbyId);

export default router;
