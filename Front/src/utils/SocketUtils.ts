import * as signalR from '@aspnet/signalr';
import {SocketsAction} from 'src/enums';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5000/frontLinks')
  .build();

connection
  .start()
  .then()
  .catch(function (err) {
    return console.error(err.toString());
  });

export function getData(setAllServices, setLoader) {
  connection.on(SocketsAction.get, function (allServices) {
    setAllServices(allServices);
    setLoader(false);
  });
}

export const delService = (id: string): void => {
  connection.invoke('DeleteMessage', id);
};

export function addAndUpdate(method, data): void {
  connection.invoke('SendMessage', 'test', data);
}
