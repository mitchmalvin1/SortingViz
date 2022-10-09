import React, { useState, useEffect } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import Toolbar from './components/Toolbar/Toolbar';
import { bubbleSort, mergeSort, quickSort } from './sortingAlgorithms/sortingAlgorithms';
import './App.css';

import Stopwatch from './components/Stopwatch/Stopwatch';


// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


function App() {
  const [array, setArray] = useState([]);
  const [arrayNum, setArrayNum] = useState(100);
  const [selectedAlgo, setSelectedAlgo] = useState('merge');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [complexity, setComplexity] = useState();

  const findHighest = (arr) => {
    let highest = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > highest)
        highest = arr[i]
    }
    return highest
  }

  const highestHeight = findHighest(array);

  useEffect(() => {
    let algo, otherAlgos;
    switch (selectedAlgo) {
      case 'merge':
        otherAlgos = document.getElementsByClassName('toolbar-title');
        algo = document.getElementsByClassName('merge');
        for (let i = 0; i < otherAlgos.length; i++) {
          otherAlgos[i].style.color = 'white'
        }
        algo[0].style.color = 'black'
        break;
      case 'quick':
        otherAlgos = document.getElementsByClassName('toolbar-title');
        algo = document.getElementsByClassName('quick');
        for (let i = 0; i < otherAlgos.length; i++) {
          otherAlgos[i].style.color = 'white'
        }
        algo[0].style.color = 'black'
        break;
      case 'bubble':
        otherAlgos = document.getElementsByClassName('toolbar-title');
        algo = document.getElementsByClassName('bubble');
        for (let i = 0; i < otherAlgos.length; i++) {
          otherAlgos[i].style.color = 'white'
        }
        algo[0].style.color = 'black'
        break;
      case 'insertion':
        otherAlgos = document.getElementsByClassName('toolbar-title');
        algo = document.getElementsByClassName('insertion');
        for (let i = 0; i < otherAlgos.length; i++) {
          otherAlgos[i].style.color = 'white'
        }
        algo[0].style.color = 'black'
        break;
    }
  }, [selectedAlgo])

  useEffect(() => {
    const dummyArr = array.slice();
    if (isPlaying) {
      switch (selectedAlgo) {
        case 'merge':
          mergeSort(dummyArr,speed,highestHeight,setIsPlaying,setRunning);
          setComplexity('O(nlog(n))')
          break;
        case 'bubble':
          bubbleSort(dummyArr,speed,highestHeight,setIsPlaying,setRunning)
          setComplexity('O(n²)')
          break;
        case 'quick':
          quickSort(dummyArr,speed,highestHeight,setIsPlaying,setRunning);
          setComplexity('O(nlog(n))');
          break;


        default:
          console.log('hmm');

      }
    } else {
      setHistory(prevHistory => [...prevHistory, {
        mode: selectedAlgo,
        arrayNum: arrayNum,
        complexity: complexity,
        duration:
          ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ':' +
          ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ':' +
          ("0" + ((time / 10) % 100)).slice(-2)
      }])
    }
  }, [isPlaying])


  function resetArray(arrayNum) {
    const arr = [];
    for (let i = 0; i < arrayNum; i++) {
      arr.push(randomIntFromInterval(5, 730));
    }
    setArray(arr);
    const arrayBars = document.getElementsByClassName("array-bar");
    console.log(arrayBars);
    for (let arrayBar of arrayBars) {
      arrayBar.style.backgroundColor= PRIMARY_COLOR;
    }
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function onChangeAlgo(algo) {
    setSelectedAlgo(algo);

  }

  function onStart() {
    if (!isPlaying) {
      setIsPlaying(true);
      setTime(0);
    }
  }



  function onChangeSpeed(newSpeed) {
    setSpeed(newSpeed);
  }

  function onChangeArrayNum(newArrNum) {
    setArrayNum(newArrNum)
  }

  useEffect(() => {
    resetArray(arrayNum)
  }, [arrayNum])


  return (
    <div className="App">
      <Toolbar
        resetArray={resetArray}
        arrayNum={arrayNum}
        onChangeSpeed={onChangeSpeed}
        speed={speed}
        onChangeArrayNum={onChangeArrayNum}
        onChangeAlgo={onChangeAlgo}
        onStart={onStart}
        isPlaying={isPlaying}
      />
      <div className="app-sidebar">
        <Stopwatch
          time={time}
          setTime={setTime}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          history={history}
        />
      </div>


      <SortingVisualizer
        array={array}
        arrayNum={arrayNum}
        isPlaying={isPlaying}
        selectedAlgo={selectedAlgo}
        highestHeight={highestHeight}
      />



    </div>
  );
}

export default App;
