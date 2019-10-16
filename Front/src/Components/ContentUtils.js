import {DELETED_DATA, GET_DATA, PORT} from '../../constants/constants';


// import io from 'socket.io-client';
// let socket = io.connect(`http://localhost:${PORT}/ws`, {'force new connection': true});
// let socket = io(`http://vm-lastMile.kontur:${PORT}`);

let url = `ws://localhost:${PORT}/socket.io`;
let socket = new WebSocket(url);
socket.onopen = function(e) {
    console.log("[open] Соединение установлено");
};

socket.onmessage = function(event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
};


export function getData(callback) {
  //   socket.on(GET_DATA, function (allServices) {
  //   allServices = allServices;
  //   callback({allServices, showedSpinner: false});
  // });
  //
  // socket.on(GET_DATA, function(allServices) {
  //   allServices = allServices;
  //   callback({allServices, showedSpinner: false});
  // });
}

export function delService(id) {
  socket.emit(DELETED_DATA, id);
}

export function addAndUpdate(method, data) {
  socket.emit(method, data);
}