import WebSocket from "ws";

import { config } from 'dotenv';
import SessionData from './state/sessionData';
import tick from './state/tick';
import websocket from './websocket/initialize';

if(config({ path: './.env' }).error != undefined) {
    console.log("error finding .env file")
};

let sessiondata: SessionData = new SessionData();

let tickRate: number = parseInt(process.env.TICKRATE!);
let url: string = process.env.URL!;

let ws: WebSocket = websocket(url, sessiondata);
setInterval(tick, tickRate, ws, sessiondata, tickRate);