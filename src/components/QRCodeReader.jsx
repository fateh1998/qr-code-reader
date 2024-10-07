import React, { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';  // import qr-scanner

const QRCodeReader = () => {
  const [qrText, setQrText] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');  // state to store the file name

  // Function to handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      scanQrCodeFromFile(file);
      setFileName(file.name);  // set the file name
    }
  };

  // Function to scan QR code from an image file
  const scanQrCodeFromFile = (file) => {
    QrScanner.scanImage(file)
      .then(result => {
        setQrText(result);
        setError('');  // clear any previous errors
      })
      .catch(err => {
        console.error(err);
        setQrText('');  // clear text on error
        setError('Failed to scan QR code.');
      });
  };

  // Function to handle image paste
  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          scanQrCodeFromFile(file);
          setFileName(file.name);  // set the pasted file name
        }
      }
    }
  };

  // Attach the paste event listener when the component mounts
  useEffect(() => {
    window.addEventListener('paste', handlePaste);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div>
      <h2>QR Code Reader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <p>Or, paste an image (Ctrl+V / Cmd+V) to scan the QR code.</p>

      {fileName && (
        <div>
          <h4>File Name:</h4>
          <p>{fileName}</p> {/* Display the file name */}
        </div>
      )}
      
      {qrText && (
        <div>
          <h4>QR Code Text:</h4>
          <p>{qrText}</p>
        </div>
      )}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QRCodeReader;
