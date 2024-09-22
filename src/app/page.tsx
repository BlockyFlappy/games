"use client";

import Connect from "../components/Connect";
import { A } from "../components/A";
import { BB } from "../components/BB.tsx";
import { Games } from "../components/games/Games";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <div className="relative  w-full h-full">
        <div className="is-left absolute z-50">
          <Connect />
          <A />
          <BB score={score} bestScore={bestScore} />
        </div>
        <div className="is-right" >
          <Games setScore={setScore} setBestScore={setBestScore} score={score} bestScore={bestScore} />
        </div>

      </div>

    </>
  );
}

export default App;
