export type ConnectController = {
    eventType: "CONNECT_CONTROLLER",
    data: {
        sessionName: string,
        sessionVersion: number,
        discardParseErrors: boolean,
        discardEventTypeErrors: boolean,
        discardMalformedDataErrors: boolean,
        discardInvalidStateErrors: boolean
    }
}