import WebSocket from "ws";
import { Message } from "../messages/message";
import clear from "../state/clear";
import SessionData from "../state/sessionData";

function SessionStopEvent(ws: WebSocket, sessionData: SessionData, msg: Message) {
    sessionData.setRunning(true);
    clear();
}

export default SessionStopEvent;