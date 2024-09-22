
import FlappyBird from "./flappybird.js";
import { useEffect, useState, useRef } from "react";
import './games.css'

let game: any = null;

export const Games = ({ setScore, setBestScore, score, bestScore, }) => {
  const isCanvas = useRef(null);
  // const [score, setScore] = useState(0);  // const [bestScore, setBestScore] = useState(0);
  let getScore = () => {
    setScore(game.getScore())
    console.log('>>>FlappyBird', game.getScore());
  }
  let getBestScore = () => {
    setBestScore(game.getBestScore())
    console.log('>>>FlappyBird', game.getBestScore());
  }
  let gameOver = (v: number) => {
    console.log('>>>gameOver', v);
  }

  useEffect(() => {
    //获取画布dom
    //  this.canvas = document.getElementById("canvas");
    game = new FlappyBird(isCanvas.current, gameOver);

    game.init();
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-60 left-0">
        <h1 onClick={getScore} className="btn rounded-sm border-solid border-2">获取本剧分数-- <span className="text-white">{score}</span> --</h1>
        <h1 onClick={getBestScore} className="btn rounded-sm border-solid border-2 mt-6">获取最高分数--<span className="text-white">{bestScore}</span>--</h1>
      </div>
      <canvas id="canvas" ref={isCanvas}></canvas>

    </div>
  );
};
