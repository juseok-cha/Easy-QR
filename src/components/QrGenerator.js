import React, { useState } from "react";

const QrGenerator = ({ onClose, onAddQr }) => {
  const [text, setText] = useState("");

  const handleGenerate = () => {
    if (text.trim() !== "") {
      onAddQr(text); // ✅ Ensures the text is passed correctly
      onClose(); // ✅ Closes the modal after generating QR
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create QR Code</h2>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate</button>
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default QrGenerator;
