export type EntityEnteredZone = {
    eventType: "ENTITY_ENTERED_ZONE";
    data: {
        routeId: number;
        sensorId: number;
    };
};
