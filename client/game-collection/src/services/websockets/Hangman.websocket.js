import { getConstantValue } from "../other/ConstantsUtils";
import { BaseWebsocketHandler } from "./Base.websocket";

/**
 * Websocket handler for the hangman game.
 */
export class HangmanWebsocketHandler extends BaseWebsocketHandler {
    constructor(
        onMessageCallback,
        websocketUrl = 'ws://localhost:8080/springGame/hangman',
    ) {
        super(onMessageCallback, websocketUrl);
    }
}
