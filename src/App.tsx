import { useEffect, useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import "./App.css";
import ReadMates from "./pages/ReadMates";
import CreateMate from "./pages/CreateMate";
import { ColorPercentages, Mate, MateClass, MateColor } from "./types";
import { supabaseClient } from "./supabaseClient";

const App = () => {
  const [mates, setMates] = useState<Mate[]>([]);
  const [colorPercentages, setColorPercentages] = useState<ColorPercentages>();

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

  useEffect(() => {
    const colorCount: ColorPercentages = {
      [MateColor.RED]: 0,
      [MateColor.BLUE]: 0,
      [MateColor.GREEN]: 0,
      [MateColor.YELLOW]: 0,
      [MateColor.PURPLE]: 0,
      [MateColor.ORANGE]: 0,
    };

    mates.forEach((mate) => {
      colorCount[mate.color]++;
    });
    const totalMates = mates.length;

    // Calculate the percentage for each color
    const colorPercentages: ColorPercentages = Object.keys(colorCount).reduce(
      (acc, color) => {
        const colorKey = color as MateColor;
        acc[colorKey] = (colorCount[colorKey] / totalMates) * 100;
        return acc;
      },
      {} as ColorPercentages
    );

    setColorPercentages(colorPercentages);
  }, [mates]);

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
          Mates:
          <img src="among-us.svg" alt="Among Us" width={"100px"} />
        </h1>
        <div>
          {colorPercentages &&
            Object.entries(colorPercentages).map(([color, percentage]) => (
              <div key={color}>
                <strong>{color}</strong>: {percentage.toFixed(2)}%
              </div>
            ))}
        </div>
        <br />
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
