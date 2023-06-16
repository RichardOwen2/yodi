import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Get the file path relative to the public folder
  const filePath = path.join(process.cwd(), 'public', 'app.apk');

  // Set the response headers to indicate a downloadable APK file
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="largeFile.apk"');

  // Create a read stream for the APK file
  const stream = fs.createReadStream(filePath);

  // Stream the APK file content to the response
  stream.pipe(res);
}

export const config = {
  api: {
    responseLimit: false,
  },
}
