import Header from "../header/Header";
import Card from "../card/Card";
import classes from "./GameMatchmaker.module.css";

import joinImage from "../../assets/images/join.png";
import createImage from "../../assets/images/create.png";

/**
 * Component allows player to create or join a game.
 * 
 * @param {Object} props - Properties of the GameMatchmaker.
 * @param {string} props.title - Title of the Game.
 * 
 * @returns {JSX.Element} The Game Matchmaker.
 */
export default function GameMatchmaker(props) {
    return (
        <div>
            <div className={classes.gameMatchmaker}>
                <Header title={props.title} />

                <input placeholder="Roomname" />

                <div className={classes.joinSelectionContainer}>
                    <Card title="CREATE SESSION" imgSrc={createImage} />
                    <Card title="JOIN" imgSrc={joinImage} />
                </div>

            </div>

        </div>
    );
}
