import express from 'express';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import qr from 'qr-image';  // Import qr-image

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle QR code generation
app.post('/generate-qr', (req, res) => {
  const url = req.body.url;

  // Generate QR code as a PNG in memory
  const qrSvg = qr.imageSync(url, { type: 'png' });  // Use qr here
  const qrBase64 = `data:image/png;base64,${qrSvg.toString('base64')}`;

  // Send the QR code as a Base64 string to the frontend
  res.send(qrBase64);
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
