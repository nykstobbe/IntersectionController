import WebSocket from "ws";

import { AcknowledgeBridgeRoadEmpty } from "../messages/AcknowledgeBridgeRoadEmpty";
import { RequestBarriersState } from "../messages/RequestBarriersState";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeRoadEmptyEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeRoadEmpty) {    
    const message : RequestBarriersState = {
        eventType: "REQUEST_BARRIERS_STATE",
        data: {
            state: "DOWN"
        }
    }

    ws.send(JSON.stringify(message));

}

export default AcknowledgeBridgeRoadEmptyEvent;