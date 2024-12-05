import React, { useState, useRef } from 'react';
import { useZxing } from 'react-zxing';

const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const videoRef = useRef(null);

  const { ref, torch: { on, off, isOn, isAvailable } } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText()); 
    },
  });

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={() => (isOn ? off() : on())}>
        {isOn ? "Turn off" : "Turn on"} torch
      </button>
      <p>Scanned result: {result}</p>
    </div>
  );
};

export default BarcodeScanner;