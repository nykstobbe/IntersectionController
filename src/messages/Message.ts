import { AcknowledgeBarriersState } from "./AcknowledgeBarriersState"
import { AcknowledgeBridgeRoadEmpty } from "./AcknowledgeBridgeRoadEmpty"
import { AcknowledgeBridgeState } from "./AcknowledgeBridgeState"
import { AcknowledgeBridgeWaterEmpty } from "./AcknowledgeBridgeWaterEmpty"
import { ConnectController } from "./connectController"
import { EntityEnteredZone } from "./EntityEnteredZone"
import { EntityExitedZone } from "./EntityExitedZone"
import { RequestBarriersState } from "./RequestBarriersState"
import { RequestBridgeRoadEmpty } from "./RequestBridgeRoadEmpty"
import { RequestBridgeStateMessage } from "./RequestBridgeState"
import { RequestBridgeWaterEmpty } from "./RequestBridgeWaterEmpty"
import { SessionStart } from "./SessionStart"
import { SessionStop } from "./SessionStop"
import { SetAutomobileRouteState } from "./SetAutomobileRouteState"
import { SetBoatRouteState } from "./SetBoatRouteState"
import { SetBridgeWarningLightState } from "./SetBridgeWarningLightState"

export type Message = {
  eventType: string
} & (
  SessionStart | SetAutomobileRouteState | ConnectController | EntityEnteredZone | EntityExitedZone | SessionStop | 
  SetBoatRouteState | SetBridgeWarningLightState | RequestBarriersState | RequestBridgeRoadEmpty | RequestBridgeStateMessage | 
  RequestBridgeWaterEmpty | AcknowledgeBarriersState | AcknowledgeBridgeRoadEmpty | AcknowledgeBridgeState | AcknowledgeBridgeWaterEmpty
)