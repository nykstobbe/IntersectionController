export type SetAutomobileRouteStateMessage = {
  eventType: "SET_AUTOMOBILE_ROUTE_STATE";
  data: {
    routeId: number;
    state: "RED" | "GREEN" | "ORANGE";
  };
};
