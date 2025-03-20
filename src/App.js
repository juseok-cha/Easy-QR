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

  const addQrCode = (qrData) => {
    const newQRCodes = [...qrCodes, qrData];
    setQrCodes(newQRCodes);
  };

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        className="app-description"
        style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            color: "#003049",
          }}
        >
          EASY QR
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            color: "#666",
            margin: "0 auto",
            maxWidth: "500px",
          }}
        >
          Welcome to EASY QR, a simple and easy-to-use QR code generator. You
          can create QR codes for any URL and download them for offline use.
          Just click on the '+' button to get started!
        </p>
      </div>

      <QrList qrCodes={qrCodes} setQrCodes={setQrCodes} />

      {showModal && (
        <QrGenerator onClose={() => setShowModal(false)} onAddQr={addQrCode} />
      )}

      <button
        className="fab"
        onClick={() => setShowModal(true)}
        style={{
          background: "#D62828",
          boxShadow: "0 4px 8px rgba(214, 40, 40, 0.3)",
        }}
      >
        +
      </button>
    </div>
  );
}

export default App;
