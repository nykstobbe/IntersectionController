import WebSocket, { RawData } from "ws";
import sessionStarted from "../events/sessionStarted";
import sessionStop from "../events/sessionStop";
import SetAutomobileRouteState from "../events/setAutomobileRouteState";
import { Message } from "../messages/Message";


function onMessage(ws: WebSocket, data: RawData) {
    console.log('received: %s', data);

    const message: Message = JSON.parse(data.toString());

    switch (message.eventType) {
        case "SESSION_START": {
            sessionStarted(ws, message);
            break;
        }
        case "SET_AUTOMOBILE_ROUTE_STATE": {
            SetAutomobileRouteState(ws, message);
            break;
        }
        case "ENTITY_ENTERED_ZONE": {

            break;
        }
        case "ENTITY_EXITED_ZONE": {

            break;
        }
        case "SESSION_STOP": {
            sessionStop(ws, message);
            break;
        }
        default: {
            console.log("unimplemented event type: %s", message.eventType)
        }
    }
};

export default onMessage;