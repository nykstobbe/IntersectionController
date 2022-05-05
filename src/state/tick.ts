import preferredRouteCombinations from "./getPreferedRouteCombinations";
import SessionData from "./sessionData";
import { setRouteState } from "./setRouteState";
import WebSocket from "ws";

let timeInSequence = 0;
let handlingRoutes: number[] | undefined = undefined;
let routeState = "RED";

function tick(ws: WebSocket, sessionData: SessionData, tickRate: number) {
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
        handlingRoutes = preferredRouteCombinations(sessionData);;
        
        if (handlingRoutes) {
            routeState = "GREEN";
            
            handlingRoutes.forEach((routeId) => {
                setRouteState(ws, routeId, "GREEN");
            });
        }
    }
    timeInSequence += tickRate;
}

export default tick;