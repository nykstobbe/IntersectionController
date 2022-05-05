import WebSocket from "ws";

export function setRouteState(ws: WebSocket, routeId: number, state: "RED" | "GREEN" | "ORANGE" | "BLINKING") {
    let eventType: string = "";

    if (routeId < 20) {
        eventType = "SET_AUTOMOBILE_ROUTE_STATE";
    } else if (routeId < 30) {
        eventType = "SET_CYCLIST_ROUTE_STATE";
    } else if (routeId < 40) {
        eventType = "SET_PEDESTRIAN_ROUTE_STATE";
        if (state == "ORANGE")
            state = "BLINKING";
    }

    const message = {
        eventType: eventType,
        data: {
            routeId: routeId,
            state: state,
        }
    };

    ws.send(JSON.stringify(message));
}
