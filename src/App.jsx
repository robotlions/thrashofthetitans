import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useRef } from "react";
import bannerImage3 from"./assets/images/banner3.png";
import CookieConsentBanner from "./ui/ConsentBanner";

function App() {
  const [currentNote, setCurrentNote] = useState(" ");
  const [currentString, setCurrentString] = useState(" ");
  const [isRunning, setIsRunning] = useState(false);
  const [timerCount, setTimerCount] = useState(5000);
  const timerRef = useRef(null);

  const noteObject = {
    1: "A",
    2: "A#",
    3: "B",
    4: "C",
    5: "C#",
    6: "D",
    7: "D#",
    8: "E",
    9: "F",
    10: "F#",
    11: "G",
    12: "G#",
  };

  const stringObject = {
    1: "High E",
    2: "B",
    3: "G",
    4: "D",
    5: "A",
    6: "Low E",
  };

  const TimerButton = () => {
    const handleButtonClick = () => {
      if (isRunning) {
        clearInterval(timerRef.current);
      } else {
        generateRandomNote();
          generateRandomString();
        timerRef.current = setInterval(() => {
          generateRandomNote();
          generateRandomString();
        }, timerCount);
      }
      setIsRunning(!isRunning);
    };

    return (
      <button className="btn btn-info" onClick={handleButtonClick}>
        {isRunning ? "Stop" : "Start"} Timer
      </button>
    );
  };

  function generateRandomNote() {
    let r = rando(1, 12);
    setCurrentNote(noteObject[r]);
  }

  function generateRandomString() {
    let r = rando(1, 6);
    setCurrentString(stringObject[r]);
  }

  function rando(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  return (
    <div className="container">
      <CookieConsentBanner />
      <div className="row justify-content-center">
        <div className="col-md-5">
      <img alt="guitar student" className="image-fluid" src={bannerImage3} style={{width:"100%"}}/></div>
      </div>
      <div className="row justify-content-center" style={{ minHeight: 150 }}>
        <div className="col-md-2" style={{ textAlign: "center",marginTop:40 }}>
          <h3>String</h3>
          <div className="textBox d-flex align-items-center justify-content-center">
            <span className="resultText">{currentString}</span>
          </div>
        </div>
        <div className="col-md-2" style={{ textAlign: "center",marginTop:40 }}>
          <h3>Note</h3>
          <div className="textBox d-flex align-items-center justify-content-center">
            <span className="resultText">{currentNote}</span>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto" style={{ textAlign: "center" }}>
          <button
            style={{marginTop:80}}
            className="btn btn-primary"
            onClick={() => {
              generateRandomNote();
              generateRandomString();
            }}
          >
            Random String and Note
          </button>
        </div>
      </div>
      <div className="row justify-content-center" style={{marginTop:30}}>
        <div className="col-auto">
          <label htmlFor="timerSecondsInput" className="col-form-label">
            Generate random string and note every
          </label>
        </div>
        <div className="col-auto">
          <input
            id="timerSecondsInput"
            className="form-control"
            type="number"
            min={1}
            value={timerCount / 1000}
            style={{ width: 75 }}
            onChange={(e) => setTimerCount(e.target.value * 1000)}
          />
        </div>
        <div className="col-auto">
          <label className="col-form-label">seconds</label>
        </div>
      </div>
      <div className="row justify-content-center" style={{marginTop:30}}>
        <br />
        <div className="col-auto">
          <TimerButton />
        </div>
      </div>
    </div>
  );
}

export default App;
