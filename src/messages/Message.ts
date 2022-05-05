import { ConnectController } from "./connectController"
import { EntityEnteredZone } from "./EntityEnteredZone"
import { EntityExitedZone } from "./EntityExitedZone"
import { SessionStart } from "./SessionStart"
import { SessionStop } from "./SessionStop"
import { SetAutomobileRouteStateMessage } from "./SetAutomobileRouteState"

export type Message = {
  eventType: string
} & (
  SessionStart | SetAutomobileRouteStateMessage | ConnectController | EntityEnteredZone | EntityExitedZone | SessionStop
)