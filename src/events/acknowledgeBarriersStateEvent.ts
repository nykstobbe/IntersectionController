import WebSocket from "ws";

import { AcknowledgeBarriersState } from "../messages/AcknowledgeBarriersState";
import { RequestBridgeStateMessage } from "../messages/RequestBridgeState";
import { SetBoatRouteState } from "../messages/SetBoatRouteState";
import SessionData from "../state/sessionData";

function AcknowledgeBarriersStateEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBarriersState) {
    {
        const message : RequestBridgeStateMessage = {
            eventType: "REQUEST_BRIDGE_STATE",
            data: {
                state: "UP"
            }
        }
        
        ws.send(JSON.stringify(message));
    }
    {
        const firstRoute: number | undefined = sessionData.getFromBridgeQueue(0); 
        const message : SetBoatRouteState = {
            eventType: "SET_BOAT_ROUTE_STATE",
            data: {
                routeId: firstRoute,
                state: "GREENRED"
            }
        } 

        ws.send(JSON.stringify(message));
    }

    console.log("acknowledgebarrierstate");
}

export default AcknowledgeBarriersStateEvent;