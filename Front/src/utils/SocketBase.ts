import * as signalR from '@aspnet/signalr';
import {HubConnectionBuilder} from '@aspnet/signalr';
import {HubConnection} from '@aspnet/signalr';

import {SocketHubs, SocketsAction} from 'src/enums';
import {SOCKETS_PORT} from 'src/Constants';

export class SocketsBase {
  private readonly _url: string;
  private readonly _socket: HubConnection;

  constructor(hub: SocketHubs) {
    this._url = `http://localhost:${SOCKETS_PORT}/${hub}`;
    this._socket = this.newConnect(this._url);

    this.init();
  }

  private newConnect(url: string): HubConnection {
    return new signalR.HubConnectionBuilder().withUrl(url).build();
  }

  private init() {
    this._socket
      .start()
      .then(data => console.log(data))
      .catch(err => console.error(err.toString()));
  }

  protected create<T>(params: T): void {
    this._socket.invoke(SocketsAction.create, params);
  }

  protected edit<T>(params: T): void {
    this._socket.invoke(SocketsAction.update, params);
  }

  protected delete(id: string): void {
    this._socket.invoke(SocketsAction.deleted, id);
  }
}
