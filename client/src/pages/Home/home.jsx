import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../Hook/AuthContext.js";
import { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import { FaUpload, FaLocationArrow } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Preview from "../../components/BlogPreview/blogpreview";

const Home = () => {
  const [isOpen, setopen] = useState(false);
  const { user_details } = useContext(AuthContext);
  const [image, setimage] = useState("Upload Image");
  const [Loading, setloading] = useState(false);
  const [blog, setblog] = useState([]);
  const onClose = () => setopen(false);
  const onOpen = () => setopen(true);
  const [value, setvalue] = useState({ title: "", description: "" });
  const Url = process.env.REACT_APP_Url;

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${Url}/blog/get`);
      setblog(res.data);
    };
    call();
  }, []);
  const handlechange = (e) => {
    setvalue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const uploadImage = (e) => {
    setvalue((prev) => ({ ...prev, [e.target.id]: e.target.files[0] }));
    setimage(e.target.files[0].name);
  };

  const sendBlog = async () => {
    console.log(value);
    const formdata = new FormData();
    formdata.append("name", user_details.firstname);
    formdata.append("userid", user_details._id);
    formdata.append("title", value.title);
    formdata.append("profileImg", user_details.profileImg);
    formdata.append("description", value.description);
    formdata.append("blogimg", value.file);
    console.log(...formdata);
    const call = async () => {
      setloading(true);
      const res = await axios.post(`${Url}/blog/create`, formdata);
      setloading(false);
      toast.success("Blog uploaded successfully", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };
    call();
  };

  return (
    <div>
      <Navbar />
      <div className=" w-screen flex justify-center items-center h-24">
        <button
          className=" text-xl font-semibold bg-indigo-400 h-8 w-max px-2 flex items-center rounded-md"
          onClick={onOpen}
        >
          <AiOutlinePlus />
          Create Blog
        </button>
      </div>

      <div className=" mt-56">
        <h2 className=" font-bold text-slate-800 text-4xl">Blogs</h2>
        <div className=" mt-4">
          {blog[0]
            ? blog.map((c) => <Preview key={c._id} data={c} />)
            : "No blogs"}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form action="" onSubmit={sendBlog} className=" flex flex-col p-8">
            <label htmlFor="">
              <h2 className=" text-2xl font-semibold">Title</h2>
            </label>
            <input
              id="title"
              type="text"
              required
              className=" border px-2 mt-2 rounded-md"
              placeholder="Title"
              onChange={handlechange}
            />
            <label htmlFor="">
              <h2 className=" text-2xl mt-3 font-semibold ">Description</h2>
            </label>
            <textarea
              id="description"
              type="text"
              required
              className=" border px-2 h-40 mt-2 rounded-md"
              placeholder="Description"
              onChange={handlechange}
            />

            <input
              className="hide hidden "
              type="file"
              id="file"
              required
              onChange={uploadImage}
            />
            <label
              htmlFor="file"
              className=" mt-4 flex items-center bg-emerald-400 w-max px-4 py-1 rounded-md  "
            >
              <FaUpload /> {image}
            </label>
            <div className=" flex justify-center">
              <button
                type="submit"
                className=" bg-stone-900 text-slate-100 rounded-md px-2 w-max"
              >
                Submit
              </button>
            </div>
            <ClipLoader
              color={"red"}
              loading={Loading}
              size={17}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="cliplod"
            />
          </form>
        </ModalContent>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Home;
