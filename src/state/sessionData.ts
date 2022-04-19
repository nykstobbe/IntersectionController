export default class SessionData {
    private entityInRouteCount: Map<number, number>;
    private running: boolean;

    public constructor() {
        this.running = false;
        this.entityInRouteCount = new Map();
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
    }

    public decrementRouteCount(routeId: number) {
        const count = this.entityInRouteCount.get(routeId)!;

        if (count > 1)
            this.entityInRouteCount.set(routeId, count - 1);
        else
            this.entityInRouteCount.delete(routeId);
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
}