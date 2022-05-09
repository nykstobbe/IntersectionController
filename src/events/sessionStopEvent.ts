import WebSocket from "ws";
import { Message } from "../messages/Message";
import SessionData from "../state/sessionData";

function SessionStopEvent(ws: WebSocket, sessionData: SessionData, msg: Message) {
    sessionData.clear();
    console.log("session started");
}

export default SessionStopEvent;