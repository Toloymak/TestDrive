import * as signalR from '@aspnet/signalr';
import {SocketsAction, SocketHubs} from 'src/enums';
import {SocketBase} from './SocketBase';

export function createSocket(hub: SocketHubs) {
    return new SocketBase(hub);
}
