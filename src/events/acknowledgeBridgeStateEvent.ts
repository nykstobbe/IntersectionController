import WebSocket from "ws";

import { AcknowledgeBridgeState } from "../messages/AcknowledgeBridgeState";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeStateEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeState) {
    console.log(msg.eventType, "event not yet implemented")
}

export default AcknowledgeBridgeStateEvent;