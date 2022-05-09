export type SetBridgeWarningLightState = {
  eventType: "SET_BRIDGE_WARNING_LIGHT_STATE";
  data: {
    state: "ON" | "OFF";
  };
};
