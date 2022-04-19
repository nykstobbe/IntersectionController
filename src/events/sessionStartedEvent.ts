import WebSocket from "ws";
import { Message } from "../messages/message";
import SessionData from "../state/sessionData";

function SessionStartedEvent(ws: WebSocket, sessionData: SessionData, msg: Message) {
    sessionData.setRunning(true);
}

export default SessionStartedEvent;