const express = require('express');
const router = express.Router();
const { generateQRCodeImageBuffer } = require('../utils/qrCodeUtils'); // Import your QR code generation logic

router.get('/api/GenerateQRCode', async (req, res) => {
  try {
    const text = req.query.text; // Get text from query parameters
    
    // Generate the QR code image buffer (replace with actual image generation logic)
    const qrCodeImageBuffer = await generateQRCodeImageBuffer(text);

    // Set the content type to JPEG
    res.setHeader('Content-Type', 'image/jpeg');
    
    // Send the JPEG image buffer as the response
    res.send(qrCodeImageBuffer);
  } catch (error) {
    // Handle errors (optional)
    res.status(500).send('Error generating QR code');
  }
});

module.exports = router;
