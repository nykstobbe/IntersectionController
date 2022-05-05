import WebSocket from "ws";
import onMessage from "./onMessage";
import onOpen from "./onOpen";
import SessionData from "../state/sessionData";

function initialize(url: string, sessionData: SessionData) {
    const ws = new WebSocket(url);
    
    ws.on('open', () => { onOpen(ws, sessionData) });
    ws.on('message', (data) => { onMessage(ws, sessionData, data) });

    return ws;
}

export default initialize;