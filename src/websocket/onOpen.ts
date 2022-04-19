import WebSocket from "ws";
import { ConnectController } from "../messages/connectController";
import SessionData from "../state/sessionData";

function onOpen(ws: WebSocket, sessionData: SessionData) {
    const sessionName: string = process.env.SESSION!;
    console.log(`Starting on session: ${sessionName}`)

    const message: ConnectController = {
        eventType: "CONNECT_CONTROLLER",
        data: {
            sessionName: sessionName,
            sessionVersion: 1,

            discardEventTypeErrors: false,
            discardInvalidStateErrors: false,
            discardMalformedDataErrors: false,
            discardParseErrors: false,
        }
    }

    ws.send(JSON.stringify(message));
};

export default onOpen;