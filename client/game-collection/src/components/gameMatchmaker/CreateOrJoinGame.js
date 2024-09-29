import Header from "../header/Header";
import Card from "../card/Card";
import classes from "./CreateOrJoinGame.module.css";

import joinImage from "../../assets/images/join.png";
import createImage from "../../assets/images/create.png";

import { createMessage } from "../../games/Base.game.js";

/**
 * Component allows player to create or join a game.
 * 
 * @param {Object} props - Properties of the CreateOrJoinGame-component.
 * @param {string} props.title - Title of the Game.
 * 
 * @returns {JSX.Element} The Game Matchmaker.
 */
export default function CreateOrJoinGame(props) {
    // True if none of the passed args are null or empty
    const argsAreValid = function (...args) {
        return !(args.some(value => !value || value.length === 0));
    }

    const onCreate = async function () {
        const sessionName = props.game.sessionName;
        const playerName = props.game.playerName;

        if (argsAreValid(sessionName, playerName)) {
            const message = await createMessage("CREATE_SESSION", sessionName, playerName);
            props.socket.current.send(message);
        }
    }

    const onJoin = async function () {
        const sessionName = props.game.sessionName;
        const playerName = props.game.playerName;

        if (argsAreValid(sessionName, playerName)) {
            const message = await createMessage("JOIN_SESSION", sessionName, playerName);
            props.socket.current.send(message);
        }
    }

    return (
        <div>
            <div className={classes.createOrJoinGame}>
                <Header title={props.title} />

                <input placeholder="Roomname" onChange={(e) => props.game.sessionName = e.target.value} />
                <input placeholder="Player Name" onChange={(e) => props.game.playerName = e.target.value} />

                <div className={classes.joinSelectionContainer}>
                    <Card title="CREATE SESSION" imgSrc={createImage} onClick={onCreate} />
                    <Card title="JOIN" imgSrc={joinImage} onClick={onJoin} />
                </div>

            </div>

        </div>
    );
}
