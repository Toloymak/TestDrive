import {DELETED_DATA, GET_DATA, PORT} from '../../constants/constants';
import * as signalR from '@aspnet/signalr';

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/links").build();

connection.on("ReceiveMessage", function (message) {
  console.log("Сообщение: " + message[0].url)
});

connection.start()
.then(function () {})
.catch(function (err) {
  return console.error(err.toString());
});


export function getData(callback) {
    connection.on(GET_DATA, function (allServices) {
     allServices = allServices;
     callback({allServices, showedSpinner: false});
   });
  
   connection.on(GET_DATA, function(allServices) {
     allServices = allServices;
     callback({allServices, showedSpinner: false});
   });
}

export function delService(id) {
  connection.invoke("DeleteMessage", id);
}

export function addAndUpdate(method, data) {
  connection.invoke("SendMessage", "test", data);
}