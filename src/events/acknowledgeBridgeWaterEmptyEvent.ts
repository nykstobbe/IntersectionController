import WebSocket from "ws";

import { AcknowledgeBridgeWaterEmpty } from "../messages/AcknowledgeBridgeWaterEmpty";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeWaterEmptyEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeWaterEmpty) {
    console.log(msg.eventType, "event not yet implemented")
}

export default AcknowledgeBridgeWaterEmptyEvent;