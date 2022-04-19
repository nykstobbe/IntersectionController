import WebSocket from "ws";
import { EntityEnteredZone } from "../messages/entityEnteredZone";
import SessionData from "../state/sessionData";

function EntityEnteredZoneEvent(ws: WebSocket, sessionData: SessionData, msg: EntityEnteredZone) {
    const routeId = msg.data.routeId;
    sessionData.incrementRouteCount(routeId);
}

export default EntityEnteredZoneEvent;