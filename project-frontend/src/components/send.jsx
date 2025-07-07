// Send file
function sendFile(socket, file, onProgress) {
  const chunkSize = 64 * 1024; // 64KB
  const reader = new FileReader();
  let offset = 0;
  let startTime = Date.now(); // Track the start time

  reader.onload = (e) => {
    const chunk = e.target.result;

    // Emit the chunk to the server
    socket.emit("file-chunk", {
      filename: file.name,
      chunk,
      isLast: offset + chunkSize >= file.size,
    });

    offset += chunkSize;

    // Calculate progress
    const progress = Math.min((offset / file.size) * 100, 100).toFixed(2); // Percentage
    const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
    const speed = ((offset / 1024) / elapsedTime).toFixed(2); // Speed in KB/s

    // Call the onProgress callback with progress and speed
    if (onProgress) {
      onProgress(progress, speed);
    }

    // Read the next chunk if there is more data
    if (offset < file.size) {
      readNextChunk();
    }
  };

  function readNextChunk() {
    const slice = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(slice);
  }

  readNextChunk();
}

export default sendFile;
