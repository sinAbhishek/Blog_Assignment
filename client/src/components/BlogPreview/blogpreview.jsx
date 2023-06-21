import React from "react";
import { NavLink } from "react-router-dom";
const Preview = ({ data }) => {
  return (
    <NavLink to={"/blog"} state={data}>
      <div className=" w-1/4 h-60 relative rounded-md">
        <img className=" w-full h-full rounded-md" src={data.image} alt="" />
        <h2 className=" absolute bottom-2 left-0 right-0 m-2 font-semibold px-2 text-lg bg-white">
          {data.title}
        </h2>
      </div>
    </NavLink>
  );
};

export default Preview;
