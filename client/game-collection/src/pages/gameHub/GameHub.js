import classes from "./GameHub.module.css";
import { useNavigate } from "react-router-dom";

import hangmanImage from "../../assets/images/hangman.png";

import Header from "../../components/header/Header";
import Card from "../../components/card/Card";

/**
 * GameHub component, allows to select a game out of the collection.
 * 
 * @returns {JSX.Element} The GameHub.
 */
export default function GameHub() {

  const nav = useNavigate();

  return (
    <div className={classes.gameHub}>
      <Header title="Fitor's Game Collection" />
      <div className={classes.gameHub_cards}>
        <Card imgSrc={hangmanImage} title="Hangman" onClick={() => nav("/hangman")} />
      </div>
    </div>
  );
}
