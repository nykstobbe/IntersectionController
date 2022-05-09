import WebSocket, { RawData } from "ws";
import AcknowledgeBarriersStateEvent from "../events/acknowledgeBarriersStateEvent";
import AcknowledgeBridgeRoadEmptyEvent from "../events/acknowledgeBridgeRoadEmptyEvent";
import AcknowledgeBridgeStateEvent from "../events/acknowledgeBridgeStateEvent";
import AcknowledgeBridgeWaterEmptyEvent from "../events/acknowledgeBridgeWaterEmptyEvent";
import EntityEnteredZoneEvent from "../events/entityEnteredZoneEvent";
import EntityExitedZoneEvent from "../events/entityExitedZoneEvent";
import SessionStartedEvent from "../events/sessionStartedEvent";
import SessionStopEvent from "../events/sessionStopEvent";
import { Message } from "../messages/Message";
import SessionData from "../state/sessionData";

function onMessage(ws: WebSocket, sessionData: SessionData, data: RawData) {
    // console.log('received: %s', data);

    const message: Message = JSON.parse(data.toString());

    switch (message.eventType) {
        case "SESSION_START": {
            SessionStartedEvent(ws, sessionData, message);
            break;
        }
        case "ENTITY_ENTERED_ZONE": {
            EntityEnteredZoneEvent(ws, sessionData, message);
            break;
        }
        case "ENTITY_EXITED_ZONE": {
            EntityExitedZoneEvent(ws, sessionData, message);
            break;
        }
        case "SESSION_STOP": {
            SessionStopEvent(ws, sessionData, message);
            break;
        }
        case "ACKNOWLEDGE_BRIDGE_ROAD_EMPTY": {
            AcknowledgeBridgeRoadEmptyEvent(ws, sessionData, message);
            break;
        }
        case "ACKNOWLEDGE_BARRIERS_STATE": {
            AcknowledgeBarriersStateEvent(ws, sessionData, message);
            break;
        }
        case "ACKNOWLEDGE_BRIDGE_STATE": {
            AcknowledgeBridgeStateEvent(ws, sessionData, message);
            break;
        }
        case "ACKNOWLEDGE_BRIDGE_WATER_EMPTY": {
            AcknowledgeBridgeWaterEmptyEvent(ws, sessionData, message);
            break;
        }
        case "SESSION_STOP": {
            SessionStopEvent(ws, sessionData, message);
            break;
        }
        default: {
            console.log("unimplemented event type: %s", message.eventType)
            console.log(JSON.stringify(message));
        }
    }
};

export default onMessage;