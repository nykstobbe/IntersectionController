import WebSocket from "ws";

import { AcknowledgeBarriersState } from "../messages/AcknowledgeBarriersState";
import { RequestBridgeState } from "../messages/RequestBridgeState";
import { SetBoatRouteState } from "../messages/SetBoatRouteState";
import { SetBridgeWarningLightState } from "../messages/SetBridgeWarningLightState";
import SessionData from "../state/sessionData";

function AcknowledgeBarriersStateEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBarriersState) {
    if (msg.data.state == "DOWN") {

        {
            const message : RequestBridgeState = {
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

    } else if (msg.data.state == "UP") {

        const message : SetBridgeWarningLightState = {
            eventType: "SET_BRIDGE_WARNING_LIGHT_STATE",
            data: {
                state: "OFF"
            }
        }
        
        ws.send(JSON.stringify(message));

        
        sessionData.setHandlingBridge(false);
    }
}

export default AcknowledgeBarriersStateEvent;