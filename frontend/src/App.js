import React, { useState } from 'react';
import './App.css';
const express = require('express');
const app = express();
const qrCodeRoutes = require('./routes/qrCodeGenerator'); // Import your routes

app.use('/', qrCodeRoutes); // Use the routes

function App() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = async () => {
    const response = await fetch(`http://localhost:3001/api/GenerateQRCode?text=${encodeURIComponent(text)}`);
    
    // Ensure the response is a blob, which can represent the JPEG image
    const blob = await response.blob();
    
    // Convert the blob to a URL to display as an image
    const url = URL.createObjectURL(blob);
    setQrCode(url);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && <img src={qrCode} alt="Generated QR Code" />}
    </div>
  );
}

export default App;
