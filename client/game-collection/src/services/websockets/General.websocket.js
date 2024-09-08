export function generalWebsocketHandler(onMessageCallback) {
    const testSocket = new WebSocket("ws://localhost:8080/springGame/general");

    testSocket.onopen = function (event) {
        testSocket.send("initial_connection");
    };

    testSocket.onmessage = function (event) {
        onMessageCallback(event.data);
    };

    testSocket.onclose = function (event) {
        testSocket.send("disconnecting");
    };

    testSocket.onerror = function (error) {
        console.log("WebSocket error: ", error);
    };

    return testSocket;
}
