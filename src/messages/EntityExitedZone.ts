export type EntityExitedZone = {
    eventType: "ENTITY_EXITED_ZONE";
    data: {
        routeId: number;
        sensorId: number;
    };
};
