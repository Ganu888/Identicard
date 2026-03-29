import { useRef } from "react";
import { toPng } from "html-to-image";
import Template1 from "./Template1";
import Template2 from "./Template2";
import "../styles/IdCardPreview.css";
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import * as htmlToImage from 'html-to-image';




const IdCardPreview = ({ studentData, template }) => {
  const cardRef = useRef(null);

j
const handleDownload = async () => {
  if (cardRef.current) {
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });

      const fileName = `${studentData.name.replace(/\s+/g, "-")}-ID-Card.png`;

      const isNative = Capacitor.isNativePlatform();

      if (isNative) {
        // 📱 MOBILE FIX

        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");

        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache,
        });

        // ✅ Use dataUrl instead of file.uri
        await Share.share({
          title: 'ID Card',
          text: 'Save this image',
          url: dataUrl,
        });

      } else {
        // 🌐 WEB
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }

    } catch (error) {
      console.error("Error generating image:", error);
    }
  }
};
  // const handleDownload = async () => {
  //   if (cardRef.current) {
  //     try {
  //       const dataUrl = await toPng(cardRef.current, { quality: 0.95 });

  //       const link = document.createElement("a");
  //       link.download = `${studentData.name.replace(/\s+/g, "-")}-ID-Card.png`;
  //       link.href = dataUrl;
  //       link.click();
  //     } catch (error) {
  //       console.error("Error generating image:", error);
  //     }
  //   }
  // };

  const qrCodeData = JSON.stringify({
    name: studentData.name,
    mobile: studentData.mobile,
  });

  return (
    <div className="id-card-preview">
      <div ref={cardRef} className="card-container">
        {template === "template1" ? (
          <Template1 studentData={studentData} qrCodeData={qrCodeData} />
        ) : (
          <Template2 studentData={studentData} qrCodeData={qrCodeData} />
        )}
      </div>

      <button onClick={handleDownload} className="download-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download as PNG
      </button>
    </div>
  );
};

export default IdCardPreview;
