// src/App.js
import React from 'react';
import './App.css';
import QRCodeReader from './components/QRCodeReader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Code Scanner</h1>
        <QRCodeReader />
      </header>
    </div>
  );
}

export default App;
