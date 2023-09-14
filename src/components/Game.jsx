import React, { useState, useRef, useEffect } from "react";

import Button from "./Button";
import words from "../games/english/game_0.json"
import Holloween from "../games/english/holloween.json"
import { CirclePicker } from "react-color";

const Game = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [disable, setDisable] = useState(false)
  const [reset, setReset] = useState(true)
  const [data, setData] = useState([])
  const [word, setWord] = useState('')
  const [list, setList] = useState([])
  const [rand, setRand] = useState(0)
  const [color, setColor] = useState("#000000");
  const [seconds, setSeconds] = useState(45);
  const [isActive, setIsActive] = useState(false);
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)



  const openNewTab = () => {
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <html>
          <head>
            <title>Mirrored Drawing</title>
          </head>
          <style>
            body{
              background-color: rgb(177, 253, 253);
              text-align: center;
            }
            h2 {
              background-color: yellow;
              padding: 2px 3px 2px 3px;
              border: 2px solid black;
            }
            .container{
              width: 100%
            }
            #mirroredCanvas {
              border: 2px solid black;
              background-color: #fff;
            }
            .score {
              display: flex;
              justify-content: space-around;
              align=items: center;
            } 
          </style>
          <body>
            <div class="container">
              <div class="score">
                <div>
                  <h3>Team A Score:</h3>
                  <h2 id="mirrorTeamA"></h2>
                </div>
                <div>
                  <h1 id="mirrorTimer"></h1>
                </div>
                <div>
                  <h3>Team B Score: </h3>
                  <h2 id="mirrorTeamB"></h2>
                </div>
              </div>
              <canvas id="mirroredCanvas" width="900" height="400"></canvas>
            </div>
            <script>
              const mirroredCanvas = document.getElementById('mirroredCanvas');
              const mirroredTeamA = document.getElementById("mirrorTeamA")
              const mirroredTeamB = document.getElementById("mirrorTeamB")
              const mirroredTimer = document.getElementById("mirrorTimer")
              const parentWindow = window.opener;
              const parentCanvas = parentWindow.document.querySelector('canvas');
              const parentTeamA = parentWindow.document.getElementById('teamA');
              const parentTeamB = parentWindow.document.getElementById('teamB');
              const parentTimer = parentWindow.document.getElementById('timer');

              const ctx = mirroredCanvas.getContext('2d');

              

              const mirrorTeamAScore = () => {
                mirroredTeamA.innerHTML=parentTeamA.innerHTML
                requestAnimationFrame(mirrorTeamAScore)
              }
              const mirrorTeamBScore = () => {
                mirroredTeamB.innerHTML=parentTeamB.innerHTML
                requestAnimationFrame(mirrorTeamBScore)
              }
              const mirrorTimer = () => {
                mirroredTimer.innerHTML=parentTimer.innerHTML
                requestAnimationFrame(mirrorTimer)
              }

              const mirrorDrawing = () => {
                ctx.clearRect(0, 0, mirroredCanvas.width, mirroredCanvas.height);
                ctx.drawImage(parentCanvas, 0, 0);
                requestAnimationFrame(mirrorDrawing);
              };
              mirrorTeamAScore();
              mirrorTeamBScore();
              mirrorTimer();
              mirrorDrawing();
            </script>
          </body>
        </html>
      `);
    }
  };




  

  useEffect(() => {
    setData(Holloween.words)
  },[])
 
  function generateWord(){
    const index = Math.floor(Math.random() * data.length);
    setWord(data[index])
    setRand(rand + 1)
    setList(() => [...list, data[index]])
    if (rand === 1){
      setDisable(true)
      setReset(true)
    }
  }

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setReset(false)
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);




  const startTimer = () => {
    setIsActive(true);
  };


  function handleTeamAScore() {
    setTeamAScore(teamAScore + 1)
  }
  
  function handleTeamBScore() {
    setTeamBScore(teamBScore + 1)
  }


  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRand(0)
    setDisable(false)
    setWord('')
    setList([])
    setColor("#000000")
    setSeconds(45)
  };


 function handleColorChange(e){
  setColor(e.hex)
 }

 const handleMouseDown = () => {
  if(seconds === 0 || seconds === 45){
    return
  }
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  setDrawing(true);
  ctx.beginPath()
}

// Handle mouse up event for stopping drawing
const handleMouseUp = () => {
  setDrawing(false);
};

// Handle mouse move event for drawing lines
const handleMouseMove = (e) => {
  if (!drawing) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.stroke();
  ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
};


  return (
    <div>
      <div className=" flex justify-around pb-3">
        <div>
          <h2>Team A Score :</h2>
          <h3 id="teamA" className="text-4xl py-2">{teamAScore}</h3>
          <button  disabled={isActive} onClick={handleTeamAScore} className=" bg-yellow-300 px-4 py-1 border-2 border-black">+ 1</button>
        </div>
        <div className="flex">
          <h1 id="timer" className=" px-4 text-3xl">Timer: {seconds}</h1>
          <Button handler={startTimer} dis={isActive} color='bg-green-500 px-3 py-2 border-2 border-black' name="Start" />
        </div>
        <div>
          <h2>Team B Score:</h2>
          <h3 id="teamB" className="text-4xl py-2">{teamBScore}</h3>
          <button disabled={isActive} onClick={handleTeamBScore} className=" bg-yellow-300 px-4 py-1 border-2 border-black" > + 1 </button>
        </div>
      </div>
      <div className="flex justify-around w-[100%]">
        <div className="w-[20%]">
          <div><button onClick={openNewTab}>Game Window</button></div>
          <CirclePicker onChange={handleColorChange} />
          <div>
            <button className=" border-2 border-white text-white bg-red-950 py-2 my-2 px-3 text-2xl uppercase" onClick={resetCanvas} disabled={reset}>reset</button>
            <h2 className=" border-2 border-black text-center p-4 my-2 bg-white text-bold text-2xl text uppercase">{word === ""? "Click Generate New Word" : word}</h2>
            <button className=" bg-green-300 text-xl border-2 border-black text-black py-2 px-3" disabled={disable}  onClick={generateWord}>Generate</button>
            <ul className="flex justify-center">
              {list.map((index, word) => (
                <li className="px-3 mt-2 text-2xl text uppercase" key={index}>{list[word]}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-[70%]">
          <canvas
            ref={canvasRef}
            className=" border-2 border-black bg-white"
            width={900}
            height={400}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
          ></canvas>
        </div>
      </div>     
    
    </div>
  );
};

export default Game;