import classes from "./Layout.module.css";

export default function Layout(props) {
    return (
        <div className={classes.layout}>
            <div>{props.children}</div>
        </div>
    );
}
