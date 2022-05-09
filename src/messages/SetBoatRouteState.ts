export type SetBoatRouteState = {
  eventType: "SET_BOAT_ROUTE_STATE";
  data: {
    routeId: number;
    state: "RED" | "GREEN" | "GREENRED";
  };
};
