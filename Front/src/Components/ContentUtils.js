import {DELETED_DATA, GET_DATA, PORT} from '../../constants/constants';

import io from 'socket.io-client';
let socket = io.connect(`http://localhost:${PORT}`, {'force new connection': true});
// let socket = io(`http://vm-lastMile.kontur:${PORT}`);

export function getData(callback) {
  socket.on(GET_DATA, function(allServices) {
    allServices = allServices;
    callback({allServices, showedSpinner: false});
  });
}

export function delService(id) {
  socket.emit(DELETED_DATA, id);
}

export function addAndUpdate(method, data) {
  socket.emit(method, data);
}