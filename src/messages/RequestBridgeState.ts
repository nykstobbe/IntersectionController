export type RequestBridgeState = {
    eventType: "REQUEST_BRIDGE_STATE"
    data: {
        state: "UP" | "DOWN"
    }
};