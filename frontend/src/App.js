import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = async () => {
    const response = await fetch(`http://localhost:7071/api/generate-qrcode?text=${encodeURIComponent(text)}`);
    const qrCodeData = await response.text();
    setQrCode(qrCodeData);
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
