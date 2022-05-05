export type AcknowledgeBridgeState = {
    eventType: "ACKNOWLEDGE_BRIDGE_STATE"
    data: {
        state: "UP" | "DOWN"
    }
};