import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [colorHistory, setColorHistory] = useState([]);
  const [isAutoChanging, setIsAutoChanging] = useState(false);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const changeColor = useCallback(() => {
    const newColor = generateRandomColor();
    setColorHistory(prevHistory => [currentColor, ...prevHistory].slice(0, 10));
    setCurrentColor(newColor);
  }, [currentColor]);

  const handleUndo = () => {
    if (colorHistory.length > 0) {
      const previousColor = colorHistory[0];
      setCurrentColor(previousColor);
      setColorHistory(prevHistory => prevHistory.slice(1));
    }
  };

  const toggleAutoChange = () => {
    setIsAutoChanging(prev => !prev);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoChanging) {
      intervalId = setInterval(changeColor, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoChanging, changeColor]);

  useEffect(() => {
    document.body.style.backgroundColor = currentColor;
  }, [currentColor]);

  return (
    <div className="App">
      <div className="color-info">
        <h2>Current Color: {currentColor}</h2>
        <div className="color-history">
          <h3>Color History:</h3>
          <ul>
            {colorHistory.map((color, index) => (
              <li key={index} style={{backgroundColor: color}}>{color}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="controls">
        <button onClick={changeColor}>Change Background Color</button>
        <button onClick={handleUndo} disabled={colorHistory.length === 0}>Undo</button>
        <button onClick={toggleAutoChange}>
          {isAutoChanging ? 'Stop Auto Change' : 'Start Auto Change'}
        </button>
      </div>
    </div>
  );
}

export default App;