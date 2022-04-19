import { ConnectController } from "./connectController"
import { EntityEnteredZone } from "./entityEnteredZone"
import { EntityExitedZone } from "./entityExitedZone"
import { SessionStart } from "./sessionStart"
import { SessionStop } from "./sessionStop"
import { SetAutomobileRouteStateMessage } from "./setAutomobileRouteState"

export type Message = {
  eventType: string
} & (
  SessionStart | SetAutomobileRouteStateMessage | ConnectController | EntityEnteredZone | EntityExitedZone | SessionStop
)