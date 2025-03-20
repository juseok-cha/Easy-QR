import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";

const COLORS = ["#D62828", "#F77F00", "#FCBF49", "#003049"];

const QrList = ({ qrCodes = [], setQrCodes }) => {
  const [itemColors, setItemColors] = useState([]);

  // Initialize colors only for new QR codes
  useEffect(() => {
    if (qrCodes.length > itemColors.length) {
      // Only add colors for new items
      const newColors = [...itemColors];
      for (let i = itemColors.length; i < qrCodes.length; i++) {
        newColors.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
      }
      setItemColors(newColors);
    } else if (qrCodes.length < itemColors.length) {
      // Remove colors for deleted items
      setItemColors(itemColors.slice(0, qrCodes.length));
    }
  }, [qrCodes.length, itemColors]);

  const deleteQr = (index) => {
    const newQrCodes = qrCodes.filter((_, i) => i !== index);
    setQrCodes(newQrCodes);
  };

  // Function to convert SVG to PNG and download
  const downloadQR = (index) => {
    const svg = document.getElementById(`qr-svg-${index}`);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Get the SVG data
    const svgData = new XMLSerializer().serializeToString(svg);

    // Create a Blob URL for the SVG
    const img = new Image();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      // Set canvas size to match SVG size
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;

      // Draw the transparent QR code onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas to PNG and trigger download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      // Use the title for the filename, replace spaces with underscores
      const safeTitle = qrCodes[index].title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      link.download = `${safeTitle}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="qr-list">
      {qrCodes.length === 0 ? (
        <p>No QR codes generated yet.</p>
      ) : (
        qrCodes.map((code, index) => (
          <div
            key={index}
            className="qr-item"
            style={{
              backgroundColor: itemColors[index],
              padding: "20px",
              borderRadius: "10px",
              margin: "10px",
              transition: "transform 0.2s",
              cursor: "pointer",
              color: itemColors[index] === "#003049" ? "#fff" : "#000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => deleteQr(index)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: itemColors[index] === "#003049" ? "#fff" : "#000",
                cursor: "pointer",
                fontSize: "12px",
                padding: "5px",
                opacity: "0.7",
              }}
            >
              ✕
            </button>
            <h3 style={{ margin: "0 0 15px 0", maxWidth: "100%" }}>
              {code.title}
            </h3>
            <div
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <QRCodeSVG
                id={`qr-svg-${index}`}
                value={code.url}
                size={200}
                bgColor="white"
                fgColor="black"
              />
            </div>
            <button
              onClick={() => downloadQR(index)}
              style={{
                backgroundColor: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                fontWeight: "bold",
                color: itemColors[index],
              }}
            >
              Download
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default QrList;
