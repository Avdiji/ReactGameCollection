import { useEffect, useRef } from "react";

/**
 * Method fetches the json value of the passed key from the constants.json (of the server).
 * @param {string} key Key to fetch the value from.
 * @returns The json value of the passed key.
 */
export async function getConstantValue(key) {
    const response = await fetch('http://localhost:8080/constants.json');
    const data = await response.json();
    return data[key];
}

/**
* Function fetches a string value from the passed key.
* 
* @param {string} constantKey 
* @returns A string-value to the corresponding Key.
*/
export async function createMessage(commandKey, ...args) {
    const dividerValue = await getConstantValue("DIVIDER");
    const command = await getConstantValue(commandKey);

    return command + dividerValue + args.join(dividerValue);
}

/**
 * Class represents every game, and handles game selection, matchmaking, disconnects etc.
 * Mainly used to represent the state of the game.
 */
export class BaseGame {
    constructor() {
        // sessionName/playerName
        this.sessionName = null;
        this.playerName = null;

        // flag indicates whether the client is in the matchmaking process
        this.isMatchmaking = false;
    }

    /**
     * Close the connection
     */
    async closeConnection(websocket) {
        websocket.send(await getConstantValue("DISCONNECT"));
        websocket.close();
    }
}

/**
 * Base Hook for all games.
 * @param game The state of the game.
 * @param setGame Setter for the state of the game.
 * @param {string} wsUrl The url to connect to.
 * @param {function} derivedOnMessageReceived  Function to run whenever socket receives a message.
 * @returns A state of the game with setter And the corresponding socket.
 */
export function useBaseGame(game, setGame, wsUrl, derivedOnMessageReceived) {
    // initialize the socket (only once!).
    const socket = useRef(null);
    if (!socket.current) {
        // initialize the websocket.
        socket.current = new WebSocket(wsUrl);
        socket.current.onopen = (event) => { console.log("Connected to server") }
        socket.current.onclose = (event) => { console.log("Closing socket") }
        socket.current.onerror = (event) => { console.log("Client Error...") }
        socket.current.onmessage = async (event) => { onMessageReceived(event); }
    }

    // base function for websockets onmessage-event.
    // triggers rerenders, when shallow coppying the game.
    const onMessageReceived = async (event) => {
        const payload = event.data;

        const created = await getConstantValue("CREATED_SESSION");
        const joined = await getConstantValue("JOINED_SESSION");

        switch (payload) {
            case created:
            case joined:
                game.isMatchmaking = true;
                setGame({ ...game, isMatchmaking: true });
                break;

            default: derivedOnMessageReceived(event);
        }
    }

    // close the socket, whenever leaving the url
    useEffect(() => {
        return (() => {
            game.closeConnection(socket.current);
        })
    }, []); // empty dependency array to ensure socket is only being closed when leaving the url.

    return socket;
}