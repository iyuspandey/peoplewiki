// Send file
function sendFile(socket, file) {
    const chunkSize = 64 * 1024; // 64KB
    const reader = new FileReader();
    let offset = 0;
  
    reader.onload = (e) => {
      socket.emit("file-chunk", {
        filename: file.name,
        chunk: e.target.result,
        isLast: offset + chunkSize >= file.size
      });
  
      offset += chunkSize;
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
  