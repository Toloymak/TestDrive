import { SocketHubs } from 'src/enums';
import { SocketBase } from '@utils/SocketBase';

export const testSocket = () => {
    return {
        link: new SocketBase(SocketHubs.links),
        block: new SocketBase(SocketHubs.blocks),
    };
};
