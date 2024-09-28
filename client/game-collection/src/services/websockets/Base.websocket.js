import { getConstantValue } from "../other/ConstantsUtils";

/**
 * Base websocket handler, acts as a foundation for all other websocket handlers.
 */
export class BaseWebsocketHandler {

    /**
     * Constructor creates a new WebSocket and sets up event handlers.
     *
     * @param {string} websocketUrl The URL to the WebSocket.
     * @param {function} onOpenCallback The callback function to be executed when the WebSocket is opened.
     * @param {function} onMessageCallback The callback function to be executed when a message is received. Callback must expect a String for a param.
     * @param {function} onCloseCallback The callback function to be executed when the WebSocket is closed.
     * @param {function} onErrorCallback The callback function to be executed when an error occurs.
     */
    constructor(onMessageCallback, websocketUrl) {
        this.websocketUrl = websocketUrl;
        this.websocket = new WebSocket(websocketUrl);
        this.isWebSocketOpen = false;
        this.messageQueue = [];

        // Assign the event handlers to the WebSocket
        this.websocket.onopen = (event) => {
            console.log("Connected to server: " + websocketUrl);
            this.isWebSocketOpen = true;

            // Process queued messages
            this.messageQueue.forEach((message) => this.sendMessage(message));
            this.messageQueue = []; // Clear the queue
        };

        this.websocket.onmessage = (event) => {
            if (onMessageCallback) {
                onMessageCallback(event.data);
            }
        };

        this.websocket.onclose = (event) => {
            this.isWebSocketOpen = false;
            this.websocket.close();
        };

        this.websocket.onerror = (event) => {
            this.websocket.send('client_error');
        };
    }

    /**
     * Send a message over the WebSocket connection.
     * @param {string} message The message to send.
     */
    async sendMessage(message) {
        if (this.isWebSocketOpen) {
            this.websocket.send(message);
        } else {
            this.messageQueue.push(message);
        }
    }

    /**
     * Close the connection
     */
    async closeConnection() {
        if (this.isWebSocketOpen) {
            this.websocket.send(await getConstantValue("DISCONNECT"));
            this.websocket.close();
        } else {
            console.error("WebSocket is not open. Cannot close.");
        }
    }

    
}
