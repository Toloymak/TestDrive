const {PORT} = require('./constants/constants');

const app = require('express')();
const server = require('http').Server(app);

const listenOfEvents = require('./server/listeningOfEvents');

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  listenOfEvents(socket)
});

server.listen(PORT, () => console.log('Express app listening on localhost:', PORT));