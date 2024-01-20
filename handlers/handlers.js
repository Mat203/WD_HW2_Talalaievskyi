const fs = require('fs');
const path = require('path');

exports.html1Handler = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Data', 'sites', 'html1.html'));
};

exports.html2Handler = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Data', 'sites', 'html2.html'));
};

exports.fileHandler = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'data', filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
};

exports.objectHandler = (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  const filePath = path.join(__dirname, '..', 'data', 'objects', type, type + id + '.jpg');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Image not found');
  }
};

exports.objectsTypeHandler = (req, res) => {
  const type = req.params.type;
  const dirPath = path.join(__dirname, '..', 'data','objects', type);
  
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

exports.objectsHandler = (req, res) => {
  const dirPath = path.join(__dirname, '..', 'data', 'objects');
  
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

exports.infoHandler = (req, res) => {
  const infoPath = path.join(__dirname, '..', 'info.json');
  if (fs.existsSync(infoPath)) {
    res.sendFile(infoPath);
  } else {
    res.status(404).send('Info not found');
  }
};
