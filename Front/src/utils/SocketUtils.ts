import { SocketHubs } from 'src/enums';

import { SocketBase } from './SocketBase';

export interface SocketModel {
    links: SocketBase;
    blocks: SocketBase;
}

export function createSocket(): SocketModel {
    return {
        links: new SocketBase(SocketHubs.links),
        blocks: new SocketBase(SocketHubs.blocks)
    };
}
