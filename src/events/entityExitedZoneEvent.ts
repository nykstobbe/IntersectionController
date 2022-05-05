import WebSocket from "ws";
import { EntityExitedZone as EntityExitedZoneEvent } from "../messages/EntityExitedZone";
import SessionData from "../state/sessionData";

function EntityExitedZoneEvent(ws: WebSocket, sessionData: SessionData, msg: EntityExitedZoneEvent) {
    const routeId = msg.data.routeId;
    sessionData.decrementRouteCount(routeId);
}

export default EntityExitedZoneEvent;