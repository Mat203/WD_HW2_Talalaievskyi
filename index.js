const cors = require('cors');
const fs = require('fs');
const os = require('os');
const express = require('express');  
const app = express();  
const bodyParser = require('body-parser')  
const path = require('path');
const handlers = require('./handlers'); 

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

app.use(cors(corsOptions)); 

app.get('/html1', handlers.html1Handler);
app.get('/html2', handlers.html2Handler);
app.get('/file/:filename', handlers.fileHandler);
app.get('/objects/:type/:id', handlers.objectHandler);
app.get('/objects/:type', handlers.objectsTypeHandler);
app.get('/objects', handlers.objectsHandler);
app.get('/info', handlers.infoHandler);

app.listen(3000, () => console.log('Server is running on port 3000'));
