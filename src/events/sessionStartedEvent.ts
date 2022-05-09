import WebSocket from "ws";
import { Message } from "../messages/Message";
import SessionData from "../state/sessionData";

function SessionStartedEvent(ws: WebSocket, sessionData: SessionData, msg: Message) {
    sessionData.setRunning(true);
    console.log("session started");
}

export default SessionStartedEvent;