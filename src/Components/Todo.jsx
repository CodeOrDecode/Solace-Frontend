import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  async function getTodoData() {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      let res = await fetch(
        "https://solace-round-1.onrender.com/book/allbook",
        {
          method: "GET",
          headers: { authorization: `bearer ${token}` },
        }
      );

      let res2 = await res.json();
      // console.log(res2.books)
      setData(res2.books);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleAuthor(event) {
    setAuthor(event.target.value);
  }

  async function handleAdd() {
    let token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch("https://solace-round-1.onrender.com/book/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ title, author }),
    });
    let res2 = await res.json();
    console.log("add it");
    getTodoData();
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/")
  }

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="enter title"
        value={title}
        onChange={handleTitle}
      />
      <input
        type="text"
        placeholder="enter author"
        value={author}
        onChange={handleAuthor}
      />
      <button onClick={handleAdd}>Add book</button>
      <button onClick={handleLogout}>Logout</button>
      {data.length == 0 && <p>No todo data present</p>}
      {data.map((ele) => {
        return (
          <div key={ele._id}>
            <p>{ele.title}</p>
            <p>{ele.author}</p>
          </div>
        );
      })}
    </>
  );
};

export default Todo;
