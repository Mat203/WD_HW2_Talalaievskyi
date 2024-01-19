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
  const filePath = path.join(__dirname, 'data', filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
};

const objectHandler = (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  const filePath = path.join(__dirname, 'data', 'images', type + id + '.jpg');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Image not found');
  }
};

const objectsTypeHandler = (req, res) => {
  const type = req.params.type;
  const dirPath = path.join(__dirname, 'data','objects', type);
  
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);  
      res.status(500).send(err.message); 
    } else {
      const images = files.map(file => ({
        name: file,
      }));
      res.json(images);
    }
  });
};

const objectsHandler = (req, res) => {
  const dirPath = path.join(__dirname, 'data', 'objects');
  
  fs.readdir(dirPath, (err, directories) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    } else {
      const allObjects = directories.filter(directory => {
        const typePath = path.join(dirPath, directory);
        return fs.statSync(typePath).isDirectory();
      });
      res.json(allObjects);
    }
  });
};

const infoHandler = (req, res) => {
  const infoPath = path.join(__dirname, 'info.json');
  if (fs.existsSync(infoPath)) {
    res.sendFile(infoPath);
  } else {
    res.status(404).send('Info not found');
  }
};


app.get('/html1', html1Handler);
app.get('/html2', html2Handler);
app.get('/file/:filename', fileHandler);
app.get('/objects/:type/:id', objectHandler);
app.get('/objects/:type', objectsTypeHandler);
app.get('/objects', objectsHandler);
app.get('/info', infoHandler);

app.listen(3000, () => console.log('Server is running on port 3000'));
