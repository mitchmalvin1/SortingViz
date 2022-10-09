function bubbleSort(array,speed) {
  const animations = getBubbleSortAnimation(array);
  console.log(animations);
  let currSortedIdx = array.length-1;
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
        if(i === animations.length -1){
          setIsPlaying(false);
          setRunning(false);
        }
      }, i * speed