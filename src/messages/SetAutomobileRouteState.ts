export type SetAutomobileRouteState = {
  eventType: "SET_AUTOMOBILE_ROUTE_STATE";
  data: {
    routeId: number;
    state: "RED" | "GREEN" | "ORANGE";
  };
};
