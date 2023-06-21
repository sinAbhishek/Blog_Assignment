import React, { useEffect, useState } from "react";
import axios from "axios";
import "./register.css";

import { FaUpload, FaLocationArrow } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [value, setvalue] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    file: "",
  });

  const [image, setimage] = useState("Upload Image");
  const [active, setActive] = useState(false);
  const [err, seterr] = useState(false);
  const [location, setlocation] = useState("");
  const [Loading, setloading] = useState(false);
  const Url = process.env.REACT_APP_Url;
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handlechange = (e) => {
    setvalue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const uploadImage = (e) => {
    setvalue((prev) => ({ ...prev, [e.target.id]: e.target.files[0] }));
    setimage(e.target.files[0].name);
  };
  const SendImage = async () => {
    if (
      value.username.length == 0 ||
      value.firstname.length == 0 ||
      value.lastname.length == 0 ||
      value.password.length == 0 ||
      value.file.length == 0
    ) {
      setActive(true);
    } else {
      const formdata = new FormData();
      formdata.append("username", value.username);
      formdata.append("firstname", value.firstname);
      formdata.append("lastname", value.lastname);
      formdata.append("password", value.password);
      formdata.append("file", value.file);
      console.log(...formdata);
      const call = async () => {
        setloading(true);
        const res = await axios.post(`${Url}/auth/register`, formdata);
        setloading(false);
        toast.success("registered successfully", {
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
      navigate("/");
    }
  };

  return (
    <div className="registerContainer">
      <h1 className="log-h1">REGISTER</h1>
      <form action="submit">
        <div className="form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handlechange}
            required
          />

          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            onChange={handlechange}
            required
          />

          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            onChange={handlechange}
            required
          />

          <input
            type="text"
            id="password"
            placeholder="Password"
            onChange={handlechange}
            required
          />

          <input
            className="fileInp"
            onChange={uploadImage}
            id="file"
            type="file"
            name="image"
            required
          />
        </div>
        <div className="fileSelect">
          <label htmlFor="file">
            <FaUpload /> {image}
          </label>
        </div>
      </form>

      <button onClick={SendImage}> Register</button>
      <ClipLoader
        color={"red"}
        loading={Loading}
        size={17}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="cliplod"
      />
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

export default Register;
