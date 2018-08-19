
import { Server, Socket, Client } from "socket.io";

export class WebSocket {

    io: Server = undefined;

    constructor(io: Server) {
        this.io = io;
    }
}