import { useState } from "react";
import { BaseGame, createBaseWebsocket, useBaseGame } from "../Base.game.js";

/**
 * Class captures the state of the Hangman-Game.
 */
export class HangmanGame extends BaseGame {
    constructor() {
        super();
        // add more fields if needed...

    }
}

/**
 * Hook for the Hangman game.
 * @returns An instance of the Hangman game, as well as the corresponding websocket.
 */
export function useHangman() {
    const [game, setGame] = useState(new HangmanGame());

    // Function to be executed whenever the websocket receives a message.
    const hangmanOnMessageReceived = async (event) => {
        console.log("Hangman");
    }

    const socket = useBaseGame(game, setGame, 'ws://localhost:8080/springGame/hangman', hangmanOnMessageReceived);
    return { game, socket };
}