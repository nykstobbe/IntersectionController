import WebSocket from "ws";
import { SetAutomobileRouteStateMessage } from "../messages/setAutomobileRouteState";
import RouteMaskInstance from "../routeMask";
import onMessage from "./onMessage";
import onOpen from "./onOpen";
import SessionData from "../state/sessionData";

const sequence = [
    [4, 10, 9, 3],
    [7, 8, 2, 1],
    [10, 11, 12],
    [5],
    [15],
]

function setRouteState(ws: WebSocket, routeId: number, state: "RED" | "GREEN" | "ORANGE") {
    const message: SetAutomobileRouteStateMessage = {
        eventType: "SET_AUTOMOBILE_ROUTE_STATE",
        data: {
            routeId: routeId,
            state: state,
        }
    }

    ws.send(JSON.stringify(message));
}

function initialize() {
    const ws = new WebSocket(process.env.URL!);
    const sessionData = new SessionData();
    
    let timeInSequence = 0;
    let handlingRoutes: number[] | undefined = undefined;
    let routeState = "RED";

    ws.on('open', () => { onOpen(ws, sessionData) });
    ws.on('message', (data) => { onMessage(ws, sessionData, data) });

    const tickRate = 1 / 60;
    setInterval(() => {
        if (handlingRoutes) {
            timeInSequence += tickRate;

            if (routeState == "GREEN") {
                if (timeInSequence >= 5) {
                    routeState = "ORANGE";

                    handlingRoutes.forEach((routeId) => {
                        setRouteState(ws, routeId, "ORANGE");
                    });
                }
            } else if (routeState == "ORANGE") {
                if (timeInSequence >= 7) {
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
    }, tickRate);
}

function preferredRouteCombinations(sessionData: SessionData): number[] {
    const waitingRoutes = sessionData.getRoutesWithEntitites();

    const combinations: number[][] = [];

    waitingRoutes.forEach(route => {
        [...combinations].forEach(combination => {
            let isValidToAdd = true;

            combination.forEach(otherRoute => {
                if (RouteMaskInstance.doesOverlap(route, otherRoute)) {
                    isValidToAdd = false;        
                }
            })

            if (isValidToAdd) {
                combinations.push([...combination, route])
            }
        });

        combinations.push([route])
    })
    
    
    const scores = combinations.map(combination => {
        return combination.reduce((accumulator, route) =>
            accumulator + sessionData.getRouteCount(route), 0
        )
    })

    const mappedScores: {c: number[], s : number}[] = [];
    combinations.forEach((combination, index) => {
        mappedScores.push({
            c: combination,
            s: scores[index],
        })
    });

    const preferredRoutes = combinations[scores.indexOf(Math.max(...scores, 0))];

    return preferredRoutes;
}

export default initialize;