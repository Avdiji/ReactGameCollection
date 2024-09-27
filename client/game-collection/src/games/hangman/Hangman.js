import GameMatchmaker from "../../components/gameMatchmaker/GameMatchmaker";
import classes from "./Hangman.module.css"

import { HangmanWebsocketHandler } from "../../services/websockets/Hangman.websocket";
import { useGameSession } from "../useGameSession";

/**
 * @returns Hangman Game...
 */
export default function Hangman() {
    // The Hangman websocketHandler with all callbacks.
    const hangmanWSHandler = new HangmanWebsocketHandler((message) => {
        console.log(message)
    });

    const {
        sessionName,
        playerName,
        setSessionName,
        setPlayerName,
        onCreate,
        onJoin
    } = useGameSession(hangmanWSHandler)

    return (
        <div>
            <GameMatchmaker
                title="Hangman"
                setSessionName={setSessionName}
                setPlayerName={setPlayerName}
                onCreate={onCreate}
                onJoin={onJoin} />
        </div>
    );
}