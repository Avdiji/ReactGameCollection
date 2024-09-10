import classes from "./GameHub.module.css"

import Card from "./Card";
import hangmanImage from "../../assets/images/hangman.png"

export default function GameHub() {
    return (
        <div className={classes.gameHub}>
            <h1>Fitor's Game Collection</h1>
        <div className={classes.gameHub_cards}>
            <Card svgPath={hangmanImage} title="Hangman" />
        </div>
        </div>
    );
}
