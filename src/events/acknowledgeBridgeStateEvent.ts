import WebSocket from "ws";

import { AcknowledgeBridgeState } from "../messages/AcknowledgeBridgeState";
import { RequestBarriersState } from "../messages/RequestBarriersState";
import { RequestBridgeRoadEmpty } from "../messages/RequestBridgeRoadEmpty";
import { RequestBridgeWaterEmpty } from "../messages/RequestBridgeWaterEmpty";
import { SetBoatRouteState } from "../messages/SetBoatRouteState";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeStateEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeState) {
    if (msg.data.state == "UP") {
        const firstRoute: number | undefined = sessionData.getFromBridgeQueue(0);
        const message : SetBoatRouteState = {
            eventType: "SET_BOAT_ROUTE_STATE",
            data: {
                routeId: firstRoute,
                state: "GREEN"
            }
        }

        ws.send(JSON.stringify(message));
        console.log("Setting green")

        setTimeout(() => {
            console.log("Request bridge water empty")
            {
                const message : RequestBridgeWaterEmpty = {
                    eventType: "REQUEST_BRIDGE_WATER_EMPTY"
                }
        
                ws.send(JSON.stringify(message));
            }
        }, 5000)

    } else if (msg.data.state == "DOWN") {

        const message : RequestBarriersState = {
            eventType: "REQUEST_BARRIERS_STATE",
            data: {
                state: "UP"
            }
        }

        ws.send(JSON.stringify(message));
    }
}

export default AcknowledgeBridgeStateEvent;