import GameMatchmaker from "../../components/gameMatchmaker/GameMatchmaker";
import classes from "./Hangman.module.css"

import { HangmanWebsocketHandler } from "../../services/websockets/Hangman.websocket";
import { useGameSession } from "../useGameSession";

export default function Hangman() {
    const messageCallback = function(message) {
        console.log(message);
    }

    const hangmanWSHandler = new HangmanWebsocketHandler(messageCallback);

    const {
        isNameSelectionState,
        isMatchmakingState,
        
        setSessionName,
        setPlayerName,
        onCreate,
        onJoin
    } = useGameSession(hangmanWSHandler)

    return (

        <div>
            {isNameSelectionState &&
                <GameMatchmaker
                    title="Hangman"
                    setSessionName={setSessionName}
                    setPlayerName={setPlayerName}
                    onCreate={onCreate}
                    onJoin={onJoin} />
            }

            {isMatchmakingState &&
                <div>FITORR</div>
            }
        </div>
    );
}