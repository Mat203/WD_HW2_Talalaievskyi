const cors = require('cors');
const fs = require('fs');
const os = require('os');
const express = require('express');  
const app = express();  
const bodyParser = require('body-parser')  
const path = require('path');

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

const html1Handler = (req, res) => {
  res.sendFile(path.join(__dirname, 'Data', 'sites', 'html1.html'));
};

const html2Handler = (req, res) => {
  res.sendFile(path.join(__dirname, 'Data', 'sites', 'html2.html'));
};

const fileHandler = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'Data', filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
};

app.get('/html1', html1Handler);
app.get('/html2', html2Handler);
app.get('/file/:filename', fileHandler);
//app.get('/objects/:type/:id', handler);
//app.get('/objects/:type', handler);
//app.get('/objects', handler);
//app.get('/info', handler);

app.listen(3000, () => console.log('Server is running on port 3000'));
