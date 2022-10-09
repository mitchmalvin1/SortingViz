// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function mergeSort(array, speed, highestHeight, setIsPlaying, setRunning) {
  let animations = getMergeSortAnimations(array);
  console.log(animations);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i === animations.length - 1) {
          setIsPlaying(false)
          setRunning(false);
        }
      }, i * speed);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        console.log(barOneIdx, newHeight, arrayBars[barOneIdx]);
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight * 100 / highestHeight}%`;
        if (i === animations.length - 1) {
          setIsPlaying(false)
          setRunning(false);
        }
      }, i * speed);
    }
  }
}

export function getBubbleSortAnimation(array) {
  const animations = [];

  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    for (let startIdx = 0; startIdx < endIdx; startIdx++) {
      animations.push([startIdx, startIdx + 1]);
      animations.push([startIdx, startIdx + 1]);
      if (array[startIdx] > array[startIdx + 1]) {
        animations.push([startIdx, array[startIdx + 1]]);
        animations.push([startIdx + 1, array[startIdx]]);

        //swap the two elements in the array
        const puppet = array[startIdx];
        array[startIdx] = array[startIdx + 1];
        array[startIdx + 1] = puppet;
      } else {
        animations.push([startIdx, array[startIdx]]);
        animations.push([startIdx + 1, array[startIdx + 1]]);
      }
    }

  }
  return animations
}

export function bubbleSort(array, speed, highestHeight, setIsPlaying, setRunning) {
  const animations = getBubbleSortAnimation(array);
  console.log(animations);
  let currSortedIdx = array.length - 1;
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 4 !== 2 && i % 4 !== 3;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      // console.log(arrayBars[1],arrayBars[barOneIdx],barTwoIdx,i,arrayBars[barTwoIdx]);
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i === animations.length - 1) {
          setIsPlaying(false);
          setRunning(false);
        }
      }, i * speed);
    } else {

      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        //  console.log(barOneIdx,newHeight);
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight * 100 / highestHeight}%`;
        if (barOneIdx == currSortedIdx) {
          barOneStyle.backgroundColor = 'green';
          --currSortedIdx
        }
        if (i === animations.length - 1) {
          setIsPlaying(false)
          setRunning(false);
          arrayBars[0].style.backgroundColor = 'green';
        }
      }, i * speed);
    }
  }
}

function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

function partition(array, low, high, animations) {
  const length = high-low+1
  const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
  console.log(array,'random :' ,randomIndex,low,high);
  swap(array, low, randomIndex); //randomized quick sort
  let pivotElement = array[low];
  let pivotIdx = low;
  for (let k = low + 1; k < length; k++) {
    animations.push({
      type: 'comparing',
      idx1: pivotIdx,
      idx2: k
    })
    animations.push({
      type: 'finishedComparing',
      idx1: pivotIdx,
      idx2: k
    })
    if (array[k] < pivotElement || (array[k] == pivotElement && Math.floor(Math.random() * 99999) % 2 == 0)) {

      pivotIdx++;
      animations.push({
        type: 'changeHeight',
        idx1: pivotIdx,
        newHeight1: array[k],
        idx2: k,
        newHeight2: array[pivotIdx]
      });

      swap(array, pivotIdx, k);
    }
  }
  animations.push({
    type: 'swapPivot',
    idx1: pivotIdx,
    newHeight1: array[low],
    idx2: low,
    newHeight2: array[pivotIdx]
  });
  swap(array, pivotIdx, low);
  return pivotIdx;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    let pivotIdx = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, high, animations);
  } else if (low ==high) {
    animations.push({
      type:'sorted',
      idx:low,
    })
  }

}

function getQuickSortAnimation(array) {
  let animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

export function quickSort(array, speed, highestHeight, setIsPlaying, setRunning) {
  const animations = getQuickSortAnimation(array);
  console.log(animations);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');

    if (animations[i].type == "comparing" || animations[i].type == "finishedComparing") {
      const { idx1, idx2 } = animations[i];
      const barOneStyle = arrayBars[idx1].style;
      const barTwoStyle = arrayBars[idx2].style;
      const color = animations[i].type == "comparing" ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i === animations.length - 1) {
          setIsPlaying(false);
          setRunning(false);
        }
      }, i * speed);
    }

    else if (animations[i].type == "changeHeight") {
      const { idx1, idx2, newHeight1, newHeight2 } = animations[i];
      const barOneStyle = arrayBars[idx1].style;
      const barTwoStyle = arrayBars[idx2].style;
      setTimeout(() => {
        barOneStyle.height = `${newHeight1 * 100 / highestHeight}%`;
        barTwoStyle.height = `${newHeight2 * 100 / highestHeight}%`;
        if (i === animations.length - 1) {
          setIsPlaying(false)
          setRunning(false);
        }
      }, i * speed);
    }

    else if (animations[i].type == "swapPivot") {
      const { idx1, idx2, newHeight1, newHeight2 } = animations[i];
      const barOneStyle = arrayBars[idx1].style;
      const barTwoStyle = arrayBars[idx2].style;
      setTimeout(() => {
        barOneStyle.height = `${newHeight1 * 100 / highestHeight}%`;
        barTwoStyle.height = `${newHeight2 * 100 / highestHeight}%`;
        barOneStyle.backgroundColor = 'green';
        console.log('arrayIdx',idx1,' to green (pivot)');
        if (i === animations.length - 1) {
          setIsPlaying(false)
          setRunning(false);
        }
      }, i * speed);
    }
    
    else if (animations[i].type="sorted") {
      const {idx} = animations[i];
      const barStyle = arrayBars[idx].style;
      setTimeout(() => {
        barStyle.backgroundColor = 'green';
        console.log('arrayIdx',idx,' to green (sorted)');
        if (i === animations.length - 1) {
          setIsPlaying(false)
          setRunning(false);
        }
      }, i * speed);
    }

  }
}

const insertionSortHelper =(array) => {
 let i=1;
 let animations=[];
 for (;i<array.length;i++) {
  let j=i-1;
  let temp=array[i]
  while (j>0 && array[j]  > temp) {
    array[j+1]=array[j];
    j--;
  }
  array[j+1]=temp;
 }
 return animations;
}

export const insertionSort = (array, speed, highestHeight, setIsPlaying, setRunning) => {

}


