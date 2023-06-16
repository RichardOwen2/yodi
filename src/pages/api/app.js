import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Get the file path relative to the public folder
  const filePath = path.join(process.cwd(), 'public', 'app.apk');

  // Set the response headers to indicate a downloadable APK file
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="yodi.apk"');

  // Create a readable stream for the APK file
  const fileStream = fs.createReadStream(filePath);

  // Enable chunked encoding for progressive response
  res.setHeader('Transfer-Encoding', 'chunked');

  // Stream the file content to the response in chunks
  fileStream.pipe(res);
}
export const config = {
  api: {
    responseLimit: false,
  },
}
