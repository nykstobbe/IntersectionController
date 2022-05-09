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

    public decrementRouteCount(routeId: number) {
        const count = this.entityInRouteCount.get(routeId)!;

        if (count > 1)
            this.entityInRouteCount.set(routeId, count - 1);
        else
            this.entityInRouteCount.delete(routeId);

        if(routeId > 40) {
            for (let i = 0; i < this.bridgeQueue.length; i++) {
                if (this.bridgeQueue[i] == routeId) {
                    this.bridgeQueue.splice(i);
                }
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