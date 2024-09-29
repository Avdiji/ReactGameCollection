import classes from "./Hangman.module.css"

import CreateOrJoinGame from "../../components/gameMatchmaker/CreateOrJoinGame";
import { useHangman } from "./Hangman.game";

/**
 * @returns Hangman Game...
 */
export default function Hangman() {
    // The Hangman websocketHandler with all callbacks.
    const {game, socket} = useHangman();

    return (
        <div>
            {!game.isMatchmaking && <CreateOrJoinGame title="Hangman" game={game} socket={socket}/>}
        </div>

    );
}