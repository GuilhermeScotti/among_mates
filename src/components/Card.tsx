import "./Card.css";
import { Link } from "react-router-dom";
import { Mate } from "../types";

interface CardProps {
  mate: Mate;
}

const Card = (props: CardProps) => {
  const { mate } = props;
  const style = {
    backgroundColor: mate.color,
  };

  return (
    <div className="Card">
      <h4>{"Name: " + mate.name}</h4>
      <h4>{"Class: " + mate.class}</h4>
      <h4>{"Color: " + mate.color}</h4>

      <img
        src="/public/among-us.svg" // Make sure the SVG has an `id` attribute for referencing
        alt="Icon"
        width={100}
        style={style} // Use CSS filter if needed for simple color adjustments
      />
      <br />

      <Link to={"edit/" + mate.id}>edit..</Link>
    </div>
  );
};

export default Card;
