import { useState, useEffect, useRef } from "react";
import { getConstantValue } from "../services/other/ConstantsUtils";
import { BaseWebsocketHandler } from "../services/websockets/Base.websocket";

/**
 * Function checks whether one of the passed values is invalid (null or empty).
 * @param  {...string} values The values to be checked.
 * @returns True if one of the values is equal to null or empty.
 */
function areStringsNullOrEmpty(...values) {
    return values.some(value => !value || value.length === 0);
}

/**
 * 
 * @param {string} commandStr The command to be executed (create, join, move)...
 * @param  {...string} values 
 * @returns 
 */
async function createMessage(commandStr, ...values) {
    const dividerValue = await getConstantValue("DIVIDER");
    const command = await getConstantValue(commandStr);

    return command + dividerValue + values.join(dividerValue);
}

/**
 * 
 * @param {BaseWebsocketHandler} websocketHandlerInstance WebsocketHandler for this hook.
 * @returns A Hook, which helps during the initial room creation phase.
 */
export function useGameSession(websocketHandlerInstance) {
    // Autoclose the underlying websocketHandler.
    const wsHandler = useRef(websocketHandlerInstance);
    useEffect(() => {
        return (() => {
            wsHandler.current.closeConnection();
        });
    }, [wsHandler]);

    // states...
    const [sessionName, setSessionName] = useState(null); // sessionName getter/setter
    const [playerName, setPlayerName] = useState(null); // platerName getter/setter

    // function to be executed when client presses the create session button
    const onCreate = async function () {
        if (!areStringsNullOrEmpty(sessionName, playerName)) {
            const message = await createMessage("CREATE_SESSION", sessionName, playerName);
            websocketHandlerInstance.sendMessage(message);
        }
    };

    // function to be executed when client presses the join button
    const onJoin = async function () {
        if (!areStringsNullOrEmpty(sessionName, playerName)) {
            websocketHandlerInstance.sendMessage(await createMessage("JOIN_SESSION", sessionName, playerName));
        }
    };

    return {
        sessionName,
        playerName,
        setSessionName,
        setPlayerName,
        onCreate,
        onJoin,
    };
}