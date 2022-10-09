import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';



// function  testSortingAlgorithms() {
//   for (let i = 0; i < 100; i++) {
//     const array = [];
//     const length = randomIntFromInterval(1, 1000);
//     for (let i = 0; i < length; i++) {
//       array.push(randomIntFromInterval(-1000, 1000));
//     }
//     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
//     const mergeSortedArray = getMergeSortAnimations(array.slice());
//     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
//   }
// }


const SortingVisualizer = ({array,arrayNum,highestHeight}) => {

  
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              width: `${100/(array.length*1.5)}%`,
              height: `${value*100/highestHeight}%`,
              marginLeft:  1,
              marginRight:1,
            }}></div>
        ))}

      </div>
    );

  }
 
   
  



export default SortingVisualizer;
