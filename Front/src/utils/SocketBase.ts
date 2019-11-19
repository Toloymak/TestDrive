// eslint-disable-next-line import/no-duplicates
import { HubConnection } from '@aspnet/signalr';
// eslint-disable-next-line import/no-duplicates
import * as signalR from '@aspnet/signalr';

import { SocketHubs, SocketsAction } from 'src/enums';
import { LinkModel } from 'src/Components/Content';

export class SocketBase {
    private readonly _url: string;
    private readonly _socket: HubConnection;

    constructor(hub: SocketHubs) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this._url = `http://${SOCKETS_HOSTNAME}:${SOCKETS_PORT}/${hub}`;
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

    public getData(setAllServices) {
        this._socket.on(SocketsAction.get, allServices => {
            setAllServices(allServices);
        });
    }

    public create(params: Partial<LinkModel>): void {
        this._socket.invoke(SocketsAction.create, params);
    }

    public edit(params: Partial<LinkModel>): void {
        this._socket.invoke(SocketsAction.update, params);
    }

    public delete(id: string): void {
        this._socket.invoke(SocketsAction.deleted, id);
    }
}
