import WebSocket from "ws";

import { AcknowledgeBridgeWaterEmpty } from "../messages/AcknowledgeBridgeWaterEmpty";
import { RequestBridgeState } from "../messages/RequestBridgeState";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeWaterEmptyEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeWaterEmpty) {
    console.log("acknowledgebridgewaterempty");
    
    const message : RequestBridgeState = {
        eventType: "REQUEST_BRIDGE_STATE",
        data: {
            state: "DOWN"
        }
    }

    ws.send(JSON.stringify(message));
}

export default AcknowledgeBridgeWaterEmptyEvent;