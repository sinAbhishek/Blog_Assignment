import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./blog.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import { FaUpload, FaLocationArrow } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState("");
  const [date, setdate] = useState("");
  const [image, setimage] = useState("Upload Image");
  const [Loading, setloading] = useState(false);
  const [value, setvalue] = useState("");
  const [isOpen, setopen] = useState(false);
  const onClose = () => setopen(false);
  const onOpen = () => setopen(true);
  const Url = process.env.REACT_APP_Url;
  useEffect(() => {
    console.log(location);
    const call = async () => {
      const res = await axios.get(`${Url}/blog/get/${location.state._id}`);
      setdata(res.data);
      setvalue(res.data);
      setdate(new Date(location.state.createdAt).toDateString());
    };
    location.state && call();
  }, [Loading]);
  const handlechange = (e) => {
    e.preventDefault();
    setvalue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const uploadImage = (e) => {
    e.preventDefault();
    setvalue((prev) => ({ ...prev, [e.target.id]: e.target.files[0] }));
    setimage(e.target.files[0].name);
  };
  const sendBlog = async (e) => {
    e.preventDefault();
    console.log(value);
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("userid", data._id);
    formdata.append("title", value.title);
    formdata.append("profileImg", data.profileImg);
    formdata.append("description", value.description);
    formdata.append("blogimg", value.file);
    console.log(...formdata);
    const call = async () => {
      setloading(true);
      const res = await axios.put(`${Url}/blog/update/${data._id}`, formdata);
      setloading(false);
      onClose();
      toast.success("Blog updated successfully", {
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
  const drop = async () => {
    setloading(true);
    const res = await axios.delete(`${Url}/blog/delete/${data._id}`);
    setloading(false);
    navigate("/");
  };
  return (
    <div className=" w-screen h-max flex justify-center ">
      {data && (
        <div className=" w-9/12">
          <h2 className=" text-4xl font-bold my-8 text-slate-800">
            {data.title}
          </h2>
          <hr className=" h-6 " />
          <img className="image w-full " src={data.image} alt="" />
          <div className=" flex justify-between mt-16 items-center">
            <div className="flex items-center">
              <img
                src={data.profileImg}
                alt=""
                className=" w-16 h-16 rounded-full mr-2"
              />
              <h3 className=" font-medium underline">{data.name}</h3>
            </div>
            {date && <div className=" text-lg font-medium">{date}</div>}
            <div className="">
              <button onClick={onOpen} className=" flex items-center text-lg">
                <BiEditAlt size={"1.5rem"} />
                Edit
              </button>
              <button onClick={drop} className=" flex items-center text-lg">
                <MdDelete size={"1.5rem"} />
              </button>
            </div>
          </div>
          <p className=" mt-16 font-medium">{data.description}</p>
        </div>
      )}
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
              value={value.title}
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
              value={value.description}
              onChange={handlechange}
            />

            <input
              className="hidden"
              type="file"
              id="file"
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
            <div className=" flex justify-center mt-2">
              <HashLoader
                color={"red"}
                loading={Loading}
                size={17}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="cliplod"
              />
            </div>
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

export default Blog;
