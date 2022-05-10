import WebSocket from "ws";
import { RequestBridgeWaterEmpty } from "../messages/RequestBridgeWaterEmpty";
import { SetBoatRouteState } from "../messages/SetBoatRouteState";

export default class SessionData {
    private entityInRouteCount: Map<number, number>;
    private bridgeQueue: Array<number>
    private running: boolean;
    private handlingBridge: boolean;

    public constructor() {
        this.running = false;
        this.entityInRouteCount = new Map();
        this.handlingBridge = false;
        this.bridgeQueue = new Array();
    }

    public clear() {
        this.running = false;
        this.entityInRouteCount = new Map();
        this.handlingBridge = false;
        this.bridgeQueue = new Array();
    }

    public setRunning(running: boolean) {
        this.running = running;
    }

    public getRunning(): boolean { 
        return this.running;
    }

    public incrementRouteCount(routeId: number) {
        if (!this.entityInRouteCount.has(routeId)) {
            this.entityInRouteCount.set(routeId, 0);
        }
        
        const count = this.entityInRouteCount.get(routeId)!;
        this.entityInRouteCount.set(routeId, count + 1);

        if(routeId > 40) {
            this.bridgeQueue.push(routeId);
        }
    }

    public switchBridgeSide(firstRoute: number, ws: WebSocket) {
        console.log("switchbridgeside");

        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: firstRoute,
                    state: "RED"
                }
            }
            ws.send(JSON.stringify(message));
        }

        const secondRoute = firstRoute == 41 ? 42 : 41;

        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: secondRoute,
                    state: "GREEN"
                }
            }
            ws.send(JSON.stringify(message));
        }
    }

    public closeBridge(routeId: number, ws: WebSocket) {
        console.log("requestbridgewaterempty");
        {
            const message : SetBoatRouteState = {
                eventType: "SET_BOAT_ROUTE_STATE",
                data: {
                    routeId: routeId,
                    state: "RED"
                }
            }

            ws.send(JSON.stringify(message));
        }
        {
            const message : RequestBridgeWaterEmpty = {
                eventType: "REQUEST_BRIDGE_WATER_EMPTY"
            }

            ws.send(JSON.stringify(message));
        }
        

        
    } 

    public decrementRouteCount(routeId: number, ws: WebSocket) {
        const count = this.entityInRouteCount.get(routeId)!;

        if (count > 1)
            this.entityInRouteCount.set(routeId, count - 1);
        else
            this.entityInRouteCount.delete(routeId);

        if(routeId > 40) {
            for (let i = 0; i < this.bridgeQueue.length; i++) {
                if (this.bridgeQueue[i] == routeId) {
                    this.bridgeQueue.splice(i, 1);
                    break;
                }
            }
            if (!this.bridgeQueue.includes(routeId) && this.bridgeQueue.length > 0) {
                this.switchBridgeSide(routeId, ws);
            } else if (this.bridgeQueue.length == 0) {
                this.closeBridge(routeId, ws);
            }
        }
    }

    public getRouteCount(routeId: number): number {
        if (!this.entityInRouteCount.has(routeId)) {
            return 0
        }

        return this.entityInRouteCount.get(routeId)!;
    }
    
    public getRoutesWithEntitites(): number[] {
        return Array.from(this.entityInRouteCount.keys());
    }

    public isHandlingBridge() {
        return this.handlingBridge;
    }

    public setHandlingBridge(handlingBridge: boolean) {
        this.handlingBridge = handlingBridge;
    }

    public pushBridgeQueue(routeId: number) {
        this.bridgeQueue.push(routeId);
    }

    public popFromBridgeQueue() {
        return this.bridgeQueue.shift();
    }

    public getFromBridgeQueue(index: number) {
        return this.bridgeQueue[index];
    }
}