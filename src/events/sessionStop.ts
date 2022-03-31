import WebSocket from "ws";
import { Message } from "../messages/Message";
import clear from "../state/clear";

function sessionStop(ws: WebSocket, msg: Message) {
    clear()
}

export default sessionStop;