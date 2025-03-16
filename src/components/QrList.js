import { QRCodeSVG } from "qrcode.react";

const QrList = ({ qrCodes = [] }) => {
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
      link.href = canvas.toDataURL("image/png"); // Converts to PNG
      link.download = `qrcode-${index}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url; // Load the SVG into an image
  };

  return (
    <div className="qr-list">
      {qrCodes.length === 0 ? (
        <p>No QR codes generated yet.</p>
      ) : (
        qrCodes.map((code, index) => (
          <div key={index} className="qr-item">
            <QRCodeSVG
              id={`qr-svg-${index}`}
              value={code}
              size={200}
              bgColor="transparent"
            />
            <p>{code}</p>
            <button onClick={() => downloadQR(index)}>Download PNG</button>
          </div>
        ))
      )}
    </div>
  );
};

export default QrList;
