import { useState, useEffect, useRef } from "react";
import GameMatchmaker from "../../components/gameMatchmaker/GameMatchmaker";
import classes from "./Hangman.module.css"

import { HangmanWebsocketHandler } from "../../services/websockets/Hangman.websocket";

// TODO cleanup
export default function Hangman() {
    let [sessionName, setSessionName] = useState(null);
    const hangmanWSHandler = useRef(null);

    useEffect(() => {
        hangmanWSHandler.current = new HangmanWebsocketHandler();
        return () => {
            hangmanWSHandler.current.closeConnection();
        };
    }, []); 

    return (
        <div>
            <GameMatchmaker title="Hangman"/>
        </div>
    );
}