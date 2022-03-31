import { config } from 'dotenv';
import ws from './websocket/initialize';

if(config({ path: './.env' }).error != undefined) {
    console.log("error finding .env file")
};

ws();