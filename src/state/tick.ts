import preferredRouteCombinations from "./getPreferedRouteCombinations";
import SessionData from "./sessionData";
import { setRouteState } from "./setRouteState";
import WebSocket from "ws";
import { SetBridgeWarningLightState } from "../messages/SetBridgeWarningLightState";
import { RequestBridgeRoadEmpty } from "../messages/RequestBridgeRoadEmpty";

let timeInSequence = 0;
let handlingRoutes: number[] | undefined = undefined;
let routeState = "RED";

function tick(ws: WebSocket, sessionData: SessionData, tickRate: number) {
    sessionData.tick++;
    if (handlingRoutes) {
        if (routeState == "GREEN") {
            if (timeInSequence >= 8 * 1000) {
                routeState = "ORANGE";

                handlingRoutes.forEach((routeId) => {
                    setRouteState(ws, routeId, "ORANGE");
                });
            }
        } else if (routeState == "ORANGE") {
            if (timeInSequence >= 12 * 1000) {
                routeState = "RED";

                handlingRoutes.forEach((routeId) => {
                    setRouteState(ws, routeId, "RED");
                });

                handlingRoutes = undefined;
                timeInSequence = 0;
            }
        }
    } else {
        handlingRoutes = preferredRouteCombinations(sessionData);
        
        if (handlingRoutes) {
            sessionData.doSequence();

            routeState = "GREEN";
            
            handlingRoutes.forEach((routeId) => {
                setRouteState(ws, routeId, "GREEN");
                sessionData.setRoutesWaitedSequences(routeId, 0);
            });
        }
    }

    if ((sessionData.getRouteCount(41) + sessionData.getRouteCount(42) > 0) && !sessionData.isHandlingBridge() && sessionData.tick - sessionData.lastBridgeTick > 250) {
        {
            const message : SetBridgeWarningLightState = {
                eventType: "SET_BRIDGE_WARNING_LIGHT_STATE",
                data: {
                    state: "ON"
                }
            }

            ws.send(JSON.stringify(message));
        }
        {
            const message : RequestBridgeRoadEmpty = {
                eventType: "REQUEST_BRIDGE_ROAD_EMPTY"
            }

            ws.send(JSON.stringify(message));
        }
        sessionData.setHandlingBridge(true);
    }

    timeInSequence += tickRate;
}

export default tick;