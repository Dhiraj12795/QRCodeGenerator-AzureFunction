const express = require('express');
const app = express();
const qrCodeRoutes = require('./routes/qrCodeGenerator');

app.use('/', qrCodeRoutes); // Use the routes

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
