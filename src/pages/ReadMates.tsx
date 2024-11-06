import { Mate } from "../types";
import Card from "../components/Card";

interface ReadMatesProps {
  data: Mate[];
}

const ReadMates = (props: ReadMatesProps) => {
  const { data } = props;

  return (
    <div className="ReadPosts">
      {data && data.length > 0 ? (
        data.map((mate) => <Card key={mate.id} mate={mate} />)
      ) : (
        <h2>{"No Mates Yet 😞"}</h2>
      )}
    </div>
  );
};

export default ReadMates;
