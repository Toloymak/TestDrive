const {sendData, dataAcquisition} = require('./dataTransfer');
const fs = require("fs");
const {UPDATE_DATA, CREATE_DATA, DELETED_DATA} = require('../constants/constants');

const {addService, deleteService, updateService} = require('./utils');

function fullData() {
  const data = fs.readFileSync("./server/data.json", "utf8");
  return JSON.parse(data);
}

function listenOfEvents(socket) {
  sendData(socket, fullData());

  socket.on(CREATE_DATA, data => {
    dataAcquisition(socket, addService(fullData(), data));
  });

  socket.on(UPDATE_DATA, data => {
    dataAcquisition(socket, updateService(fullData(), data));
  });

  socket.on(DELETED_DATA, data => {
    dataAcquisition(socket, deleteService(fullData(), data));
  });
}


module.exports = listenOfEvents;