const fs = require('fs');
const http = require('http');
const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
server.listen(3001);

const listener = require('socket.io')(server);
listener.on('connection', (socket) => {
  let killServer = false;
  if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
  socket.on('disconnect', () => {
    killServer = true;
    const validateKillingServer = () =>  killServer ? server.close() : null;
    setTimeout(() => validateKillingServer(), 60000);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = req.params.directory;
    if (!fs.existsSync(`./uploads/${dir}`)) fs.mkdirSync(`./uploads/${dir}`);
    cb(null, `./uploads/${dir}`);
  },
  filename: (req, file, cb) => {
    let shortenedOrOriginalFilename;
    const newName = req.params.newName;
    const extension = file.originalname.split('.').at(-1);
    const start = Number(req.params.startPositionToRemove);
    const end = Number(req.params.endPositionToRemove);

    if (start < 0 || end < 0 || end < start || end >= file.originalname.length) {
      shortenedOrOriginalFilename = file.originalname
    } else {
      shortenedOrOriginalFilename = `${file.originalname.slice(0, start)}${file.originalname.slice(end + 1)}`;
    }

    const extensionToCompare = shortenedOrOriginalFilename.split('.').at(-1);
    if (extensionToCompare !== extension) {
      cb(null, `${newName}_${shortenedOrOriginalFilename}.${extension}`);
    } else {
      cb(null, `${newName}_${shortenedOrOriginalFilename}`);
    }
  }
});

const upload = multer({ storage });

app.post('/rename/:newName/:directory/:startPositionToRemove/:endPositionToRemove', upload.any('files'), (req, res) => {
  try {
    res.status(200).json('success');
  } catch(err) {
    res.status(500).json('error');
  }
});