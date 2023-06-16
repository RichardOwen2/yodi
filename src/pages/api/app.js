import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'app.apk');

  const chunkSize = 1024 * 1024; // 1MB chunk size

  const fileStats = fs.statSync(filePath);
  const fileSize = fileStats.size;

  // Calculate the number of chunks needed
  const numChunks = Math.ceil(fileSize / chunkSize);

  // Set the response headers to indicate a downloadable APK file
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="yodi.apk"');

  for (let chunkIndex = 0; chunkIndex < numChunks; chunkIndex++) {
    // Calculate the start and end positions for the current chunk
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, fileSize);

    // Create a readable stream for the current chunk
    const fileStream = fs.createReadStream(filePath, { start, end });

    // Stream the chunk content to the response
    await new Promise((resolve) => {
      fileStream.pipe(res, { end: false });
      fileStream.on('end', resolve);
    });
  }

  res.end();
}

export const config = {
  api: {
    responseLimit: false,
  },
}
