import React, { useState } from "react";

const QrGenerator = ({ onClose, onAddQr }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleGenerate = () => {
    if (url.trim() !== "" && title.trim() !== "") {
      onAddQr({ title, url }); // Pass both title and URL
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create QR Code</h2>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
