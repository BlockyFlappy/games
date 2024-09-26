"use client";

import Connect from "../components/Connect";
import { BB } from "../components/BB.tsx";
import { Games } from "../components/games/Games";
import { TopList } from "../components/TopList.tsx";
import { SubmitScore } from "../components/SubmitScore.tsx";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <div className="relative  w-full h-full">
        <div className="is-left z-50">
          <Connect />
          <BB />
          <TopList />
          <SubmitScore />
        </div>
        <div className="is-right">
          <Games
            setScore={setScore}
            setBestScore={setBestScore}
            score={score}
            bestScore={bestScore}
          />
        </div>
      </div>
    </>
  );
}

export default App;
