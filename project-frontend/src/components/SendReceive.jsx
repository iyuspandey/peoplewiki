import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import sendFile from "./send"; // Import the sendFile function
import { Link } from "react-router-dom";
import { Database } from "lucide-react"; // Import the Database icon

const socket = io("https://peoplewiki.onrender.com"); // Connect to the WebSocket server

function SendReceive() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const fileBuffers = {};
  
   socket.on("file-chunk", ({ filename, chunk, isLast }) => {
  let typedChunk;

  // Case 1: Received as { type: 'Buffer', data: [...] }
  if (chunk && chunk.type === "Buffer" && Array.isArray(chunk.data)) {
    typedChunk = new Uint8Array(chunk.data);
  } 
  // Case 2: Already a Uint8Array (or ArrayBuffer)
  else if (chunk instanceof ArrayBuffer) {
    typedChunk = new Uint8Array(chunk);
  } 
  // Fallback
  else {
    console.warn("⛔ Unsupported chunk format:", chunk);
    return;
  }

  
      if (!fileBuffers[filename]) {
        fileBuffers[filename] = {
          chunks: [],
          size: 0,
        };
      }
  
      fileBuffers[filename].chunks.push(typedChunk);
      fileBuffers[filename].size += typedChunk.byteLength;
  
      if (isLast) {
        const blob = new Blob(fileBuffers[filename].chunks);
        const url = URL.createObjectURL(blob);
  
        setReceivedFiles((prev) => [
          ...prev,
          { filename, size: blob.size, url },
        ]);
  
        delete fileBuffers[filename];
      }
      console.log("Received chunk:", filename, chunk, isLast);

    });
  
    return () => {
      socket.off("file-chunk");
    };
  }, []);
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      sendFile(socket, selectedFile, (progress, speed) => {
        setProgress(progress);
        setSpeed(speed);
      });// Use the sendFile function to send the file
      alert(`Uploading file: ${selectedFile.name}`);
      setSelectedFile(null); // Reset the file input after upload
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="min-h-screen bg-black-900 flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-4 md:mb-0">
            <Database className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold terminal-text glow-text">
              <Link to="/" className="text-primary hover:text-primary/80">
              NIT Jalandhar <span className="text-gray-400">|</span> People Wiki
              </Link>
            </h1>
          </div>
      <h1 className="text-2xl font-bold terminal-text glow-text">File Transfer</h1>
      {/* File Upload Section */}
      
      <div className="mb-6 ">
        
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 bordertext-2xl font-bold terminal-text glow-text border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleFileUpload}
          className="bg-black-900 ttext-2xl font-bold terminal-text glow-text px-4 py-2 rounded"
        >
          Upload File
        </button>
      </div>

      {/* Received Files Section */}
      <div className="w-full max-w-md bg-black-900 shadow-md rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Received Files</h2>
        {receivedFiles.length === 0 ? (
          <p className="text-blue-900">No files received yet.</p>
        ) : (
          <ul className="list-disc list-inside">
  {receivedFiles.map((file, idx) => (
    <li key={idx} className="text-blue-900">
      {file.filename} ({(file.size / 1024).toFixed(2)} KB)
      <a
        href={file.url}
        download={file.filename}
        className="ml-2 text-blue-500 underline"
      >
        Download
      </a>
    </li>
  ))}
  {progress > 0 && (
  <div className="w-full max-w-md bg-black-900 shadow-md rounded p-4 mt-4">
    <h2 className="text-lg font-semibold mb-4">Upload Progress</h2>
    <p>Progress: {progress}%</p>
    <p>Speed: {speed} KB/s</p>
  </div>
)}
</ul>

        )}
      </div>
    </div>
  );
}

export default SendReceive;
