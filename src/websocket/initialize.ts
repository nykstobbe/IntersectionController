import WebSocket from "ws";
import onMessage from "./onMessage";
import onOpen from "./onOpen";
import SessionData from "../state/sessionData";

function initialize(sessionData: SessionData) {
    const ws = new WebSocket(process.env.URL!);
    
    ws.on('open', () => { onOpen(ws, sessionData) });
    ws.on('message', (data) => { onMessage(ws, sessionData, data) });

    return ws;
}

export default initialize;