export type AcknowledgeBarriersState = {
    eventType: "ACKNOWLEDGE_BARRIERS_STATE"
    data: {
        state: "UP" | "DOWN"
    }
};