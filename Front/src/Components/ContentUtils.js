import {DELETED_DATA, GET_DATA, PORT} from '../../constants/constants';
import * as signalR from '@aspnet/signalr';

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/links").build();

connection.on("ReceiveMessage", function (user, message) {
});

connection.start()
.then(function () {})
.catch(function (err) {
  return console.error(err.toString());
});

// import io from 'socket.io-client';
// let socket = io.connect(`http://localhost:${PORT}/ws`, {'force new connection': true});
// let socket = io(`http://vm-lastMile.kontur:${PORT}`);

/*
let url = `ws://localhost:${PORT}/socket.io`;
let socket = new WebSocket(url);
socket.onopen = function(e) {
    console.log("[open] Соединение установлено");
};

socket.onmessage = function(event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onopen = function(e) {
  console.log("[open] Соединение установлено");
  console.log("Отправляем данные на сервер");
  socket.send("Меня зовут Джон");
  console.log("Ок");
};

socket.onmessage = function(event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log('[close] Соединение прервано');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};
*/

export function getData(callback) {
  console.log("GETDATA");
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