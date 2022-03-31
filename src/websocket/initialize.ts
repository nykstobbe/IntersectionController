import WebSocket from "ws";
import onMessage from "./onMessage";
import onOpen from "./onOpen";

function initialize() {
    
    const ws = new WebSocket(process.env.URL!);

    ws.on('open', () => { onOpen(ws) });
    ws.on('message', (data) => { onMessage(ws, data) });

}

export default initialize;