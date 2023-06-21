import Blog from "../model/Blog.js";
import datauri from "datauri/parser.js";
import cloud from "cloudinary";
import dotenv from "dotenv";
import path from "path";

import { createError } from "../util/error.js";

const parser = new datauri();

dotenv.config();
const cloudinary = cloud.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const createBlog = async (req, res, next) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const extname = path.extname(req.files.blogimg.name).toString();
    const file64 = parser.format(extname, req.files.blogimg.data);
    const result = await cloudinary.uploader.upload(file64.content, options);

    const newBlog = new Blog({
      ...req.body,
      image: result.secure_url,
    });
    const savedblog = await newBlog.save();
    res.status(200).json(savedblog);
  } catch (error) {
    console.error(error);
  }
};
export const updateBlog = async (req, res, next) => {
  console.log(req.body);
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const blog = await Blog.findById(req.params.id);
    if (req.files) {
      const extname = path.extname(req.files.blogimg.name).toString();
      const file64 = parser.format(extname, req.files.blogimg.data);
      const result = await cloudinary.uploader.upload(file64.content, options);
      const update = await Blog.replaceOne(
        { _id: req.params.id },
        { ...req.body, image: result.secure_url }
      );
      res.status(200).json(update);
    } else {
      const update = await Blog.replaceOne(
        { _id: req.params.id },
        { ...req.body, image: blog.image }
      );
      res.status(200).json(update);
    }
  } catch (error) {
    console.error(error);
  }
};
export const Deleteblog = async (req, res, next) => {
  try {
    const deleted = await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
  }
};
export const getblogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
  }
};
export const getblogbyId = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
};
