import React from 'react'
import './Toolbar.css'

const Toolbar = ({ resetArray, arrayNum,speed, isPlaying, onChangeAlgo ,onChangeSpeed,onChangeArrayNum, onStart}) => {
    
    function handleSpeedChange(event) {
        onChangeSpeed(100/parseInt(event.target.value))
    }

    function handleArrayNumChange(event) {
        onChangeArrayNum(parseInt(event.target.value))
    }

    
    
    return (
        <div className='toolbar-container'>
            <div
                className="generate-array-container"
                onClick={resetArray.bind(this,arrayNum)}
            >
                <h2 className="toolbar-title">Generate New Array</h2>
            </div>
            <div className="change-array-container">
                <h2 className="toolbar-title">Change Array Size</h2>
                <p className="p-text">{arrayNum}</p>
                <input
                    id="changeSize"
                    type="range"
                    min="4"
                    max="200"
                    disabled={isPlaying ? "disabled" : null}
                    onChange={handleArrayNumChange}
                    
                />
            </div>
            <div className="change-speed-container">
                <h2 className="toolbar-title">Change Speed</h2>
                <input
                    id="changeSize"
                    type="range"
                    min="1"
                    max="100"
                    disabled={isPlaying ? "disabled" : null}
                    onChange={handleSpeedChange}
                />
            </div>
            <div
                className="algo-selection-container"
            >
                <div
                    className="algo-container"
                    onClick={onChangeAlgo.bind(this, 'merge')}
                >
                    <h2 className="toolbar-title merge">Merge Sort</h2>
                </div>
                <div
                    className="algo-container"
                    onClick={onChangeAlgo.bind(this, 'quick')}
                >
                    <h2 className="toolbar-title quick">Quick Sort</h2>
                </div>
                <div
                    className="algo-container"
                    onClick={onChangeAlgo.bind(this, 'bubble')}
                >
                    <h2 className="toolbar-title bubble">Bubble Sort</h2>
                </div>
                <div
                    className="algo-container"
                    onClick={onChangeAlgo.bind(this, 'insertion')}
                >
                    <h2 className="toolbar-title insertion">Insertion Sort</h2>
                </div>
                <div
                    className="algo-container"
                    onClick={onStart}
                >
                    <h2 className="toolbar-title">Start</h2>
                </div>
            </div>
        </div>
    )
}

export default Toolbar