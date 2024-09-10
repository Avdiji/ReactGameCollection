import classes from "./Card.module.css";

export default function Card(props) {
    return (
        <div className={classes.card}>
            <img className={classes.card_image} src={props.svgPath} alt="card icon" />
            <div className={classes.card_title}>{props.title}</div>
        </div>
    );
}
