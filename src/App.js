import React, { useState, useEffect } from "react";
import QrList from "./components/QrList";
import QrGenerator from "./components/QrGenerator";
import "./index.css";

function App() {
  const [qrCodes, setQrCodes] = useState([]);

  // Load QR codes from Local Storage when the app starts
  useEffect(() => {
    const savedQRCodes = JSON.parse(localStorage.getItem("qrCodes"));
    if (savedQRCodes) {
      setQrCodes(savedQRCodes);
    }
  }, []);

  // Save QR codes to Local Storage whenever the list updates
  useEffect(() => {
    localStorage.setItem("qrCodes", JSON.stringify(qrCodes));
  }, [qrCodes]);

  const [showModal, setShowModal] = useState(false);

  const addQrCode = (text) => {
    const newQRCodes = [...qrCodes, text];
    setQrCodes(newQRCodes);
  };

  return (
    <div className="app">
      <h1>QR Code Generator</h1>

      {/* Ensure QrList gets a valid array */}
      <QrList qrCodes={qrCodes} />

      {showModal && (
        <QrGenerator onClose={() => setShowModal(false)} onAddQr={addQrCode} />
      )}

      <button className="fab" onClick={() => setShowModal(true)}>
        +
      </button>
    </div>
  );
}

export default App;
