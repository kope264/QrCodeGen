import express from 'express';

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import qr from 'qr-image';  // Import qr-image

fs.readFile('input.txt', 'utf8', (err, url) => {
  if (err) throw err;

  // Generate QR code image
  const qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream('qr_img.png'));

  // Save URL to message.txt
  fs.writeFile('message.txt', url, (err) => {
    if (err) throw err;
    console.log('QR Code and URL saved successfully!');
  });
});

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
const PORT = process.env.PORT || 3000; // Must use process.env.PORT for Railway
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
