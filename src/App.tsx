import { useEffect, useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import "./App.css";
import ReadMates from "./pages/ReadMates";
import CreateMate from "./pages/CreateMate";
import { Mate, MateClass, MateColor } from "./types";
import { supabaseClient } from "./supabaseClient";

const App = () => {
  const [mates, setMates] = useState<Mate[]>([]);

  useEffect(() => {
    const fetchMates = async () => {
      const supaClient = supabaseClient();
      const { data } = await supaClient
        .from("Mates")
        .select()
        .order("created_at", { ascending: true });

      if (data) {
        const matesWithEnums: Mate[] = data.map((mate) => ({
          ...mate,
          color: mate.color as MateColor,
          class: mate.class as MateClass,
        }));
        setMates(matesWithEnums);
      }
    };
    fetchMates();
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element: <ReadMates data={mates} />,
    },
    {
      path: "/edit/:id",
      element: <CreateMate />,
    },
    {
      path: "/new",
      element: <CreateMate />,
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>
          Mates
          <img src="among-us.svg" alt="Among Us" width={"100px"} />
        </h1>
        <Link to="/">
          <button className="headerBtn"> Mates </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> Create Mate </button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
