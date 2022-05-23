import WebSocket from "ws";

import { AcknowledgeBridgeWaterEmpty } from "../messages/AcknowledgeBridgeWaterEmpty";
import { RequestBridgeState } from "../messages/RequestBridgeState";
import { RequestBridgeWaterEmpty } from "../messages/RequestBridgeWaterEmpty";
import { SetBoatRouteState } from "../messages/SetBoatRouteState";
import SessionData from "../state/sessionData";

function AcknowledgeBridgeWaterEmptyEvent(ws: WebSocket, sessionData: SessionData, msg: AcknowledgeBridgeWaterEmpty) {
    console.log("Acknowledge bridge water empty")
    
    const firstRoute: number | undefined = sessionData.getFromBridgeQueue(0);

    if (firstRoute) {
        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: 41,
                    state: "RED"
                }
            }

            ws.send(JSON.stringify(message));
        }
        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: 42,
                    state: "RED"
                }
            }

            ws.send(JSON.stringify(message));
        }

        setTimeout(() => {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: firstRoute,
                    state: "GREEN"
                }
            }

            ws.send(JSON.stringify(message));
        }, 250)

        setTimeout(() => {
            {
                const message : RequestBridgeWaterEmpty = {
                    eventType: "REQUEST_BRIDGE_WATER_EMPTY"
                }
        
                ws.send(JSON.stringify(message));
            }
        }, 3000)
    } else {
        console.log("Closing bridge (custom)")
        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: 41,
                    state: "RED"
                }
            }

            ws.send(JSON.stringify(message));
        }

        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: 42,
                    state: "RED"
                }
            }

            ws.send(JSON.stringify(message));
        }

        {
            const message : RequestBridgeState = {
                eventType: "REQUEST_BRIDGE_STATE",
                data: {
                    state: "DOWN"
                }
            }

            ws.send(JSON.stringify(message));
        }
    }
}

export default AcknowledgeBridgeWaterEmptyEvent;