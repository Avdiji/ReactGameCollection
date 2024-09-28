import classes from "./Hangman.module.css"

import { HangmanWebsocketHandler } from "../../services/websockets/Hangman.websocket";
import { useGameSession } from "../useGameSession";
import CreateOrJoinGame from "../../components/gameMatchmaker/CreateOrJoinGame";

/**
 * @returns Hangman Game...
 */
export default function Hangman() {
    // The Hangman websocketHandler with all callbacks.
    const hangmanWSHandler = new HangmanWebsocketHandler((message) => {
        // setIsInMatchmaking when created/joined...
        console.log(message)
    });

    const {
        sessionName,
        playerName,
        setSessionName,
        setPlayerName,
        onCreate,
        onJoin,
    } = useGameSession(hangmanWSHandler)

    return (
        <div>
            <CreateOrJoinGame
                title="Hangman"
                setSessionName={setSessionName}
                setPlayerName={setPlayerName}
                onCreate={onCreate}
                onJoin={onJoin} />
        </div>
    );
}