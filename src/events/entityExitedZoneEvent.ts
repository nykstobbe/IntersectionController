import WebSocket from "ws";
import { EntityExitedZone } from "../messages/EntityExitedZone";
import SessionData from "../state/sessionData";

function EntityExitedZoneEvent(ws: WebSocket, sessionData: SessionData, msg: EntityExitedZone) {
    const routeId = msg.data.routeId;
    sessionData.decrementRouteCount(routeId);
}

export default EntityExitedZoneEvent;