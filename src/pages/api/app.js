import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Get the file path relative to the public folder
  const filePath = path.join(process.cwd(), 'public', 'app.apk');

  // Read the file from the local filesystem
  const file = fs.readFileSync(filePath);

  // Set the response headers to indicate a downloadable APK file
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="file.apk"');

  // Send the file content as the API response
  res.send(file);
}