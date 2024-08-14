import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Todo from "../Components/Todo";

const Allroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  );
};

export default Allroutes;
