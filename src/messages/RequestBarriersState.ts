export type RequestBarriersState = {
    eventType: "REQUEST_BARRIERS_STATE"
    data: {
        state: "UP" | "DOWN"
    }
};