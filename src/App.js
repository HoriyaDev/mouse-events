import React, { useState, useRef } from 'react';

function App() {
  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState([]); // State to store the captured image
  const drawingAreaRef = useRef(0);

  const handleMouseMove = (e) => {
    setDrawing(true);
    const rect = drawingAreaRef.current.getBoundingClientRect();
    setLines([...lines, [{ x: e.clientX - rect.left, y: e.clientY - rect.top }]]);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCapture = () => {
    const htmlContent = drawingAreaRef.current.innerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setImage(url);
  };

  const handleClear = () => {
    setLines([]);
  };

  const handleImage = () => {
    setImage("");
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

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
            className='absolute top-0 left-0 w-full h-full'
          >
            {line.map((point, pointIndex) => (
              <div
                key={pointIndex}
                style={{
                  position: 'absolute',
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: '4px',
                  height: '4px',
                  backgroundColor: 'black',
                  borderRadius: '50%',
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
      <button onClick={handleClear} className="mt-4 p-2 bg-blue-500 ml-5 text-white rounded">
        Clear
      </button>
      <button onClick={handleImage} className="mt-4 p-2 bg-blue-500 ml-5 text-white rounded">
        Clear Image
      </button>
      <button onClick={handleUndo} className="mt-4 p-2 bg-blue-500 ml-5 text-white rounded">
        Undo Last Line
      </button>
      {image && (
        <div className="mt-4">
          <h2>Preview:</h2>
          <iframe src={image} title="Captured Drawing" style={{ width: '100%', border: 'none', height: '500px' }}></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
