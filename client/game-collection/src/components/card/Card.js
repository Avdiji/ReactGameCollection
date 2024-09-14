import classes from "./Card.module.css";

/**
 * Component creates clickable cards.
 * 
 * @param {Object} props - Properties of the Card.
 * @param {string} props.onClick - The onClick callback of the Card.
 * @param {string} props.imgSrc - The source of the image, which is depicted on the card.
 * @param {string} props.title - Title of the Card.
 * 
 * @returns {JSX.Element} A clickable card.
 */
export default function Card(props) {
    return (
        <div className={classes.card} onClick={props.onClick}>
            <img className={classes.card_image} src={props.imgSrc} alt="card icon" />
            <div className={classes.card_title}>{props.title}</div>
        </div>
    );
}
