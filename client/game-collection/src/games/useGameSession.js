import { useState, useEffect, useRef } from "react";
import { getConstantValue } from "../services/other/ConstantsUtils";

function areStringsNullOrEmpty(...values) {
    return values.some(value => !value || value.length === 0);
}

async function createMessage(key, ...values) {
    const dividerValue = await getConstantValue("DIVIDER");
    const command = await getConstantValue(key);

    return command + dividerValue + values.join(dividerValue);
}

export function useGameSession(websocketHandlerInstance) {
    const [isNameSelectionState, setNameSelectionState] = useState(true);
    const [isMatchmakingState, setMatchmakingState] = useState(false);

    const [sessionName, setSessionName] = useState(null);
    const [playerName, setPlayerName] = useState(null);

    const wsHandler = useRef(websocketHandlerInstance);

    const onCreate = async function () {
        if (areStringsNullOrEmpty(sessionName, playerName)) {
            console.log("Invalid")
            return;
        }
        websocketHandlerInstance.sendMessage(await createMessage("CREATE", sessionName, playerName));
    };

    const onJoin = async function () {
        if (areStringsNullOrEmpty(sessionName, playerName)) {
            console.log("invalid");
            return;
        }
        websocketHandlerInstance.sendMessage(await createMessage("JOIN", sessionName, playerName));
    };

    
    useEffect(() => {
        return () => {
            wsHandler.current.closeConnection();
        };
    }, [wsHandler]);

    return {
        isNameSelectionState,
        isMatchmakingState,
        
        setSessionName,
        setPlayerName,
        onCreate,
        onJoin,
    };
}