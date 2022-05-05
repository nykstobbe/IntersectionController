import WebSocket from "ws";

import { AcknowledgeBridgeRoadEmpty } from "../messages/AcknowledgeBridgeRoadEmpty";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeRoadEmptyEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeRoadEmpty) {
    console.log(msg.eventType, "event not yet implemented")
}

export default AcknowledgeBridgeRoadEmpty;