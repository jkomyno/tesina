var express = require('express');
var app = express();
// if PORT belongs to the environment variables, then use that value.
// Else, use value 3000.
var port = process.env.PORT || 3000;

var server = require('http').Server(app);
var p2pserver = require('socket.io-p2p-server').Server;
var io = require('socket.io')(server);

server.listen(port);
console.log('Listening on port', port);

// We are saving Usernames and their id's on a server
var userList = [];

// Communication with our main WebTorrent.js React Component through this Socket connection
io.on('connection', function (socket) {
  socket.emit('get-socket-id', socket.id);
  console.log("Emitting: get-socket-id -> " + socket.id);

  socket.nsp.emit('user-list', userList);

  socket.on('new-user', function (data) {
    console.log("Listening: new-user -> " + data.username, data.socketId);
    userList.push({ username: data.username, socketId: data.socketId });
    console.log("Emitting: new-user -> " + userList, data.username, data.socketId);
    socket.nsp.emit('new-user', { userList, newUser: data.username, self: data.socketId });
  });

  socket.on('disconnect', function () {

    var disconnectedUser =
      userList
        .filter(user => user.socketId === socket.id)
        .reduce((username, user) => user.username, '');

    console.log("disconnected user: " + disconnectedUser);
    userList = userList.filter(user => user.socketId !== socket.id);
    socket.nsp.emit('disconnect-user', { userList, disconnectedUser });
  });

  socket.on('file-data', function (data) {
    socket.nsp.emit('file-data', data);
  });

  socket.on('ask-for-file', function (data) {
    console.log("");
    console.log("-----------------------------------------");
    console.log("/////////////////////////////////////////");
    console.log("|||||||||||||||||||||||||||||||||||||||||");
    console.log("-----------------------------------------");
    console.log("ON ASK FOR FILE", JSON.stringify(data));
    io.to(data.seederSocketId)
      .emit('give-file-back',
      {
        leecherSocketId: data.leecherSocketId,
        leecherUsername: data.leecherUsername,
        requestedFileId: data.requestedFileId,
      }
    );
  });

  socket.on('peer-file', function (data) {
    console.log("");
    console.log("-----------------------------------------");
    console.log("/////////////////////////////////////////");
    console.log("|||||||||||||||||||||||||||||||||||||||||");
    console.log("-----------------------------------------");
    console.log("ON PEER FILE", JSON.stringify(data));
    io.to(data.fileLeecher).emit('peer-file', data);
  });
});