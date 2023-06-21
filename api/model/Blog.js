import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Blogs", BlogSchema);
