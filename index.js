// index.js
import qr from "qr-image";
import fs from "fs";

// Read the URL from input.txt
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
