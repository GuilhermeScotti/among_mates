// MyComponent.js
import React, { useState } from "react";
import { Mate } from "../types";

const CreateMate = () => {
  const [mate, setMate] = useState<Mate>();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .insert({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .select();

    window.location = "/";
  };

  return (
    <div>
      <form>
        <label for="title">Title</label> <br />
        <input type="text" id="title" name="title" onChange={handleChange} />
        <br />
        <br />
        <label for="author">Author</label>
        <br />
        <input type="text" id="author" name="author" onChange={handleChange} />
        <br />
        <br />
        <label for="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" onClick={createPost} />
      </form>
    </div>
  );
};

export default CreateMate;
