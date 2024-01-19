const cors = require('cors');
const fs = require('fs');
const os = require('os');
const express = require('express');  
const app = express();  
const bodyParser = require('body-parser')  

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: originFunction,
};

function originFunction (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

const handler = (req, res) => {
  // Your handler logic here
};

app.get('/html1', handler);
app.get('/html2', handler);
app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'assets', 'files', filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});
app.get('/objects/:type/:id', handler);
app.get('/objects/:type', handler);
app.get('/objects', handler);
app.get('/info', handler);

app.listen(3000, () => console.log('Server is running on port 3000'));
