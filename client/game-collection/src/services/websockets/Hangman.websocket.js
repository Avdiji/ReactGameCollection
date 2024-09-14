import { getConstantValue } from "../other/ConstantsUtils";
import { BaseWebsocketHandler } from "./Base.websocket";

/**
 * Websocket handler for the hangman game.
 */
export class HangmanWebsocketHandler extends BaseWebsocketHandler {
    constructor(
        websocketUrl = 'ws://localhost:8080/springGame/hangman',
        onMessageCallback = (message) => { console.log(message); },
    ) {
        super(websocketUrl, onMessageCallback);
    }
}
