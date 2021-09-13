import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "./Style.css";
function Timer() {
  const [seconds, setseconds] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isStart, setisStart] = useState(false);
  const [pause, setpause] = useState(false);
  const [reset, setreset] = useState(false);
  const printTime = (totalSeconds) => {
    console.log("line" + totalSeconds);
    let minutes = Math.ceil(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return minutes + ":" + seconds;
  };
  const handleSeconds = (e) => {
    e.preventDefault();
    let sec = e.target.value;
    setseconds(sec);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setreset(true);
    setminutes(0);
    setseconds(0);
  };
  const handlePause = (e) => {
    e.preventDefault();
    setpause(!pause);
  };
  const handleStart = (e) => {
    setpause(false);
    e.preventDefault();
    let tempSeconds = parseInt(minutes * 60);
    setTotalSeconds(tempSeconds + parseInt(seconds));
  };

  useEffect(() => {
    if (reset) {
      setTotalSeconds(0);
    } else {
      if (!pause) {
        console.log(totalSeconds);
        const interval = setInterval(() => {
          setTotalSeconds(totalSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [totalSeconds, reset, pause]);
  return (
    <div className="timer">
      <div className="timer__title">My Time App</div>
      <div className="timer__form">
        <form>
          <input
            type="text"
            id="minutes"
            onChange={(e) => {
              setminutes(e.target.value);
            }}
          />
          <input
            type="text"
            id="seconds"
            onChange={(e) => {
              handleSeconds(e);
            }}
          />

          <Button name="start" onClick={(e) => handleStart(e)} />
          <Button
            name="pause/resume"
            onClick={(e) => {
              handlePause(e);
            }}
          />
          <Button name="reset" onClick={handleReset} />
        </form>
      </div>
      <div className="timer__display">{printTime(totalSeconds)}</div>
    </div>
  );
}

export default Timer;
