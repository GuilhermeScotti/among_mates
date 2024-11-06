import React from "react";
import { useState } from "react";
import "./Card.css";
// import more from "./more.png";
// import { supabase } from "../client";
import { Link } from "react-router-dom";
import { Mate } from "../types";

interface CardProps {
  data: Mate;
}

const Card = (props: CardProps) => {
  const { data } = props;
  // const [count, setCount] = useState(props.betCount);
  // const updateCount = async (event) => {
  //   event.preventDefault();

  //   await supabase
  //     .from("Posts")
  //     .update({ betCount: count + 1 })
  //     .eq("id", props.id);

  //   // setCount((count) => count + 1);
  // };

  return (
    <div className="Card">
      <Link to={"edit/" + data.id}>+</Link>
      <h2 className="title">{data.name}</h2>
      <h3 className="author">{"by " + data.class}</h3>
      <p className="description">{data.color}</p>
      {/* <button className="betButton" onClick={updateCount}>
        👍 Bet Count: {count}
      </button> */}
    </div>
  );
};

export default Card;
