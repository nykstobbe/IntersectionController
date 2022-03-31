import WebSocket from "ws";
import { connectController } from "../messages/connectController";

function onOpen(ws: WebSocket) {

    const sessionName: string = process.env.SESSION!;
    console.log('starting on session: %s', sessionName)

    const message: connectController = {
        eventType: "CONNECT_CONTROLLER",
        data: {
            sessionName: "JustinEnNyk",
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