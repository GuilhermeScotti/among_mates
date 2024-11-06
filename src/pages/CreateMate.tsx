// MyComponent.js
import React, { useEffect, useState } from "react";
import {
  CLASS_ALLOWED_COLORS,
  INITIAL_MATE,
  Mate,
  MateClass,
  MateColor,
} from "../types";
import { supabaseClient } from "../supabaseClient";
import { useParams } from "react-router-dom";

const CreateMate = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const [internalMate, setMate] = useState<Mate>(INITIAL_MATE);

  useEffect(() => {
    const fetchMate = async () => {
      const supabase = supabaseClient();
      const { data, error } = await supabase
        .from("Mates")
        .select()
        .eq("id", id)
        .single();

      if (!error && data) {
        const mateWithEnums: Mate = {
          ...data,
          color: data.color as MateColor,
          class: data.class as MateClass,
        };
        setMate(mateWithEnums);
      }
    };

    if (isEditing) {
      fetchMate();
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const updatedColor =
      name === "class"
        ? CLASS_ALLOWED_COLORS[value as MateClass][0]
        : internalMate.color;

    const updatedMate = {
      ...internalMate,
      color: updatedColor,
      [name]: value,
    };

    setMate(updatedMate);
  };

  const createPost = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const supabase = supabaseClient();

    if (isEditing) {
      await supabase
        .from("Mates")
        .update({
          name: internalMate.name,
          color: internalMate.color,
          class: internalMate.class,
        })
        .eq("id", internalMate.id);
    } else {
      await supabase
        .from("Mates")
        .insert({
          name: internalMate.name,
          color: internalMate.color,
          class: internalMate.class,
        })
        .select();
    }

    window.location.href = "/";
  };

  const deletePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const supabase = supabaseClient();

    await supabase.from("Mates").delete().eq("id", internalMate.id);

    window.location.href = "/";
  };

  return (
    <div>
      <form>
        <label htmlFor="title">Name</label> <br />
        <input
          type="text"
          id="name"
          name="name"
          value={internalMate.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="color">Select Class Color</label>
        <br />
        <select
          id="color"
          name="color"
          value={internalMate.color}
          onChange={handleColorChange}
        >
          {Object.values(CLASS_ALLOWED_COLORS[internalMate.class]).map(
            (color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}{" "}
              </option>
            )
          )}
        </select>
        <br />
        <br />
        <label htmlFor="class">Select Class</label>
        <br />
        <select
          id="class"
          name="class"
          value={internalMate.class}
          onChange={handleColorChange}
        >
          {Object.values(MateClass).map((className) => (
            <option key={className} value={className}>
              {className.charAt(0).toUpperCase() + className.slice(1)}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input type="submit" value="Submit" onClick={createPost} />
      </form>

      {isEditing && (
        <button className="deleteButton" onClick={deletePost}>
          Delete
        </button>
      )}
    </div>
  );
};

export default CreateMate;
