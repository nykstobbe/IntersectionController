import WebSocket from "ws";

import { AcknowledgeBarriersState } from "../messages/AcknowledgeBarriersState";
import SessionData from "../state/sessionData";

function AcknowledgeBarriersStateEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBarriersState) {
    console.log(msg.eventType, "event not yet implemented")
}

export default AcknowledgeBarriersStateEvent;