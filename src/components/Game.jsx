import React, { useState, useRef, useEffect } from "react";

import Button from "./Button";
import words from "../games/english/game_0.json"
import Holloween from "../games/english/holloween.json"
import { CirclePicker } from "react-color";

const Game = () => {
  const time = 60
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [disable, setDisable] = useState(false)
  const [reset, setReset] = useState(true)
  const [data, setData] = useState([])
  const [word, setWord] = useState('')
  const [list, setList] = useState([])
  const [rand, setRand] = useState(0)
  const [color, setColor] = useState("#000000");
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)
  const [showWord, setShowWord] = useState([])



  const colors = ['#b71c1c', '#03a9f4','#ffeb3b','#4caf50' ,'#ff5722','#ba68c8', '#000000']



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
              <canvas id="mirroredCanvas" width="1000" height="400"></canvas>
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
    setShowWord(() => [...showWord, data[index]])
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



// Start TImer State
  const startTimer = () => {
    setIsActive(true);
  };

// Team A Score State
  function handleTeamAScore() {
    setTeamAScore(teamAScore + 1)
  }

//Team B score State
  function handleTeamBScore() {
    setTeamBScore(teamBScore + 1)
  }
  

// This function resets canvas States and filters words from data

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRand(0)
    setDisable(false)
    setWord('')
    setShowWord([])
    setColor("#000000")
    setSeconds(time)

// this filter method removes words from data that are added initially to list array when we generate a word. 

    const newList = data.filter((w) => (!list.includes(w)))
    setData(newList)

  };


 function handleColorChange(e){
  setColor(e.hex)
 }

 const handleMouseDown = () => {
  if(seconds === 0 || seconds === time){
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
        <div>
          <h1 id="timer" className=" px-4 text-3xl">Timer: {seconds}</h1>
          <div className=" flex pt-3">
            <Button handler={startTimer} dis={isActive} color=' text-white bg-green-800 text-xl px-3 py-2 border-2 border-black' name="START" />
            <Button color=" border-2 border-black text-white bg-red-900 py-2 px-4 ml-3" handler={resetCanvas} dis={reset} name="Reset" />
          </div>
        </div>
        <div>
          <h2>Team B Score:</h2>
          <h3 id="teamB" className="text-4xl py-2">{teamBScore}</h3>
          <button disabled={isActive} onClick={handleTeamBScore} className=" bg-yellow-300 px-4 py-1 border-2 border-black" > + 1 </button>
        </div>
      </div>
      <div className=" flex justify-center mb-2">
        <button className=" bg-green-300 text-xl border-2 border-black text-black py-2 px-3 mr-3" disabled={disable}  onClick={generateWord}>Generate</button>
        <ul className=" flex">
          {showWord.length === 0 ? <li className="text-2xl uppercase py-2">Ready?</li> : 
            showWord.map((index, word) => (
              <li className="text-2xl text uppercase py-2 px-3" key={index}>{showWord[word]}</li>
            ))}
        </ul>
      </div>
      <div className=" w-[100%] flex justify-center">
        <div className="relative">

          <canvas
            ref={canvasRef}
            className=" border-2 border-black bg-white"
            width={1000}
            height={400}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
            ></canvas>
          <CirclePicker className=" absolute top-0 left-3 pt-3" colors={colors} width="300px" onChange={handleColorChange} />
        </div>
        
      </div>
      <div>
        <button disabled={isActive} className=" bg-green-200  py-3 px-4 mt-2" onClick={openNewTab}>Game Window</button>
      </div>     
    
    </div>
  );
};
export default Game;









{/* <div className="w-[20%]">
  <div>
    <button className=" border-2 border-white text-white bg-red-950 py-2 my-2 px-3 text-2xl uppercase" onClick={resetCanvas} disabled={reset} >reset</button>
    <CirclePicker className=" " colors={colors} onChange={handleColorChange} />
    <h2 className=" border-2 border-black text-center p-4 my-2 bg-white text-bold text-2xl text uppercase">{word === ""? "Click Generate New Word" : word}</h2>
    <button className=" bg-green-300 text-xl border-2 border-black text-black py-2 px-3" disabled={disable}  onClick={generateWord}>Generate</button>
    <ul className="flex justify-center">
      {showWord.map((index, word) => (
        <li className="px-3 mt-2 text-2xl text uppercase" key={index}>{showWord[word]}</li>
      ))}
    </ul>
  </div>
</div> */}