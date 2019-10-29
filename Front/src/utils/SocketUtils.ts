import * as signalR from "@aspnet/signalr";

import {SOCKETS} from "src/Constants";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/links")
  .build();

connection.on("ReceiveMessage", function(message) {
  console.log(`Сообщение: ${message[0].url}`);
});

connection
  .start()
  .then()
  .catch(function(err) {
    return console.error(err.toString());
  });

export function getData(setAllServices, setLoader) {
  connection.on(SOCKETS.GET_DATA, function(allServices) {
    setAllServices(allServices);
    setLoader(false);
  });
}

export const delService = (id: string): void => {
  connection.invoke("DeleteMessage", id);
};

export function addAndUpdate(method, data): void {
  connection.invoke("SendMessage", "test", data);
}
