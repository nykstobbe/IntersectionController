export type RequestBridgeStateMessage = {
    eventType: "REQUEST_BRIDGE_STATE"
    data: {
        state: "UP" | "DOWN"
    }
};