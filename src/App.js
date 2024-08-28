import React, { useState, useRef } from 'react';

function App() {
  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState(null); // State to store the captured image
  const drawingAreaRef = useRef(null);

  // const handleMouseDown = (e) => {
  //   setDrawing(true);
  //   const rect = drawingAreaRef.current.getBoundingClientRect();
  //   setLines([...lines, [{ x: e.clientX - rect.left, y: e.clientY - rect.top }]]);
  // };

  const handleMouseMove = (e) => {
    // if (!drawing) return;
    // const rect = drawingAreaRef.current.getBoundingClientRect();
    // setLines((lines) => {
    //   const updatedLines = [...lines];
    //   const lastLine = updatedLines[updatedLines.length - 1];
    //   lastLine.push({
    //     x: e.clientX - rect.left,
    //     y: e.clientY - rect.top,
    //   });
    //   return updatedLines;
    // });
    // setMousePosition({
    //   x: e.clientX - rect.left,
    //   y: e.clientY - rect.top,
    // });

    setDrawing(true);
    const rect = drawingAreaRef.current.getBoundingClientRect();
    setLines([...lines, [{ x: e.clientX - rect.left, y: e.clientY - rect.top, }]]);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top, })
  };

  const handleMouseUpOrLeave = () => setDrawing(false);

  const handleCapture = () => {
    const htmlContent = drawingAreaRef.current.innerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setImage(url);
  };

  const handleClear = () => {
    setLines([])
  }

  return (
    <div>
      <div
        ref={drawingAreaRef}

        onMouseMove={handleMouseMove}

        className={`w-full h-[500px] border border-black relative ${drawing ? 'cursor-crosshair' : 'cursor-default'
          }`}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
          >
            {line.map((point, pointIndex) => (
              <div
                key={pointIndex}
                className="absolute w-1 h-1 bg-black "
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                }}
              />
            ))}
          </div>
        ))}



        <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 p-2 rounded">
          {`Coordinates: (${mousePosition.x}, ${mousePosition.y})`}
        </div>
      </div>
      <button onClick={handleCapture} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Capture Drawing
      </button>
      <button onClick={handleClear} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Clear
      </button>
      {image && (
        <div className="mt-4">
          <h2>Preview:</h2>
          <iframe src={image} title="Captured Drawing" style={{ width: '100%', height: '500px', border: 'none' }}></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
