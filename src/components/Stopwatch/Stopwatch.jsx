import React, {useState, useEffect} from 'react';
import './Stopwatch.css'


const Stopwatch = ({isOn,fromTime, time,setTime,isPlaying,setIsPlaying,history}) => {

    

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isPlaying) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="summary">
          <h2>History:</h2>
          <ul>
          {history.map((hist,idx) => {
              if (idx ==0) {
                  return;
              }
              return (
                  <li className="history-data">
                  <p className="history-text">{hist.mode[0].toUpperCase() + hist.mode.substring(1)} Sort  ({hist.arrayNum}) </p>
                  <p className="history-text">{hist.duration} {hist.complexity}</p>
                  </li>
              )
          })}
          </ul>
        
      </div>
      {/* <div className="buttons">
        <button onClick={() => setIsPlaying(true)}>Start</button>
        <button onClick={() => setIsPlaying(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>       
      </div> */}
    </div>
  );

//   )
   
}

export default Stopwatch